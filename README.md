# resolve-did

Resolve DIDs from the command line and in code.

Use it from the command line:

```sh
npx resolve-did did:web:venabl.es
```

Or, use it in code:

```ts
import { resolveDid } from "resolve-did"

const { did, didDocument } = await resolveDid("did:web:venabl.es")
```

## Powered by Agent Commerce Kit

This library uses the DID methods from [Agent Commerce Kit](https://agentcommercekit.com).
