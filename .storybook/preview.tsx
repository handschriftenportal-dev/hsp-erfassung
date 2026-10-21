import 'src/assets/css/index.css'

import { CssBaseline, ThemeProvider } from '@mui/material'
import type { Decorator, Preview } from '@storybook/react-webpack5'
import React, { Suspense, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Provider } from 'react-redux'
import {
  updateConfiguration,
  updateGrundsprachen,
  updateTaggableNormdaten,
} from 'src/domain/erfassung/ErfassungsState'
import type { SubjectArea } from 'src/domain/erfassung/SubjectArea'
import Store from 'src/infrastructure/ConfigureReduxStore'
import i18n from 'src/infrastructure/i18n/i18n'
import { SBBNormdatenServiceAdapter } from 'src/infrastructure/normdaten/SBBNormdatenServiceAdapter'
import { colors, theme } from 'src/theme'
import { WithThemenbereichAPI } from 'stories/Decorators'
import buchkunde from 'test/infrastructure/normdaten/fixtures/buchkunde.json'
import buchschmuck from 'test/infrastructure/normdaten/fixtures/buchschmuck.json'
import einband from 'test/infrastructure/normdaten/fixtures/einband.json'
import grundsprachen from 'test/infrastructure/normdaten/fixtures/grundsprache.json'
import schriften from 'test/infrastructure/normdaten/fixtures/schriften.json'
import textsorten from 'test/infrastructure/normdaten/fixtures/textsorten.json'
import ueberlieferungsform from 'test/infrastructure/normdaten/fixtures/ueberlieferungsform.json'

const grundsprachenEntityFacts = grundsprachen.data.findGNDEntityFacts.sort(
  (fact, toCompare) => fact.preferredName.localeCompare(toCompare.preferredName)
)

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
  'https://erfassung.handschriftenportal.de/rest/beschreibungen/validate'
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
  Store.dispatch(
    updateTaggableNormdaten({
      buchkunde: true,
      einband: true,
      ueberlieferungsform: true,
    })
  )
  Store.dispatch(updateGrundsprachen(grundsprachenEntityFacts))
  return (
    <Provider store={Store}>
      <Story />
    </Provider>
  )
}

const subjectAreas: SubjectArea[] = [
  einband.data.findSubjectArea,
  buchschmuck.data.findSubjectArea,
  buchkunde.data.findSubjectArea,
  ueberlieferungsform.data.findSubjectArea,
  schriften.data.findSubjectArea,
  textsorten.data.findSubjectArea,
]

export const decorators = [
  WithMuiTheme,
  WithI18next,
  WithRedux,
  WithThemenbereichAPI(subjectAreas),
]

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
      options: {
        white: { name: 'White', value: colors.greyscale.white },
        ultima: { name: 'Ultima', value: colors.greyscale.ultima },
        white_smoke: {
          name: 'White Smoke',
          value: colors.greyscale.whiteSmoke,
        },
        liver: { name: 'Liver', value: colors.greyscale.liver },
        black: { name: 'Black', value: colors.greyscale.black },
      },
    },
    docs: {
      toc: {
        title: 'Inhaltsverzeichnis',
      },
    },
  },

  tags: ['autodocs', '!autodocs'],

  initialGlobals: {
    backgrounds: { value: 'ultima' },
  },
}

export default preview
