const baseConfig = require('./jest.config');

module.exports = {
    ...baseConfig,
    roots: ['<rootDir>/src'],
    modulePaths: ['<rootDir>/dist']
};