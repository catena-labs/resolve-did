import { resolveDid } from "../src/resolve-did"

async function main() {
  try {
    // Resolve an Ethereum address DID
    const ethDid = "did:pkh:eip155:1:0x0000000000000000000000000000000000000000"
    console.log("Resolving Ethereum DID:", ethDid)
    const { didDocument } = await resolveDid(ethDid)
    console.log("DID Document:", JSON.stringify(didDocument, null, 2))
  } catch (error) {
    console.error("Error:", error)
  }
}

main()
