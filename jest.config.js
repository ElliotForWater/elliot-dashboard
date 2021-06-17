module.exports = {
  collectCoverageFrom: [
    '**/*.{js,ts,tsx}',
    '!**/node_modules/**',
    '!**/tests/**',
    '!**/coverage/**',
    '!jest.config.js',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFiles: ['<rootDir>/enzymeConfig.js'],
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/tests/', '/coverage/', 'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/__mocks__/CssStub.js',
  },
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
}
