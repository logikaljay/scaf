# @logikaljay/scaf

`scaf` is a scaffolding tool. It allows you to define a template in JavaScript and then use scaffold that template out.

## Installation

`scaf` can be installed from npm globally, or run via npx.

### Global

```
$ npm i -g @logikaljay/scaf
```

### npx

```
$ npx @logikaljay/scaf
```

## Setting up your template

Your template should export `files` and `variables`.

### `files`

`files` is an array of objects that conform to the `ScaffoldFile` type.

**`file.name` `string`**

The name of the file.

**`file.content` `string`**

The content of the file.


### `variables`

`variables` is an array of strings that will be collected at runtime.

When the user supplies data for each variable, they can be modified by modifiers (see below).

### `argv`

You can automatically assign variables at runtime by providing arguments to `scaf`.

Firstly, make sure your template exports an called `argv`. This object must be keyed by a string and the values must be RegExp.
The RegExp can use [named groups](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Groups_and_backreferences#using_named_groups) to set even more variables.

EG:

**template.js**
```js
module.exports.argv = {
  endpoint: /\/api\/(?<service>\w+)\/(?<domain>\w+)\/(?<title>\w+)/i
}
```

```bash
$ scaf /api/core/Auth/GetSessions

Scaffolding with input 
{
  "service": "core",
  "domain": "auth",
  "title": "GetSessions",
  "endpoint": "/api/core/Auth/GetSessions"
}
```

## Modifiers

A `modifier` is used in the template by augmenting the name of the variable with the name of the modifier.

### Examples

When using the `{{title}}` variable, you can use the `toUpperCase` modifier on it: `{{title:toUpperCase}}`.

When using the `{{name}}` variable, make sure that it is title case so it can be displayed nicely: `{{name:toTitleCase}}`

You can also chain multiple modifiers together, they will be run in the order you chain them: `{{name:toUpperCase:toLowerCase}}` will result in a lowercase string being

**Available modifiers:**

`slug`  - replaces all ` ` with `-` and then `encodeURI`s the result.

`toLowerCase` - converts the input to lower case.

`toUpperCase` - summons a magical unicorn to fuck your shit up.

`toPascalCase` - converts the input `ToPascalCase`.

`toKebabCase` - converts the input `to-kebab-case`.

`toCamelCase` - converts the input `toCamelCase`.

`toTitleCase` - converts the input `To title case`.

### Todo

- [ ] multiple templates
- [ ] init to generate a template
- [x] argv processing using named RegExp groups
- [x] documentation