import { KomponentenTransformation } from 'src/infrastructure/slate/transformation/KomponentenTransformation'

describe('Komponenten Transformation', () => {
  const { transform, invert } = KomponentenTransformation

  it('transforms Geschichte', () => {
    const input = {
      data: [
        {
          data_origin: 'history',
          children: [
            {
              data_origin: 'p',
              children: [{ text: 'hello world' }],
            },
          ],
        },
      ],
    }

    const output = transform(input)

    expect(output).toMatchObject({
      data: [
        {
          children: [
            {
              data_origin: 'p',
              children: [
                {
                  data_origin: 'volltext',
                },
              ],
            },
          ],
        },
      ],
    })

    expect(invert(output)).toMatchObject(input)
  })

  it('transforms Literatur', () => {
    const input = {
      data: [
        {
          data_origin: 'additional',
          children: [
            {
              data_origin: 'listBibl',
              children: [
                {
                  data_origin: 'bibl',
                  children: [{ text: 'hello world' }],
                },
              ],
            },
          ],
        },
      ],
    }

    const output = transform(input)

    expect(output).toMatchObject({
      data: [
        {
          children: [
            {
              data_origin: 'listBibl',
              children: [
                {
                  data_origin: 'bibl',
                  children: [
                    {
                      data_origin: 'volltext',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    })

    expect(invert(output)).toMatchObject(input)
  })
})
