#!/usr/bin/env node

import { resolveDid } from "./resolve-did"

const USAGE = "Usage: npx resolve-did <did-uri>"

async function main(didUri?: string) {
  if (!didUri || didUri === "--help" || didUri === "-h") {
    console.error(USAGE)
    process.exit(didUri ? 0 : 1)
  }

  try {
    const { didDocument } = await resolveDid(didUri)
    console.log(JSON.stringify(didDocument, null, 2))
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error(`Error: ${message}`)
    process.exit(1)
  }
}

main(process.argv[2])
