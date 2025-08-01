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
    'utils/'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  silent: false,
  verbose: false,
};
