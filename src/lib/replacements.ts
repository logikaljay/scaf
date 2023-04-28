import type { ScaffoldVariables } from "../types/variables"

export const fn = {
  slug: (text: string) => text.replace(/ /g, '-'),
  toLowerCase: (text: string) => text.toLowerCase(),
  toUpperCase: (text: string) => text.toUpperCase(),
  toPascalCase: (text: string) => text.toLowerCase()
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3}`
    )
    .replace(new RegExp(/\w/), s => s.toUpperCase()),
  toKebabCase: (text: string) => text
    .replace(/[A-Z]+(?![a-z])|[A-Z]/g, (_, match) => (match ? "-" : "") + _.toLowerCase()),
  toCamelCase: (text: string) => text
    .replace(/^[A-Z]/, (_) => _.toLowerCase())
    .replace(/ (\w)/g, (_, match) => match.toUpperCase())
    .replace(/-(\w)/g, (_, match) => match.toUpperCase())
    .replace(/_(\w)/g, (_, match) => match.toUpperCase()),
  toTitleCase: (text: string) => text.replace(/[ A-Z]/g, (_: any, match: any) => (match ? ` ${_.toLowerCase()}` : _.toUpperCase()))
}

export function doReplacements(input: string, values: Record<string, any>, variables: ScaffoldVariables) {
  for (let [variableName, ...modifiers] of variables) {
    if (modifiers.length > 0) {
      let value = values[variableName]
      const key = [variableName]
      modifiers.forEach(modifier => {
        key.push(modifier)
        if (!(fn as any)[modifier]) {
          console.log('')
          console.log(`Missing modifier '${modifier}. Used in ${variableName}:${modifiers.join(":")}'`)
          console.log(` ❌ Aborted.`)
          process.exit(1)
        }

        value = (fn as any)[modifier](value)
      })
      input = input.replace(`{{${key.join(':')}}}`, value)
    }
    else {
      input = input.replace(`{{${variableName}}}`, values[variableName])
    }
  }

  return input
}