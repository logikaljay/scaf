module.exports.variables = [
  "endpoint",
  "service",
  "domain",
  "title",
  "description",
  "httpMethod"
]

module.exports.argv = {
  endpoint: /\/api\/(?<service>\w+)\/(?<domain>\w+)\/(?<title>\w+)/i
}

module.exports.files = [{
  name: "./src/{{service:toKebabCase}}/{{domain:toKebabCase}}/{{title:toKebabCase:slug}}/index.ts",
  content: `import { BaseClient } from "@/base-client";
import { inputSchema, InputSchema } from "./schemas/input";
import { outputSchema, OutputSchema } from "./schemas/output";

export const meta: EndpointMeta = {
  title: "{{title:toTitleCase}}",
  description: "{{description}}",
  jsMethod: "{{title:toCamelCase}}",
  endpoint: "{{endpoint}}",
  method: "{{httpMethod:toLowerCase}}",
  input: inputSchema,
  responses: {
    200: outputSchema
  }
}

export async function {{title:toCamelCase}}(this: BaseClient, input: InputSchema) {
  await this.require()
  const { endpoint, method } = meta
  const { body, queryString } = inputSchema.parse(input)

  const data = await this.fetch<OutputSchema>(endpoint, {
    method,
    body,
    queryString
  })

  return outputSchema.safeParse(data)
}
`
}, {
  name: "./src/{{service:toKebabCase}}/{{domain:toKebabCase}}/{{title:toKebabCase:slug}}/schemas/input.ts",
  content: `import * as z from "zod"

export const bodySchema = z.object({}).optional()
export const queryStringSchema = z.object({}).optional()

export const inputSchema = z.object({
  body: bodySchema,
  queryString: queryStringSchema,
})

export type InputSchema = z.input<typeof inputSchema>
`
}, {
  name: "./src/{{service:toKebabCase}}/{{domain:toKebabCase}}/{{title:toKebabCase:slug}}/schemas/output.ts",
  content: `import * as z from "zod"
import { abpResponseSchema } from "@/schemas/abp-response"

export const outputSchema = z.object({}).optional()
export type OutputSchema = z.output<typeof outputSchema>
`
}, {
  name: "./src/{{service:toKebabCase}}/{{domain:toKebabCase}}/{{title:toKebabCase:slug}}/index.test.ts",
  content: `import { ZodError } from "zod";
import { {{service:toPascalCase}}Client } from "../../{{service:toKebabCase}}-client";

const client = new {{service:toPascalCase}}Client()

it('should throw a ZodError if the input is not correct', async () => {
  const action = async () => await client.{{title:toCamelCase}}({
    // @ts-ignore - incorrect on purpose
    _foobar_: 1234,
  })

  expect(action()).rejects.toThrow(ZodError)
})

it('should return a valid payload", async () => {
  let data = await client.{{title:toCamelCase}}({
    queryString: {},
    body: {},
  })

  expect(data.success).toBeTruthy()
})`
}]
