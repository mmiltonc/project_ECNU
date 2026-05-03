# Testing

## Stack

- Jasmine
- TypeScript mediante `ts-node`
- Resolucion de aliases mediante `tsconfig-paths`
- Mocking de modulos mediante `proxyquire`

## Comandos

Ejecutar todos los tests:

```bash
npm run spec
```

Tambien se puede usar:

```bash
npm test
```

Ejecutar en modo watch:

```bash
npm run test:watch
```

## Ejecutar un test particular

Para correr un test, suite o `describe` particular se usa `--filter`.

```bash
npm run spec -- --filter="Jasmine setup"
```

Tambien se puede filtrar por el texto del `it`:

```bash
npm run spec -- --filter="runs TypeScript specs"
```

Pasar el texto sin `--filter` no filtra por nombre de test; Jasmine lo interpreta como archivo o patron de archivo.

## Mocking de servicios

Para tests de backend que importan SDKs o servicios externos se usa `proxyquire`.

La idea es cargar el modulo bajo prueba reemplazando dependencias como Firestore, Resend, MercadoPago, PayPal, UUID o `fetch` por mocks/spies. Los tests no deben usar servicios reales ni credenciales reales.

Patron recomendado:

```ts
import proxyquireFactory from "proxyquire";

const proxyquire = proxyquireFactory.noCallThru();

const route = proxyquire("./ruta-del-modulo", {
  "@/app/lib/firebaseAdmin": {
    db: firestoreMock,
  },
  resend: {
    Resend: resendMock,
  },
});
```

Usar `noCallThru()` evita que una propiedad no mockeada caiga accidentalmente en el modulo real.
