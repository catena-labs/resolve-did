import { describe, it, expect } from "vitest"
import { resolveDid } from "./resolve-did"

describe("resolveDid", () => {
  it("resolves a did:web", async () => {
    const didUri = "did:web:venabl.es"
    const { did, didDocument } = await resolveDid(didUri)
    expect(did).toBe(didUri)
    expect(didDocument).toBeDefined()
    expect(didDocument?.id).toBe(didUri)
  })

  it("resolves a secp256k1 did:key", async () => {
    const didUri = "did:key:zQ3shNCcRrVT3tm43o6JNjSjQaiBXvSb8kHtFhoNGR8eimFZs"
    const { did, didDocument } = await resolveDid(didUri)
    expect(did).toBe(didUri)
    expect(didDocument).toBeDefined()
    expect(didDocument?.id).toBe(didUri)
    expect(didDocument?.verificationMethod).toBeDefined()
    expect(didDocument?.verificationMethod?.length).toBe(1)
    expect(didDocument?.verificationMethod?.[0]?.id).toBe(
      `${did}#zQ3shNCcRrVT3tm43o6JNjSjQaiBXvSb8kHtFhoNGR8eimFZs`
    )
    expect(didDocument?.verificationMethod?.[0]?.type).toBe(
      "Secp256k1VerificationKey2018"
    )
    expect(didDocument?.verificationMethod?.[0]?.publicKeyBase58).toEqual(
      "cFTR1Lyaa7qAYzcxMMrMm7p6GgQATjqimscU7nybYmi9"
    )
  })

  it("resolves an Ed25519 did:key", async () => {
    const didUri = "did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8"
    const { did, didDocument } = await resolveDid(didUri)
    expect(did).toBe(didUri)
    expect(didDocument).toBeDefined()
    expect(didDocument?.id).toBe(didUri)
    expect(didDocument?.verificationMethod).toBeDefined()
    expect(didDocument?.verificationMethod?.length).toBe(1)
    expect(didDocument?.verificationMethod?.[0]?.id).toBe(
      `${did}#z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8`
    )
    expect(didDocument?.verificationMethod?.[0]?.type).toBe(
      "Ed25519VerificationKey2018"
    )
    expect(didDocument?.verificationMethod?.[0]?.publicKeyBase58).toEqual(
      "8myPWEuZj3T3WzBQu281AeLzE3pmU9h7em1YEGiD6ick"
    )
  })

  it("resolves a did:pkh", async () => {
    const didUri = "did:pkh:eip155:1:0x0000000000000000000000000000000000000000"
    const { did, didDocument } = await resolveDid(didUri)
    expect(did).toBe(didUri)
    expect(didDocument).toBeDefined()
    expect(didDocument?.id).toBe(didUri)
    expect(didDocument?.verificationMethod).toBeDefined()
    expect(didDocument?.verificationMethod?.length).toBe(1)
    expect(didDocument?.verificationMethod?.[0]?.id).toBe(
      `${did}#blockchainAccountId`
    )
    expect(didDocument?.verificationMethod?.[0]?.type).toBe(
      "EcdsaSecp256k1RecoveryMethod2020"
    )
    expect(didDocument?.verificationMethod?.[0]?.blockchainAccountId).toEqual(
      "eip155:1:0x0000000000000000000000000000000000000000"
    )
  })
})
