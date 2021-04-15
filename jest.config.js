module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 74.72,
      branches: 69.7,
      functions: 65.78,
      lines: 75.06,
    },
  },
  modulePathIgnorePatterns: ['SampleProject'],
  coveragePathIgnorePatterns: ['/Images/', '/\\.json/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/libs/**',
  ],
  transformIgnorePatterns: ['node_modules/(?!react\b)\bw+\b'],
  setupFiles: [
    'dotenv/config',
    './jest/setup.js',
    './jest/react-native-reanimated.setup.js',
    './jest/react-native-stripe.setup.js',
    './jest/react-native-vnpay-merchant.setup.js',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  setupFilesAfterEnv: ['./jest/test-setup.js'],
  globalSetup: './jest/global-setup.js',
  testEnvironment: 'jsdom',
};
