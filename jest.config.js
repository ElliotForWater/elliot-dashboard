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
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/tests/', '/coverage/', 'node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)'],
  moduleNameMapper: {
    '^.+\\.(css|less)$': '<rootDir>/__mocks__/CssStub.js',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '.(ts|tsx)': 'ts-jest',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/fileTransformer.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  testEnvironment: 'jsdom',
}
