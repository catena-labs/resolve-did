#!/usr/bin/env node

import { inspect } from "node:util"

import packageJson from "../package.json" with { type: "json" }
import { resolveDid } from "./resolve-did"

function printHelp() {
  console.log(`Usage: resolve-did [options] <did-uri>

Resolve a DID and print its DID document.

Arguments:
  <did-uri>  The DID to resolve (e.g. did:key:z6Mk..., did:web:example.com)

Options:
  -h, --help     Print this help message and exit
  -v, --version  Print the version number and exit

Examples:
  resolve-did did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8
  resolve-did did:web:venabl.es`)
}

async function main(didUri?: string) {
  if (didUri === "--help" || didUri === "-h") {
    printHelp()
    return
  }

  if (didUri === "--version" || didUri === "-v") {
    console.log(packageJson.version)
    return
  }

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
