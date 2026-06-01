import { splitIntoWords, toPairs } from 'src/infrastructure/helper'

describe('Helper functions', () => {
  describe('split into words', () => {
    it('handles whitespace', () => {
      expect(splitIntoWords('  a\nb\t\t\n  c  ')).toEqual(['a', 'b', 'c'])
    })
    it('handles special characters', () => {
      expect(splitIntoWords("a'b c.d")).toEqual(["a'b", 'c.d'])
    })
  })

  describe('to pairs', () => {
    it.each([
      [[], []],
      [[1], []],
      [[1, 2], [[1, 2]]],
      [
        [1, 2, 3],
        [
          [1, 2],
          [2, 3],
        ],
      ],
      [
        [1, 2, 3, 4],
        [
          [1, 2],
          [2, 3],
          [3, 4],
        ],
      ],
    ])('%p becomes %p', (input, pairs) => {
      expect(toPairs(input)).toEqual(pairs)
    })
  })
})
