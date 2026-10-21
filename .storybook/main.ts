import type { StorybookConfig } from '@storybook/react-webpack5'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-babel',
    '@storybook/addon-docs',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    defaultName: 'Dokumentation',
  },
  core: {
    disableTelemetry: true,
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.plugins = [
        ...(config.resolve.plugins || []),
        new TsconfigPathsPlugin({
          extensions: config.resolve.extensions,
        }),
      ]
    }
    return config
  },
  /* This is a fix due to a bug in v10.3.6, see:
   *   https://github.com/storybookjs/storybook/issues/34626 */
  managerHead: (head) => `
    ${head}
    <style>
      main[aria-labelledby="main-preview-heading"] > div {
        place-content: stretch;
      }
    </style>
  `,
}
export default config
