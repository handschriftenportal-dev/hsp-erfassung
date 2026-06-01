module.exports = {
  collectCoverageFrom: [
    './src/**',
  ],
  coverageDirectory: './test-reports',
  collectCoverage: !!process.env.CI,
  coverageReporters: process.env.CI ? ['lcov'] : ['text-summary'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    // mocks out style imports. due to Mirador imports style files.
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    // 'axios': 'axios/dist/node/axios.cjs',
    '^src/(.*)$': '<rootDir>/src/$1',
    '^test/(.*)$': '<rootDir>/test/$1',
    '^skripte/(.*)$': '<rootDir>/skripte/$1',
    '^stories/(.*)$': '<rootDir>/stories/$1',
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
  transformIgnorePatterns: [
    'node_modules/(?!(uuid|until-async)/)',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/stories/', '/src/infrastructure/i18n/'],
  testPathIgnorePatterns: [
    '/out',
    '/dist',
  ]
}
