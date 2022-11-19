/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  automock: false,
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: 'node',
};