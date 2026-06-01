export interface Configuration {
  beschreibungsUrl: string
  validationUrl: string
  workspaceUrl: string
  normdatenUrl: string
  authorizationToken: string
  startInReadOnly: boolean
  isEditable: boolean
  language: 'de' | 'en'
  standalone: boolean
}

export type ConfigurationExtractor = (
  htmlElement: HTMLElement | null
) => Configuration
export const DEFAULT_CONFIGURATION: Configuration = Object.freeze({
  beschreibungsUrl: '',
  validationUrl: '',
  workspaceUrl: '',
  normdatenUrl: '',
  startInReadOnly: false,
  isEditable: false,
  language: 'de',
  standalone: true,
  authorizationToken: '',
})
