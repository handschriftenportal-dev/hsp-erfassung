import { VorschauUtility } from 'src/domain/toolbar/dialog/nodes/VorschauUtility'

describe('Vorschau', () => {
  describe('indent', () => {
    it.each([
      [0, ''],
      [1, '  '],
      [3, '      '],
    ])('level %d produces "%s"', (level, expected) => {
      expect(VorschauUtility.indent(level)).toBe(expected)
    })
  })

  describe('format', () => {
    const veryLong = '_'.repeat(90)
    const long = '_'.repeat(50)
    const filler = VorschauUtility.indent(20)
    it.each([
      [' hallo    welt    ', 'hallo welt'],
      [
        ` hallo ${filler}\nwelt ${filler}${filler}goodbye\t\n${filler}\t mars. `,
        'hallo welt goodbye mars.',
      ],
      [veryLong, veryLong],
      [long + ' ' + long, long + '\n' + long],
      [veryLong + ' ' + long, veryLong + '\n' + long],
    ])('of level 0 makes "%s" to "%s"', (input, expected) => {
      expect(VorschauUtility.formatText(0, input)).toBe(expected)
    })

    it.each([
      [0, [20, 20, 20, 17], 1],
      [0, [20, 20, 20, 18], 2],
      [30, [10, 10, 10], 1],
      [30, [20, 19, 20], 2],
      [30, [50, 20, 20], 3],
    ])(
      'level %d with words of length %p has %d lines',
      (level, words, lines) => {
        const result = VorschauUtility.formatText(
          level,
          words.map((length) => 'a'.repeat(length)).join(' ')
        )
        expect(result.split('\n')).toHaveLength(lines)
      }
    )
  })
})
