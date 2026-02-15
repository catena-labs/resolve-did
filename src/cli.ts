#!/usr/bin/env node

import { inspect } from "node:util"

import { resolveDid } from "./resolve-did"

async function main(didUri?: string) {
  if (!didUri) {
    console.error("Usage: npx resolve-did <did-uri>")
    process.exit(1)
  }

  const { didDocument } = await resolveDid(didUri)
  console.log(
    inspect(didDocument, { colors: true, depth: null, compact: false }),
  )
}

main(process.argv[2])
  .then(() => {
    process.exit(0)
  })
  .catch((error: unknown) => {
    console.error(error)
    process.exit(1)
  })
