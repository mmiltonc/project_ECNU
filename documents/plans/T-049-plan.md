# T-049 Plan: responder 400 para errores de input/dominio en compra

## Problema

Los endpoints de compra devuelven `500` para errores que no son fallas internas del servidor. Por ejemplo, en `POST /api/mercadopago`, si el SKU enviado no existe en `app/data/plans.json`, el handler lanza `Plan not found.` y el `catch` general responde `500`.

Ese caso ocurre antes de llamar a MercadoPago. No depende de la documentacion de errores de MercadoPago ni de la respuesta del SDK.

## Objetivo

Responder `400 Bad Request` para errores causados por input invalido o datos de dominio no aceptados, manteniendo `500` para errores inesperados o fallas de servicios internos/externos.

## Casos candidatos

- Campos requeridos faltantes.
- Pais no permitido para el gateway.
- Plan inexistente.

## Criterios de implementacion

- Diferenciar errores esperados de validacion/dominio de errores inesperados.
- Cubrir MercadoPago y PayPal de forma consistente.
- Actualizar tests que hoy caracterizan el comportamiento actual con `500`.
- No cambiar el contrato exitoso de compra.

## Verificacion

- Tests de handler para plan inexistente esperando `400`.
- Tests de handler para pais no permitido esperando `400`.
- Tests exitosos siguen devolviendo `200`.
