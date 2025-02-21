import React, { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import type { Decorator, Preview } from '@storybook/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { colors, theme } from '../src/theme'
import i18n from '../src/infrastructure/i18n/i18n'
import Store from '../src/infrastructure/ConfigureReduxStore'
import { updateConfiguration } from '../src/domain/erfassung/ErfassungsState'
import '../src/assets/css/index.css'
import { SBBNormdatenServiceAdapter } from '../src/infrastructure/normdaten/SBBNormdatenServiceAdapter'

export const WithMuiTheme: Decorator = (Story) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  )
}

export const WithI18next: Decorator = (Story, context) => {
  const { locale } = context.globals

  // When the locale global changes
  // Set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return (
    <Suspense fallback={<div>loading translations...</div>}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  )
}

const normdatenUrl =
  'http://normdaten.staatsbibliothek-berlin.de:9299/rest/graphql'
const validationUrl =
  'http://import.handschriftenportal.de:9296/rest/tei-xml/validate'
// Paste a valid authorization token to test against normdaten service
const authorizationToken = ''

export const WithRedux: Decorator = (Story) => {
  Store.dispatch(
    updateConfiguration({
      normdatenUrl,
      validationUrl,
      authorizationToken,
    })
  )
  SBBNormdatenServiceAdapter.updateConfiguration({
    normdatenUrl,
    authorizationToken,
  })
  return (
    <Provider store={Store}>
      <Story />
    </Provider>
  )
}

export const decorators = [WithMuiTheme, WithI18next, WithRedux]

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Sprachauswahl',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'de', title: 'Deutsch' },
      ],
      showName: true,
    },
  },
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'White Smoke',
      values: [
        { name: 'White', value: colors.greyscale.white },
        { name: 'White Smoke', value: colors.greyscale.whiteSmoke },
        { name: 'Liver', value: colors.greyscale.liver },
        { name: 'Black', value: colors.greyscale.black },
      ],
    },
    docs: {
      toc: {
        title: 'Inhaltsverzeichnis',
      },
    },
  },

  tags: ['autodocs', 'autodocs'],
}

export default preview
