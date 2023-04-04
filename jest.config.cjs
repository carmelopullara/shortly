module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['jest-fetch-mock'],
}
