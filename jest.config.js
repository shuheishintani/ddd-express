/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require("path");

const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: "root-tests",
  testMatch: ["**/?(*.)+(spec|test).+(ts)"],
  testEnvironment: "node",
  clearMocks: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
