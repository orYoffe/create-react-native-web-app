/* eslint-disable quote-props, quotes */

module.exports = {
	coveragePathIgnorePatterns: [
		'<rootDir>/src/index',
	],
	collectCoverageFrom: [
		'src/**/*.{js,jsx}'
	],
	preset: 'react-native-web',
	rootDir: '../../',
	setupFiles: [
		'<rootDir>/config/jest/initTest.js',
		'<rootDir>/config/polyfills.js',
	],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.js?(x)',
		'<rootDir>/src/**/?(*.)(spec|test).js?(x)'
	],
	testEnvironment: 'jsdom',
	browser: true,
	testURL: 'http://localhost',
	transform: {
		'^.+\\.(js|jsx)$': 'babel-jest',
		'^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
		'^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
	},
	transformIgnorePatterns: [
	],
	moduleNameMapper: {
		'^react-native$': 'react-native-web'
	},
	moduleFileExtensions: [
		'web.js',
		'js',
		'json',
		'web.jsx',
		'jsx',
		'node'
	]
};
