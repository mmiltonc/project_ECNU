import { proxyquireFromRoot } from "@/specs/helpers/proxyquire";

type PayPalRoute = {
  POST: (request: Request) => Promise<Response>;
};

const loadRouteWithMocks = () => {
  const createOrderSpy = jasmine
    .createSpy("OrdersController.createOrder")
    .and.resolveTo({
      body: JSON.stringify({ id: "paypal-order-id" }),
      statusCode: 201,
    });
  const dbCollectionSpy = jasmine.createSpy("db.collection");
  const resendSendSpy = jasmine.createSpy("Resend.emails.send");

  class ApiErrorMock extends Error {}

  class ClientMock {
    constructor(public config: unknown) {}
  }

  class OrdersControllerMock {
    createOrder = createOrderSpy;
  }

  class ResendMock {
    emails = {
      send: resendSendSpy,
    };
  }

  const route = proxyquireFromRoot("app/api/paypal/route.ts", {
    "@paypal/paypal-server-sdk": {
      ApiError: ApiErrorMock,
      CheckoutPaymentIntent: {
        Capture: "CAPTURE",
      },
      Client: ClientMock,
      Environment: {
        Production: "production",
        Sandbox: "sandbox",
      },
      ItemCategory: {
        DigitalGoods: "DIGITAL_GOODS",
      },
      LogLevel: {
        Info: "info",
      },
      OrdersController: OrdersControllerMock,
      PhoneType: {
        Mobile: "MOBILE",
      },
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
  }) as PayPalRoute;

  return {
    createOrderSpy,
    dbCollectionSpy,
    resendSendSpy,
    route,
  };
};

describe("PayPal purchase route", () => {
  it("returns 500 and does not call external services when the country is Argentina", async () => {
    const { createOrderSpy, dbCollectionSpy, resendSendSpy, route } =
      loadRouteWithMocks();

    const request = new Request("http://localhost:3000/api/paypal", {
      method: "POST",
      body: JSON.stringify({
        plan: "plan-plus-gym-virtual",
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
    expect(body).toEqual({
      error: "Payment method not allowed in Argentina.",
    });
    expect(createOrderSpy).not.toHaveBeenCalled();
    expect(dbCollectionSpy).not.toHaveBeenCalled();
    expect(resendSendSpy).not.toHaveBeenCalled();
  });
});
