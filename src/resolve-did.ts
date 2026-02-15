import {
  getDidResolver,
  resolveDid as ackResolveDid,
  isDidUri,
  type DidDocument,
  type DidUri,
} from "@agentcommercekit/did"

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
