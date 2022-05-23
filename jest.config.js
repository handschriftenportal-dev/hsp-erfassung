const path = require('path')

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**',
  ],
  coverageDirectory: './test-reports',
  coverageReporters: ['lcov'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    // mocks out style imports. due to Mirador importts style files.
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
  },
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-reports',
      suiteName: 'hsp-erfassung'
    }]
  ],
  testMatch: [
    '**/test/**/*.spec.ts',
    '**/test/**/*.spec.tsx'
  ],
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/src/infrastructure/i18n/']
}
