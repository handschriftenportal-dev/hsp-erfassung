export const SidebarComponentType = {
  struktur: 'struktur',
  sonderzeichen: 'sonderzeichen',
} as const
export type SidebarComponentType =
  (typeof SidebarComponentType)[keyof typeof SidebarComponentType]
