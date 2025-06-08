import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { main, parseArgs } from "./cli"

describe("CLI", () => {
  const originalExit = process.exit
  const mockExit = vi.fn()

  beforeEach(() => {
    process.exit = mockExit as never
    vi.spyOn(console, "error").mockImplementation(() => {})
    vi.spyOn(console, "log").mockImplementation(() => {})
  })

  afterEach(() => {
    process.exit = originalExit
    vi.restoreAllMocks()
  })

  describe("parseArgs", () => {
    it("should parse DID URI from arguments", () => {
      const args = ["node", "resolve-did", "did:web:example.com"]
      const options = parseArgs(args)
      expect(options.didUri).toBe("did:web:example.com")
    })

    it("should parse --raw flag", () => {
      const args = ["node", "resolve-did", "did:web:example.com", "--raw"]
      const options = parseArgs(args)
      expect(options.raw).toBe(true)
    })

    it("should parse --help flag", () => {
      const args = ["node", "resolve-did", "--help"]
      const options = parseArgs(args)
      expect(options.help).toBe(true)
    })
  })

  it("should show help message when --help flag is used", async () => {
    await main(["node", "resolve-did", "--help"])
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining("Usage:"))
    expect(mockExit).toHaveBeenCalledWith(0)
  })

  it("should show error for missing DID URI", async () => {
    await main(["node", "resolve-did"])
    expect(console.error).toHaveBeenCalledWith("Missing DID URI")
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it("should show error for invalid DID URI", async () => {
    await main(["node", "resolve-did", "not-a-did"])
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Invalid DID URI")
    )
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it("should show error for unsupported DID method", async () => {
    await main(["node", "resolve-did", "did:unknown:123"])
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Unsupported DID method")
    )
    expect(mockExit).toHaveBeenCalledWith(1)
  })

  it("should resolve valid DID URI", async () => {
    await main(["node", "resolve-did", "did:web:venabl.es"])
    expect(console.log).toHaveBeenCalled()
    expect(mockExit).toHaveBeenCalledWith(0)
  })
})
