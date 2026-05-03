# 001 - Security

## Forbidden Files And Data

Agents must not read, print, summarize, copy, inspect, parse, or expose secrets or credential material.

Strictly avoid:

- `.env`
- `.env.local`
- `.env.production`
- Any `.env.*` file except `.env.example` and `.env.test`
- `firebase-adminsdk.json`
- Private keys
- Public/private key pairs
- Certificates
- Service account files
- API tokens
- OAuth secrets
- Payment gateway secrets
- Firebase private keys
- Files or paths containing `secret`, `secrets`, `credential`, `credentials`, `private-key`, `private_key`, `key`, `keys`, `token`, or `tokens`

## Allowed Env Files

- `.env.example` may be read because it is a template.
- `.env.test` may be read because it must contain dummy test values only.

## If Secrets Are Needed

Do not inspect secret files. Ask the user to confirm the required variable name or to run the command locally with their environment.

## Output Safety

Never include real tokens, private keys, credentials, certificate contents, service account JSON, or payment secrets in responses, docs, tests, logs, or generated files.
