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

import '../src/assets/css/index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { createTheme } from '@mui/material/styles'

export const colors = Object.freeze({
  greyscale: {
    white: '#FFFFFF',
    whiteSmoke: '#F6F4F1',
    lightGrey: '#E7E5E4',
    grey: '#D0CECC',
    neutral: '#909090',
    platinum: '#DEDAD5',
    stone: '#ADABA8',
    liver: '#4F4D48',
    black: '#000000',
  },
  primary: {
    darkTerraCotta: '#D65151',
    darkRed: '#900000',
  },
  secondary: {
    green: '#00838B',
    turquoise: '#35CFBE',
    electricBlue: '#89F9EE',
  },
  special: {
    linkBlue: '#006FE3',
    sunnyYellow: '#FFDF6B',
    earth: '#E28743',
  },
} as const)

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    submit: true
    secondary: true
  }
}
declare module '@mui/material/Chip' {
  interface ChipPropsSizeOverrides {
    smaller: true
  }
}

export const theme = createTheme({
  palette: {
    background: {
      default: colors.greyscale.whiteSmoke,
    },
    text: {
      primary: colors.greyscale.black,
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: 'medium',
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: '0',
          '&&:before': {
            backgroundColor: 'white',
          },
          '&&.Mui-expanded': {
            margin: '0',
          },
          '&.MuiPaper-elevation1': {
            boxShadow: 'unset',
          },
        },
      },
    },
    MuiAccordionSummary: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        content: {
          margin: '0',
        },
        root: {
          padding: '0',
        },
        expandIconWrapper: {
          margin: '40px 0',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          display: 'block',
          padding: '0 0 24px 0',
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: colors.greyscale.black,
          '&.Mui-checked': {
            color: colors.primary.darkTerraCotta,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: colors.greyscale.black,
          '&.Mui-checked': {
            color: colors.primary.darkTerraCotta,
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          variants: [
            {
              props: { variant: 'secondary' },
              style: {
                textTransform: 'none',
                background: colors.greyscale.lightGrey,
                color: colors.greyscale.black,
                boxShadow: '0 1px 4px 0 #00000066',
                padding: '3px 20px',
                ':hover': {
                  background: colors.greyscale.neutral,
                },
              },
            },
            {
              props: { variant: 'submit', disabled: false },
              style: {
                textTransform: 'none',
                background: colors.greyscale.liver,
                color: colors.greyscale.white,
                boxShadow: '0 1px 4px 0 #00000066',
                padding: '3px 20px',
                '&:hover': {
                  background: colors.greyscale.black,
                },
              },
            },
            {
              props: { variant: 'submit', disabled: true },
              style: {
                textTransform: 'none',
                background: colors.greyscale.neutral,
                padding: '3px 20px',
              },
            },
          ],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        colorPrimary: {
          color: colors.primary.darkTerraCotta,
          borderColor: colors.primary.darkTerraCotta,
        },
        colorWarning: {
          backgroundColor: colors.primary.darkTerraCotta,
          '&.Mui-focusVisible': {
            backgroundColor: colors.primary.darkRed,
          },
        },
        root: {
          variants: [
            {
              props: { size: 'smaller' },
              style: {
                margin: '0 2px',
                fontSize: '11px',
                height: '20px',
                '& .MuiChip-label': {
                  padding: '8px',
                },
              },
            },
          ],
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: colors.greyscale.white,
          color: colors.greyscale.black,
          textTransform: 'none',
          border: '1 px solid #adaba8',
          '&.Mui-selected': {
            color: colors.greyscale.black,
            backgroundColor: '#d0cecc',
          },
        },
      },
    },
  },
})
