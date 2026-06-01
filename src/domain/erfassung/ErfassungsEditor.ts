export type ErfassungsEditor = {
  data_origin: string
}
export type ErfassungsElement = {
  data_origin: string
  id?: string
  error?: string
  region?: string
  component?: string
  level?: number
  teipath?: string
  path?: string
}
export type DataAttributes = {
  [K in `data_${string}`]?: string
}
export type ErfassungsText = { text: string; superskript?: boolean }
