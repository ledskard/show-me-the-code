
module.exports = {
  roots: ["<rootDir>"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/infra/**",
    "!<rootDir>/src/migrations/**",
    "!<rootDir>/src/**/index.ts",
  ],
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "**/__tests__/**/*.spec.ts?(x)",
  ],
};
