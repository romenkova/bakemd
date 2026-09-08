#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { parseArgs } from "node:util"
import { build, dev, codeThemeFile } from "../lib/vite.js"

const USAGE = `Usage:
  bakemd build [folder] [--out dist]
  bakemd dev [folder] [--port 5174]

The folder holds the Markdown pages, a bakemd.json, and optionally a _public/
directory for static files. It defaults to the current folder.`

function fail(message) {
  console.error(message)
  process.exit(1)
}

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: {
    out: { type: "string", short: "o", default: "dist" },
    port: { type: "string", short: "p", default: "5174" },
  },
})
const [command, folder = "."] = positionals

if (!["build", "dev"].includes(command)) fail(USAGE)

const content = resolve(folder)
const configFile = join(content, "bakemd.json")
if (!existsSync(configFile)) fail(`${configFile}: not found`)

const config = JSON.parse(readFileSync(configFile, "utf-8"))
for (const key of ["name", "site", "description"])
  if (!config[key]) fail(`bakemd.json: "${key}" is required`)
if (config.theme && !existsSync(join(content, config.theme)))
  fail(`bakemd.json: theme file ${join(content, config.theme)} not found`)
if (config.codeTheme && !codeThemeFile(config.codeTheme))
  fail(
    `bakemd.json: codeTheme "${config.codeTheme}" not found. Names are the files in node_modules/highlight.js/styles, like github-dark`
  )
if (!URL.canParse(config.site)) fail(`bakemd.json: "site" must be a URL`)
config.base = new URL(config.site).pathname.replace(/\/$/, "")

if (command === "build") await build(content, config, resolve(values.out))
else await dev(content, config, Number(values.port))
