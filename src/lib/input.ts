import prompt from "prompt"

export function getCLIInput(argv: Record<string, RegExp>) {
  let cliInput = {}
  if (argv) {
    for (let variable in argv) {
      let regex = argv[variable]
      let matches = regex.exec(process.argv.slice(2).join(''))
      if (matches && matches.groups) {
        cliInput = {
          ...cliInput,
          ...matches.groups,
          [variable]: matches[0],
        }
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