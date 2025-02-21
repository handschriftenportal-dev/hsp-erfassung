/*
 * MIT License
 *
 * Copyright (c) 2024 Staatsbibliothek zu Berlin - Preußischer Kulturbesitz
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

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
