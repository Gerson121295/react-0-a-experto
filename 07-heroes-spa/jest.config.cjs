module.exports = {
   transformIgnorePatterns: [
    'node_modules/(?!(query-string|decode-uri-component|split-on-first|filter-obj)/)',
  ], 
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],

  /*   moduleNameMapper: {
      "^query-string$": "<rootDir>/node_modules/query-string-v7"
    }  */
}