import { resolveDid } from "../src/resolve-did"

async function main() {
  try {
    // Resolve a web-based DID
    const { did, didDocument } = await resolveDid("did:web:venabl.es")
    console.log("Resolved DID:", did)
    console.log("DID Document:", JSON.stringify(didDocument, null, 2))
  } catch (error) {
    console.error("Error:", error)
  }
}

main()
