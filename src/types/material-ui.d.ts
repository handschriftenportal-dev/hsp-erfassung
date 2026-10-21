export {};

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    submit: true;
    secondary: true;
  }
}
declare module "@mui/material/Chip" {
  interface ChipPropsSizeOverrides {
    smaller: true;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    "gnd-link": true;
  }
}
declare module "@mui/material/FormLabel" {
  interface FormLabelPropsColorOverrides {
    readonly: true;
  }
}
