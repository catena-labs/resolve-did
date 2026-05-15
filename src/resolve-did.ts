import {
  getDidResolver,
  resolveDid as ackResolveDid,
  isDidUri,
  type DidDocument,
  type DidUri,
} from "@agentcommercekit/did"

export type ResolveDidResult =
  | {
      ok: true
      did: DidUri
      didDocument: DidDocument
    }
  | {
      ok: false
      error: string
    }

/**
 * Resolve a did URI
 *
 * @param didUri - The did URI to resolve
 * @param resolver - The resolver to use
 * @returns An object containing the `did` and the `didDocument`
 */
export async function resolveDid(
  didUri: unknown,
  resolver = getDidResolver(),
): Promise<{ did: DidUri; didDocument: DidDocument }> {
  if (!isDidUri(didUri)) {
    throw new Error("Invalid DID URI")
  }

  const { did, didDocument } = await ackResolveDid(didUri, resolver)

  return {
    did,
    didDocument,
  }
}

/**
 * Resolve a DID URI without throwing.
 *
 * This is useful in agent and API flows where callers need a structured
 * success/failure value instead of exception control flow.
 *
 * @param didUri - The DID URI to resolve
 * @param resolver - The resolver to use
 * @returns A discriminated result containing either the DID document or an error
 */
export async function safeResolveDid(
  didUri: unknown,
  resolver = getDidResolver(),
): Promise<ResolveDidResult> {
  try {
    return {
      ok: true,
      ...(await resolveDid(didUri, resolver)),
    }
  } catch (error: unknown) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}
