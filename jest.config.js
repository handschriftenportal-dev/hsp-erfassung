module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**',
  ],
  coverageDirectory: './test-reports',
  coverageReporters: ['lcov'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    // mocks out style imports. due to Mirador imports style files.
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    // 'axios': 'axios/dist/node/axios.cjs',
  },
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: './test-reports',
      suiteName: 'hsp-erfassung'
    }]
  ],
  setupFilesAfterEnv: ['<rootDir>/test/jest-setup.ts'],
  testMatch: [
    '**/test/**/*.spec.ts',
    '**/test/**/*.spec.tsx'
  ],
  testEnvironment: 'jsdom',
  resolver: `./test/jest-resolver.js`,
  transform: {
    '^.+\\.(js|ts|tsx)$': ['ts-jest', { tsconfig: "tsconfig.test.json"}],
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/stories/', '/src/infrastructure/i18n/'],
  testPathIgnorePatterns: [
    '/out',
    '/dist',
  ]
}
