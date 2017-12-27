module.exports = {
  transform: {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
  testMatch: [
    "**/__tests__/**/*.(js|ts)?(x)",
    "**/?(*.)(test|spec).(ts|js)?(x)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "json", "jsx"],
  collectCoverage: false,
}
