import { proxyquireFromRoot } from "@/specs/helpers/proxyquire";

type MercadoPagoRoute = {
  POST: (request: Request) => Promise<Response>;
};

const loadRouteWithMocks = () => {
  const preferenceCreateSpy = jasmine
    .createSpy("Preference.create")
    .and.resolveTo({
      id: "preference-id",
      init_point: "https://mercadopago.test/checkout",
    });
  const dbCollectionSpy = jasmine.createSpy("db.collection");
  const resendSendSpy = jasmine.createSpy("Resend.emails.send");

  class MercadoPagoConfigMock {
    constructor(public config: unknown) {}
  }

  class PreferenceMock {
    create = preferenceCreateSpy;
  }

  class ResendMock {
    emails = {
      send: resendSendSpy,
    };
  }

  const route = proxyquireFromRoot("app/api/mercadopago/route.tsx", {
    mercadopago: {
      MercadoPagoConfig: MercadoPagoConfigMock,
      Preference: PreferenceMock,
    },
    "@/app/lib/firebaseAdmin": {
      db: {
        collection: dbCollectionSpy,
      },
    },
    resend: {
      Resend: ResendMock,
    },
    uuid: {
      v4: () => "test-user-id",
    },
  }) as MercadoPagoRoute;

  return {
    dbCollectionSpy,
    preferenceCreateSpy,
    resendSendSpy,
    route,
  };
};

describe("MercadoPago purchase route", () => {
  it("returns 500 and does not call external services when the plan does not exist", async () => {
    spyOn(console, "log");

    const { dbCollectionSpy, preferenceCreateSpy, resendSendSpy, route } =
      loadRouteWithMocks();

    const request = new Request("http://localhost:3000/api/mercadopago", {
      method: "POST",
      body: JSON.stringify({
        plan: "plan-inexistente",
        pais: "ARG",
        nombre: "Alumno Test",
        ciudad: "Buenos Aires",
        emailLocalPart: "alumno.test",
        celular: "1122334455",
        objetivos: "Ganar fuerza y mejorar tecnica",
      }),
    });

    const response = await route.POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: "Plan not found." });
    expect(preferenceCreateSpy).not.toHaveBeenCalled();
    expect(dbCollectionSpy).not.toHaveBeenCalled();
    expect(resendSendSpy).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });

  it("returns 500 and does not call external services when the country is not Argentina", async () => {
    spyOn(console, "log");

    const { dbCollectionSpy, preferenceCreateSpy, resendSendSpy, route } =
      loadRouteWithMocks();

    const request = new Request("http://localhost:3000/api/mercadopago", {
      method: "POST",
      body: JSON.stringify({
        plan: "plan-plus-gym-virtual",
        pais: "ESP",
        nombre: "Alumno Test",
        ciudad: "Madrid",
        emailLocalPart: "alumno.test",
        celular: "612345678",
        objetivos: "Ganar fuerza y mejorar tecnica",
      }),
    });

    const response = await route.POST(request);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({
      error: "Payment method not allowed outside Argentina.",
    });
    expect(preferenceCreateSpy).not.toHaveBeenCalled();
    expect(dbCollectionSpy).not.toHaveBeenCalled();
    expect(resendSendSpy).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalled();
  });
});
