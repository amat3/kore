/** @type {import('jest').Config} */
module.exports = {
  testEnvironment:   'jsdom',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  setupFilesAfterFramework: ['@testing-library/jest-dom'],
}
