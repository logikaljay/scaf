import type { ScaffoldFile, FileKey } from "@/types/file"
import type { ScaffoldVariables } from "@/types/variables"

export function getVariables(input: string) {
  let matches = input.match(/{{(\w+|[\w+:\w+]+)}}/g) ?? []
  return matches
    .map(match => match.replace(/[{|}]/g, ''))
    .map(match => match.split(':'))
}

export function getVariableNames(matches: ScaffoldVariables) {
  return matches.map(([name]) => name)
}

export function getAllVariables(files: ScaffoldFile[]) {
  const variableNames = new Set()

  // get all variables
  for (let file of files) {
    for (let key in file) {
      let matches = getVariables(file[key as FileKey])
      getVariableNames(matches).forEach(name => variableNames.add(name))
    }
  }

  return variableNames
}