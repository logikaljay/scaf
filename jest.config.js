module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "moduleNameMapper": {
    "^@/(.*)$": '<rootDir>/src/$1',
  },
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "verbose": true,
  "testTimeout": 60000
}