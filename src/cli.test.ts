import { describe, expect, it } from "bun:test"
import { fileURLToPath } from "node:url"

import packageJson from "../package.json" with { type: "json" }

const CLI_PATH = fileURLToPath(new URL("./cli.ts", import.meta.url))

async function runCli(...args: string[]) {
  const proc = Bun.spawn(["bun", CLI_PATH, ...args], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(proc.stdout).text(),
    new Response(proc.stderr).text(),
    proc.exited,
  ])
  return { stdout, stderr, exitCode }
}

describe("cli --help", () => {
  it("exits 0 and prints usage to stdout", async () => {
    const { stdout, stderr, exitCode } = await runCli("--help")
    expect(exitCode).toBe(0)
    expect(stdout).toContain("Usage: resolve-did")
    expect(stdout).toContain("did:key")
    expect(stderr).toBe("")
  })

  it("supports -h", async () => {
    const { stdout, exitCode } = await runCli("-h")
    expect(exitCode).toBe(0)
    expect(stdout).toContain("Usage: resolve-did")
  })
})

describe("cli --version", () => {
  it("exits 0 and prints the package version", async () => {
    const { stdout, exitCode } = await runCli("--version")
    expect(exitCode).toBe(0)
    expect(stdout.trim()).toBe(packageJson.version)
  })

  it("supports -v", async () => {
    const { stdout, exitCode } = await runCli("-v")
    expect(exitCode).toBe(0)
    expect(stdout.trim()).toBe(packageJson.version)
  })
})
