const nextJest = require('next/jest');

const createJestConfig = nextJest({
    dir: './',
});

const customJestConfig = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['lcov', 'text'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    testResultsProcessor: 'jest-sonar-reporter'
};

module.exports = createJestConfig(customJestConfig);
