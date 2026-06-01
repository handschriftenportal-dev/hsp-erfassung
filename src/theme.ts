import './assets/css/index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { createTheme } from '@mui/material/styles'

function container() {
  return document.fullscreenElement ?? document.body
}

export const colors = Object.freeze({
  greyscale: {
    white: '#FFFFFF',
    whiteSmoke: '#F6F4F1',
    lightGrey: '#E7E5E4',
    ultima: '#F7F7F7',
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

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.darkTerraCotta,
    },
    background: {
      default: colors.greyscale.ultima,
    },
    text: {
      primary: colors.greyscale.black,
    },
  },
  components: {
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
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.special.linkBlue,
          cursor: 'alias',
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
    MuiTooltip: {
      defaultProps: {
        slotProps: {
          popper: {
            container,
          },
        },
      },
      styleOverrides: {
        tooltip: {
          fontSize: 'medium',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        container,
      },
    },
    MuiPopper: {
      defaultProps: {
        container,
      },
    },
  },
})
