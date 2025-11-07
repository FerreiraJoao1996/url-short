import type { Config } from 'jest';

const config: Config = {
    moduleFileExtensions: ["js", "json", "ts"],
    testRegex: ".*\\.e2e-spec\\.ts$",
    transform: {
        "^.+\\.ts$": "ts-jest"
    },
    testEnvironment: "node",
    roots: ["<rootDir>/src/tests"],
    moduleDirectories: ["node_modules", "src"],
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1'
    }
};

export default config;
