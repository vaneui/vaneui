/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true,
    }],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testMatch: [
    '**/src/**/tests/**/*.ts?(x)',
    '**/src/**/?(*.)+(spec|test).ts?(x)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    'tests/utils/',
    '\\.d\\.ts$'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  // Enforced only when coverage is collected (CI runs `npm test -- --coverage`
  // on one matrix leg). Baseline at the time of introduction: lines 96.8%,
  // statements 96.8%, functions 79.6%, branches 84.6% — thresholds sit a few
  // points below to guard regressions without failing on every small change.
  coverageThreshold: {
    global: {
      lines: 95,
      statements: 95,
      functions: 75,
      branches: 80,
    },
  },
  silent: false,
  verbose: false,
};
