import { Markdown } from 'skripte/utility/Markdown'

describe('Markdown', () => {
  const markdown = `### Identifikation (identifikation)
- In der Komponente **Identifikation** erfassen Sie alle Signaturen oder anderweitigen identifizierenden Angaben zur Handschrift.
- Hier finden Sie bereits die aktuellen Minimalinformationen zur Handschrift vor. Der **Ort**, die **besitzende Institution** sowie die **HSP-ID-Kulturobjekt** sind für Ihre Beschreibung bereits durch das Kulturobjekt festgelegt. Als **Signatur** ist gleichfalls die führende Signatur der Handschrift aus dem Kulturobjekt eingetragen. Hier können Sie sich aber - so vorhanden - auch für eine der im Kulturobjekt festgehaltenen Alternativen Signaturen der Handschrift entscheiden.
- Bei Bedarf können Sie die Komponente **Identifikation** um Angaben zu einer **Corpuszugehörigkeit** sowie zu **Vorbesitzsignaturen** erweitern.
  - Unter **Corpus** erfassen Sie die Zugehörigkeit der Handschrift zu einer oder mehreren fachlichen Gruppen von Handschriften. Dabei kann es sich beispielsweise um ein gemeinsames Skriptorium handeln. Die Angabe eines **Corpusnamens** ist verpflichtend, dieser kann frei gewählt werden. Er kann um einen **Identifikator** im Sinne einer laufender Nummer ergänzt werden, wenn ein solcher nicht existiert, kann das Feld leer bleiben.
  - Unter **Vorbesitzsignatur** erfassen Sie eine oder mehrere Vorbesitzsignaturen der Handschrift. Die Angabe der **Signatur** ist verpflichtend. **Ort** und **Institution** der dazugehörigen vorbesitzenden Einrichtung können - so bekannt - als Normdatenreferenz angelegt werden. Sind diese Angaben nicht zu ermitteln, so können die Felder leer bleiben.
  - Die Komponente **Identifikation** wird auch als Unterkomponente der materiell selbständigen Teile der Handschrift verwendet: **Einband**, **Fragment**, **Faszikel** und **Beigabe**. Anders als bei der Identifikation der Gesamthandschrift wird die Komponente dort nur bei Bedarf erfasst.

### Kopf (head)
- In der Komponente **Kopf** erfassen Sie die Kerninformationen zu Ihrer Handschrift. Diese umfassen im Wesentlichen die Informationen zu Titel und Schlagzeile.
- **Titel**: Erfassen Sie den Titel der Handschrift so, wie er im Portal angezeigt werden soll. Nutzen Sie hierfür bitte Groß- und Kleinschreibung sowie den hochgestellten Punkt (aus dem Sonderzeichendialog) als Trennzeichen zwischen Titelbestandteilen.
- **Titel weitere Publikation** (*Optional*): Erfassen Sie bei Bedarf zusätzlich den Titel der Handschrift so, wie er in einer weiteren Publikation (außerhalb der primären Beschreibung im HSP) dargestellt werden soll.
- **Schlagzeile**: Erfassen Sie die Informationen der Schlagzeile gemäß den DFG-Richtlinien als Freitext. Die einzelnen Bestandteile der Schlagzeile werden in den weiteren Feldern zu Recherchezwecken mit einem passenden Normdatum verknüpft.`

  it('can split markdown into headings and texts', () => {
    const sections = Markdown.toSections(markdown)
    expect(sections).toHaveLength(2)
    const [[identifikation, identifikationText], [kopf, kopfText]] = sections
    expect(identifikation).toBe('Identifikation (identifikation)')
    expect(identifikationText).toMatch(
      /^- In der Komponente \*\*Identifikation/
    )
    expect(kopf).toBe('Kopf (head)')
    expect(kopfText).toMatch(/^- In der Komponente \*\*Kopf/)
  })

  it('can create object from markdown', () => {
    const obj = Markdown.toObject(markdown)
    expect(obj).toMatchObject({
      'Identifikation (identifikation)':
        /^- In der Komponente \*\*Identifikation/,
      'Kopf (head)': /^- In der Komponente \*\*Kopf/,
    })
  })

  it('can manipulate object from markdown', () => {
    let count = 0
    function counter(_: string): string {
      count++
      return count.toString(10)
    }
    const obj = Markdown.toObject(markdown, counter, counter)
    expect(obj).toMatchObject({
      1: '2',
      3: '4',
    })
  })

  it('on duplicated headings uses last one', () => {
    const markdown = '# Lorem\n' + 'Lorem Ipsum\n' + '# Lorem\n' + 'Dolor sit'
    expect(Markdown.toObject(markdown)).toMatchObject({
      Lorem: /Dolor sit/,
    })
  })

  it('toJson can be parsed to object with proper key and html as value', () => {
    const json = Markdown.toJson(markdown)
    const deserialized = JSON.parse(json)
    expect(deserialized).toMatchObject({
      identifikation: /"<ul>/,
      head: /"<ul>/,
    })
  })

  it('understands two heading formats', () => {
    const markdown = `# Ueberschrift (heading)
    Lorem ipsum
    ### "head":
    dolor sic`
    const obj = JSON.parse(Markdown.toJson(markdown))
    expect(obj).toMatchObject({
      heading: /./,
      head: /./,
    })
  })

  it('uses last heading', () => {
    const markdown = `# Ueberschrift (heading)
    Lorem ipsum
    ### Andere Ueberschrift (heading)
    dolor sic
    `
    const obj = JSON.parse(Markdown.toJson(markdown))
    expect(obj).toMatchObject({
      heading: /dolor sic/,
    })
  })

  it('has fallback heading', () => {
    const markdown = `# HEADING 
    Lorem ipsum
    `
    const obj = JSON.parse(Markdown.toJson(markdown))
    expect(obj).toMatchObject({
      HEADING: /./,
    })
  })

  it('trims text', () => {
    const markdown = '# HEADING\t   \t\n\tLorem ipsum\n\n'
    const obj = JSON.parse(Markdown.toJson(markdown))
    expect(obj).toMatchObject({
      HEADING: /Lorem ipsum/,
    })
  })

  it('sorts keys', () => {
    const markdown = '# z\n1\n# y\n2\n# x\n3'
    expect(Markdown.toJson(markdown)).toBe(
      '{"x":"<p>3</p>","y":"<p>2</p>","z":"<p>1</p>"}'
    )
  })
})
