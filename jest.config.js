module.exports = {
  preset: "ts-jest",
  testEnvironment: "enzyme",
  setupFilesAfterEnv: ["jest-enzyme"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  testEnvironmentOptions: {
    enzymeAdapter: "react16",
  },
  transform: {
    "^.+\\.tsx?$": "<rootDir>/jest.transformer.js",
    "^.+\\.(css|less)$": "<rootDir>/jest.style-mock.js",
    "^.+\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/jest.file-mock.js",
  },
  moduleNameMapper: {
    "lodash-es": "lodash",
  },
};
