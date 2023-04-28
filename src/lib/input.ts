import prompt from "prompt"

export function getCLIInput(argv: RegExp) {
  let cliInput = {}
  if (argv) {
    let matches = argv.exec(process.argv.slice(2).join(''))
    if (matches && matches.groups) {
      cliInput = {
        ...matches.groups,
        endpoint: matches[0]
      }
    }
  }

  return cliInput
}

export async function getPromptInput(cliInput: Record<string, any>, variables: string[]) {
  prompt.override = cliInput
  prompt.message = ``
  prompt.delimiter = `:`
  prompt.start()
  let input = await prompt.get(variables.map((variable: any) => ({
    name: variable,
    description: [variable[0].toUpperCase(), ...variable.substr(1)].join('')
  })))

  return input
}