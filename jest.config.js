module.exports = {
  browser: false,
  verbose: true,
  reporters: ['default', 'jest-html-reporters'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['test/*/*.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 10
    }
  },
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js', 'jest-extended']
}
