# resolve-did

Resolve DIDs from the command line and in code.

## Usage

Use it from the command line:

```sh
npx resolve-did did:web:venabl.es
```

Or, use it in code:

```ts
import { resolveDid } from "resolve-did"

const { did, didDocument } = await resolveDid("did:web:venabl.es")
```

## Examples

```sh
npx resolve-did did:web:venabl.es
npx resolve-did did:jwks:accounts.google.com
npx resolve-did did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK
npx resolve-did did:pkh:eip155:1:0xb9c5714089478a327f09197987f16f9e5d936e8a
```

## Powered by Agent Commerce Kit

This library uses the DID methods from
[Agent Commerce Kit](https://agentcommercekit.com).
