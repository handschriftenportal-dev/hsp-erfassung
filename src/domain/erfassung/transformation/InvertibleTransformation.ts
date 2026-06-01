/**
 * Describes a transformation which is invertible up to equivalence.
 * Equivalence depends on the data structure which is invertible, not on the
 * mapping here, hence it is a vague concept.
 * Nevertheless, the invertible transformation composes.
 */
export type InvertibleTransformation<I, O> = {
  transform(input: I): O
  invert(output: O): I
}

export function compose<A, B, C>(
  f: InvertibleTransformation<A, B>,
  g: InvertibleTransformation<B, C>
): InvertibleTransformation<A, C> {
  return {
    transform(input: A) {
      return g.transform(f.transform(input))
    },
    invert(output: C) {
      return f.invert(g.invert(output))
    },
  }
}
