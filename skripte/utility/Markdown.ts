import markdownit from 'markdown-it'

const headingMatcher = /^\s*#+ (.*)/
const keyRegex = /\((.*)\)|"(.*)":/
const md = markdownit({
  html: true,
})

function toSections(markdown: string): [heading: string, text: string][] {
  const sections: [string, string][] = []
  let heading = ''
  let text = ''
  markdown.split('\n').forEach((line) => {
    const match = line.match(headingMatcher)
    if (match !== null) {
      if (text !== '') {
        sections.push([heading, text])
      }
      text = ''
      heading = match[1]
    } else {
      text = text + line.trimEnd() + '\n'
    }
  })
  sections.push([heading, text])
  return sections
}

function toObject(
  markdown: string,
  keyFn: (heading: string) => string = identity,
  valueFn: (text: string) => string = identity
): Record<string, string> {
  const sections = toSections(markdown)
  return Object.fromEntries(
    sections.map(([heading, text]) => [keyFn(heading), valueFn(text)])
  )
}

function toJson(markdown: string): string {
  const obj = toObject(markdown, improveKey, improveValue)
  return JSON.stringify(obj, Object.keys(obj).sort())
}

function identity<T>(x: T): T {
  return x
}
function improveKey(key: string): string {
  const match = key.match(keyRegex)
  return (match?.[1] ?? match?.[2] ?? key).trim()
}
function improveValue(value: string): string {
  return md.render(value.trim()).trim()
}

export const Markdown = Object.freeze({
  toSections,
  toObject,
  toJson,
})
