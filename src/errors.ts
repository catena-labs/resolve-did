/**
 * Base error class for DID resolution errors.
 * All specific DID resolution errors should extend this class.
 *
 * @class
 * @extends Error
 */
export class DidResolutionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
  }
}

/**
 * Thrown when the input DID URI is invalid.
 * This can happen when:
 * - The input is not a string
 * - The string doesn't start with "did:"
 * - The DID method is missing
 *
 * @example
 * ```ts
 * // Invalid DID format
 * throw new InvalidDidError("notadid")
 * // Invalid DID method
 * throw new InvalidDidError("did:unknown:123")
 * ```
 *
 * @class
 * @extends DidResolutionError
 */
export class InvalidDidError extends DidResolutionError {
  constructor(did: string) {
    super(`Invalid DID URI: "${did}". DID must be a valid URI string starting with "did:"`)
  }
}

/**
 * Thrown when the DID method is not supported by the resolver.
 * Currently supported methods are:
 * - did:web - Web-based DIDs
 * - did:key - Key-based DIDs (secp256k1 and Ed25519)
 * - did:pkh - Public Key Hash DIDs (Ethereum addresses)
 *
 * @example
 * ```ts
 * throw new UnsupportedDidMethodError("unknown")
 * ```
 *
 * @class
 * @extends DidResolutionError
 */
export class UnsupportedDidMethodError extends DidResolutionError {
  constructor(method: string) {
    super(`Unsupported DID method: "${method}". Supported methods are: web, key, pkh`)
  }
}

/**
 * Thrown when the DID document cannot be retrieved.
 * This can happen when:
 * - The DID doesn't exist
 * - The DID document is not accessible (e.g., network error)
 * - The DID document is malformed
 *
 * @example
 * ```ts
 * throw new DidNotFoundError("did:web:nonexistent.com")
 * ```
 *
 * @class
 * @extends DidResolutionError
 */
export class DidNotFoundError extends DidResolutionError {
  constructor(did: string) {
    super(`DID not found: "${did}". Check that the DID exists and is accessible`)
  }
}
