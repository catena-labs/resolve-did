import { describe, expect, test } from "vitest"
import { resolveDid } from "./resolve-did"
import {
  InvalidDidError,
  DidNotFoundError,
  UnsupportedDidMethodError
} from "./errors"

describe("resolveDid", () => {
  test("should resolve a valid web DID", async () => {
    const { did, didDocument } = await resolveDid("did:web:venabl.es")
    expect(did).toBe("did:web:venabl.es")
    expect(didDocument).toBeDefined()
  })

  test("should resolve a valid key DID", async () => {
    const { did, didDocument } = await resolveDid(
      "did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8"
    )
    expect(did).toBe("did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8")
    expect(didDocument).toBeDefined()
  })

  test("should resolve a valid pkh DID", async () => {
    const { did, didDocument } = await resolveDid(
      "did:pkh:eip155:1:0x1234567890123456789012345678901234567890"
    )
    expect(did).toBe(
      "did:pkh:eip155:1:0x1234567890123456789012345678901234567890"
    )
    expect(didDocument).toBeDefined()
  })

  test("should throw InvalidDidError for non-string input", async () => {
    await expect(resolveDid(123)).rejects.toThrow(InvalidDidError)
    await expect(resolveDid(null)).rejects.toThrow(InvalidDidError)
    await expect(resolveDid(undefined)).rejects.toThrow(InvalidDidError)
  })

  test("should throw InvalidDidError for invalid DID format", async () => {
    await expect(resolveDid("not-a-did")).rejects.toThrow(InvalidDidError)
    await expect(resolveDid("did:")).rejects.toThrow(InvalidDidError)
  })

  test("should throw UnsupportedDidMethodError for unsupported DID methods", async () => {
    await expect(resolveDid("did:unknown:123")).rejects.toThrow(
      UnsupportedDidMethodError
    )
  })

  test("should throw DidNotFoundError for non-existent DID", async () => {
    await expect(
      resolveDid("did:web:non-existent-domain.example")
    ).rejects.toThrow(DidNotFoundError)
  })
})
