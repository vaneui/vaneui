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
  // Measure coverage over the WHOLE library, not just the files the tests
  // happen to import. Without this, Jest only instruments files reached by the
  // test run, so a brand-new untested module is silently excluded from the
  // denominator and cannot lower the global percentages — defeating the
  // regression gate. Barrels (index.ts) are pure re-exports, generated prop
  // descriptions are data, and the .d.ts/test files carry no shippable logic.
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/tests/**',
    '!src/**/index.ts',
    '!src/setupTests.ts',
    '!src/components/ui/props/propDescriptions.ts',
  ],
  // Enforced only when coverage is collected (CI runs `npm test -- --coverage`
  // on one matrix leg). Re-baselined against the whole-library denominator
  // above — measured lines 96.7%, statements 96.3%, functions 89.3%, branches
  // 84.1%; thresholds sit a few points below to guard regressions without
  // failing on every small change.
  coverageThreshold: {
    global: {
      lines: 95,
      statements: 95,
      functions: 85,
      branches: 80,
    },
  },
  silent: false,
  verbose: false,
};
