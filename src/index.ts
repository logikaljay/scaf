import path from "node:path"
import fs from "node:fs"
import { getVariables } from "./lib/variables"
import { doReplacements } from "./lib/replacements"
import { getCLIInput, getPromptInput } from "./lib/input"
import { validateFilesDontExist } from "./lib/validate"

export async function scaffold(files: ScaffoldFile[], variables: string[], argv: RegExp) {

  // process the CLI input
  let cliInput = getCLIInput(argv)

  console.log(`Scaffolding`)

  if (cliInput) {
    console.log(`with input`, JSON.stringify(cliInput, null, 2))
  }

  console.log('')
  console.log(`Please supply the following variables:`)

  // collect variables
  let input = await getPromptInput(cliInput, variables)

  // validate the files don't already exist
  validateFilesDontExist(files, input)
  
  // scaffold the files
  for (let file of files) {
    let fileName = doReplacements(file.name, input, getVariables(file.name))
    let content = doReplacements(file.content, input, getVariables(file.content))

    // write the content to the fileName
    let filePath = path.dirname(fileName)
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath, { recursive: true })
    }
    
    fs.writeFileSync(fileName, content)
    console.log(` + '${fileName}' created`)
  }

  console.log('')
  console.log(` 🎉 All done 🎉`)
}