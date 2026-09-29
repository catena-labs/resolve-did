import { describe, expect, it } from "bun:test"
import { fileURLToPath } from "node:url"

const CLI_PATH = fileURLToPath(new URL("./cli.ts", import.meta.url))
const OFFLINE_DID = "did:key:z6MknEES6VA14awWdV27ab5r1jtz3d6ct2wULmvU4YgE1wQ8"

describe("cli piped output", () => {
  it("emits no ANSI escapes when stdout is not a TTY", async () => {
    const proc = Bun.spawn(["bun", CLI_PATH, OFFLINE_DID], {
      stdout: "pipe",
      stderr: "pipe",
    })
    const [stdout, exitCode] = await Promise.all([
      new Response(proc.stdout).text(),
      proc.exited,
    ])
    expect(exitCode).toBe(0)
    expect(stdout).not.toContain("\x1b[")
    expect(stdout).toContain(OFFLINE_DID)
  })
})
