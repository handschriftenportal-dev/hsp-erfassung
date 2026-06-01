import type { InvertibleTransformation } from 'src/domain/erfassung/transformation/InvertibleTransformation'
import { compose } from 'src/domain/erfassung/transformation/InvertibleTransformation'

describe('Transformation', () => {
  it('composing isomorphism yields isomorphism', () => {
    const f: InvertibleTransformation<number, number> = {
      transform(x) {
        return x * 2
      },
      invert(x) {
        return x / 2
      },
    }
    const g: InvertibleTransformation<number, number> = {
      transform(x) {
        return x + 1
      },
      invert(x) {
        return x - 1
      },
    }
    const h = compose(f, g)
    const i = compose(g, f)
    const tests: number[] = [-10, 2, 0, 4, 42, 100]
    tests.forEach((x) => {
      expect(h.invert(h.transform(x))).toBe(x)
      expect(i.invert(i.transform(x))).toBe(x)
    })
  })

  it('on different domains compose to codomain', () => {
    const f: InvertibleTransformation<boolean, string> = {
      transform(b) {
        return b.toString()
      },
      invert(s) {
        return Boolean(s)
      },
    }
    const g: InvertibleTransformation<string, number> = {
      transform(s) {
        return s.length
      },
      invert(n) {
        return 'x'.repeat(n)
      },
    }
    const h = compose(f, g)
    expect(typeof h.transform(true)).toBe('number')
    expect(typeof h.transform(false)).toBe('number')
    expect(typeof h.invert(5)).toBe('boolean')
    expect(typeof h.invert(0)).toBe('boolean')
  })
})
