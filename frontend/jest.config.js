const {defaults} = require('jest-config');
module.exports = {
  setupFilesAfterEnv:["./src/setupTests.js"],
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
};