import fs from "node:fs"
import { doReplacements } from "./replacements"
import { getVariables } from "./variables"
import type { ScaffoldFile } from "@/types/file"

export function validateFilesDontExist(files: ScaffoldFile[], input: Record<string, any>) {
  for (let file of files) {
    let fileName = doReplacements(file.name, input, getVariables(file.name))
    if (fs.existsSync(fileName)) {
      console.log('')
      console.log(`File already exists at ${fileName}.`)
      console.log(` ❌ Aborted.`)
      process.exit(1)
    }
  }
}