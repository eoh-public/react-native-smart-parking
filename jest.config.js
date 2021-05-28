module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svgMock.js',
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      statements: 86.82,
      branches: 77.94,
      functions: 82.17,
      lines: 87.18,
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
