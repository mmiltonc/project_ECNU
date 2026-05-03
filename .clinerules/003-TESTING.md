# 003 - Testing

## Test Runner

- Use Jasmine.
- Run all tests with `npm run spec`.
- Run a specific test or suite with `--filter`.

Example:

```bash
npm run spec -- --filter="MercadoPago purchase route"
```

## Test Location

- Tests live in `specs/`.
- Mirror the path of the file being tested.
- Keep Jasmine config and global setup in `specs/support/`.

Examples:

- `app/api/webhooks/helpers.tsx` -> `specs/app/api/webhooks/helpers.spec.ts`
- `app/api/mercadopago/route.tsx` -> `specs/app/api/mercadopago/route.spec.ts`

## Test Style

- Write every `it` explicitly.
- Do not generate specs with loops such as `forEach`.
- Prefer clear, searchable test names.

## Environment

- Tests load `.env.test`.
- `.env.test` must contain dummy values only.
- Never use real secrets in tests.

## Mocking

- Do not use real external services in tests.
- Mock Firestore, Resend, MercadoPago, PayPal, UUID, and network calls.
- Use `proxyquireFromRoot` from `@/specs/helpers/proxyquire` for module mocking.

Example:

```ts
const route = proxyquireFromRoot("app/api/mercadopago/route.tsx", {
  mercadopago: mercadoPagoMock,
  "@/app/lib/firebaseAdmin": firebaseAdminMock,
  resend: resendMock,
  uuid: uuidMock,
});
```
