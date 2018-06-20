/* eslint-disable quote-props, quotes */

module.exports = {
	coveragePathIgnorePatterns: [
    '<rootDir>/src/index',
  ],
	coverageDirectory: 'coverageNative',
	preset: 'react-native',
	rootDir: '../../',
	collectCoverageFrom: [
		'src/**/*.{js,jsx}'
	],
	setupFiles: [
		'<rootDir>/config/jest/initTest.js',
		'<rootDir>/config/polyfills.js',
	],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.js?(x)',
		'<rootDir>/src/**/?(*.)(spec|test).js?(x)'
	],
	browser: false,
	testEnvironment: 'node',
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
	},
	transformIgnorePatterns: [], // the array has to be here (no idea why, but it breaks if its gone) ¯\_(ツ)_/¯
	moduleFileExtensions: [
		'ios.js',
		'android.js',
		'js',
		'json',
		'jsx',
		'node'
	]
};
