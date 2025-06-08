#!/usr/bin/env node

import { inspect } from "node:util"
import { resolveDid } from "./resolve-did"
import { DidResolutionError } from "./errors"
import {
  InvalidDidError,
  UnsupportedDidMethodError,
  DidNotFoundError
} from "./errors"

const HELP_MESSAGE = `
Usage: npx resolve-did <did-uri> [options]

Options:
  --help     Show this help message
  --raw      Output raw JSON without formatting

Examples:
  # Resolve a web-based DID
  npx resolve-did did:web:example.com

  # Resolve a key-based DID
  npx resolve-did did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8

  # Resolve an Ethereum address
  npx resolve-did did:pkh:eip155:1:0x0000000000000000000000000000000000000000

  # Output raw JSON
  npx resolve-did did:web:example.com --raw
`

interface CliOptions {
  didUri?: string
  raw: boolean
  help: boolean
}

/**
 * Parse command line arguments into options.
 * @param args - Command line arguments
 * @returns Parsed options
 */
export function parseArgs(args: string[]): CliOptions {
  const options: CliOptions = {
    raw: false,
    help: false
  }

  for (let i = 2; i < args.length; i++) {
    const arg = args[i] ?? ""
    if (arg === "--help") {
      options.help = true
    } else if (arg === "--raw") {
      options.raw = true
    } else if (!arg.startsWith("--")) {
      options.didUri = arg
    }
  }

  return options
}

/**
 * Main CLI function that handles argument parsing and DID resolution.
 * @param args - Command line arguments
 */
export async function main(args: string[] = process.argv): Promise<void> {
  try {
    const options = parseArgs(args)

    if (options.help) {
      console.log(HELP_MESSAGE)
      process.exit(0)
    }

    if (!options.didUri) {
      console.error("Missing DID URI")
      console.error("\nUsage: npx resolve-did <did-uri> [options]")
      console.error("Try 'npx resolve-did --help' for more information")
      process.exit(1)
    }

    const { didDocument } = await resolveDid(options.didUri)
    console.log(
      options.raw
        ? JSON.stringify(didDocument)
        : JSON.stringify(didDocument, null, 2)
    )
    process.exit(0)
  } catch (error) {
    if (error instanceof InvalidDidError) {
      console.error(`Invalid DID URI: ${error.message}`)
    } else if (error instanceof UnsupportedDidMethodError) {
      console.error(`Unsupported DID method: ${error.message}`)
    } else if (error instanceof DidNotFoundError) {
      console.error(`DID not found: ${error.message}`)
    } else {
      console.error("Fatal error:", error)
    }
    process.exit(1)
  }
}

// Run if called directly
if (process.argv[1] === import.meta.url) {
  main().catch((error: unknown) => {
    console.error("Fatal error:", error)
    process.exit(1)
  })
}
