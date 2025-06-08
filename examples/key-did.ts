import { resolveDid } from "../src/resolve-did"

async function main() {
  try {
    // Resolve a secp256k1 key-based DID
    const secp256k1Did = "did:key:zQ3shNCcRrVT3tm43o6JNjSjQaiBXvSb8kHtFhoNGR8eimFZs"
    console.log("\nResolving secp256k1 DID:", secp256k1Did)
    const { didDocument: secp256k1Doc } = await resolveDid(secp256k1Did)
    console.log("DID Document:", JSON.stringify(secp256k1Doc, null, 2))

    // Resolve an Ed25519 key-based DID
    const ed25519Did = "did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8"
    console.log("\nResolving Ed25519 DID:", ed25519Did)
    const { didDocument: ed25519Doc } = await resolveDid(ed25519Did)
    console.log("DID Document:", JSON.stringify(ed25519Doc, null, 2))
  } catch (error) {
    console.error("Error:", error)
  }
}

main()
