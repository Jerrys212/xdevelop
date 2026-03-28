const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
    testEnvironment: "jsdom",
    setupFilesAfterFramework: ["@testing-library/jest-dom"],
    transform: {
        ...tsJestTransformCfg,
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
};
