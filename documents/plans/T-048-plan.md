# T-048 Plan: herramienta de mocking de modulos

## Objetivo

Elegir y configurar una herramienta para mockear imports de modulos en specs Jasmine, sin tocar codigo productivo y sin usar servicios reales.

## Problema

Los handlers de compra importan e instancian dependencias externas como MercadoPago, PayPal, Firestore y Resend. Para testear el comportamiento actual, necesitamos cargar los routes con dobles de test en lugar de los modulos reales.

## Opcion recomendada

Usar `proxyquire` para specs backend CommonJS ejecutados con `ts-node`.

## Por que `proxyquire`

- Permite cargar un modulo bajo prueba pasando reemplazos explicitos para sus dependencias.
- El mock queda localizado al `require` de ese spec, lo que reduce contaminacion global entre tests.
- Es mas claro para casos donde cada spec necesita variantes distintas del mismo SDK, por ejemplo PayPal exitoso, PayPal 500 o respuesta sin order id.
- Encaja bien con Jasmine + `ts-node` cuando los specs se ejecutan como CommonJS.

## Alternativa: `mock-require`

`mock-require` registra mocks globales en el cache/resolver de CommonJS. Es simple, pero requiere mas disciplina para resetear mocks y limpiar `require.cache` entre specs. Puede ser suficiente para mocks muy estables, pero es mas facil que un test afecte al siguiente.

## Tareas

- Instalar `proxyquire` y sus tipos si estan disponibles.
- Crear helper para cargar routes con dependencias mockeadas.
- Documentar patron de uso en `documents/testing.md`.
- Agregar ejemplo minimo mockeando `@/app/lib/firebaseAdmin` y `resend`.
- Confirmar que `npm run spec` sigue pasando.

## Comandos tentativos

```bash
npm install --save-dev proxyquire @types/proxyquire
```

## Criterios de aceptacion

- Un spec puede importar `app/api/mercadopago/route.tsx` sin inicializar Firestore real.
- Un spec puede mockear `mercadopago` y capturar el payload enviado a `Preference.create`.
- Un spec puede variar el comportamiento del mock por caso sin afectar otros specs.
