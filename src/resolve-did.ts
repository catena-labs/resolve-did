import {
  getDidResolver,
  resolveDid as ackResolveDid,
  isDidUri,
  type DidDocument,
  type DidUri
} from "@agentcommercekit/did"
import {
  InvalidDidError,
  DidNotFoundError,
  UnsupportedDidMethodError
} from "./errors"

const SUPPORTED_METHODS = ["web", "key", "pkh"]

/**
 * Resolves a DID URI to its DID Document.
 *
 * This function takes a DID URI and returns the corresponding DID Document.
 * It supports the following DID methods:
 * - did:web - Web-based DIDs (e.g., did:web:example.com)
 * - did:key - Key-based DIDs (secp256k1 and Ed25519)
 * - did:pkh - Public Key Hash DIDs (Ethereum addresses)
 *
 * @example
 * ```ts
 * // Resolve a web-based DID
 * const { did, didDocument } = await resolveDid("did:web:example.com")
 *
 * // Resolve a key-based DID (Ed25519)
 * const { did, didDocument } = await resolveDid("did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8")
 *
 * // Resolve an Ethereum address
 * const { did, didDocument } = await resolveDid("did:pkh:eip155:1:0x123...")
 * ```
 *
 * @param didUri - The DID URI to resolve (e.g., "did:web:example.com")
 * @param resolver - Optional custom DID resolver (defaults to Agent Commerce Kit resolver)
 * @returns Object containing the DID and its resolved DID Document
 * @throws {InvalidDidError} If the DID URI is invalid or malformed
 * @throws {UnsupportedDidMethodError} If the DID method is not supported
 * @throws {DidNotFoundError} If the DID cannot be resolved or accessed
 */
export async function resolveDid(
  didUri: unknown,
  resolver = getDidResolver()
): Promise<{ did: DidUri; didDocument: DidDocument }> {
  if (!isDidUri(didUri)) {
    throw new InvalidDidError(String(didUri))
  }

  const method = String(didUri).split(":")[1]
  if (!SUPPORTED_METHODS.includes(method)) {
    throw new UnsupportedDidMethodError(method)
  }

  try {
    const { did, didDocument } = await ackResolveDid(didUri, resolver)
    return { did, didDocument }
  } catch (error) {
    throw new DidNotFoundError(String(didUri))
  }
}
