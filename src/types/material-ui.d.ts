export {}

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
