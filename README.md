# React Native Web CLI

### create-react-native-web-app

[![NPM](https://nodei.co/npm/create-react-native-web-app.png)](https://npmjs.org/package/create-react-native-web-app)

![GitHub issues](https://img.shields.io/github/issues/orYoffe/create-react-native-web-app.svg)
![license](https://img.shields.io/github/license/orYoffe/create-react-native-web-app.svg)
![GitHub top language](https://img.shields.io/github/languages/top/orYoffe/create-react-native-web-app.svg)
![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/create-react-native-web-app.svg)
![npm](https://img.shields.io/npm/v/create-react-native-web-app.svg)

### A simple CLI tool to start your React Native Web project to develop same app for IOS Android and Web

<p align="center" >
<img width="300"  src="https://raw.githubusercontent.com/orYoffe/create-react-native-web-app/master/template/src/logo.png">
</p>

## Installation

```sh
# Run create-react-native-web-app <project-directory>
$ npx create-react-native-web-app myApp

# if you previously installed this package globaly run this command first to uninstall the previous version:
# npm uninstall -g create-react-native-web-app

# cd into your <project-directory>
$ cd myApp

# Run Web/Ios/Android development
# Web
$ npm run web

# IOS
$ npm run ios

# Android
$ npm run android

```

- To work with IOS and Android - Install Xcode and Android studio and follow the react native instructions [under the "Building Projects with Native Code" tab](http://facebook.github.io/react-native/docs/getting-started.html)

<p align="center" >
<img width="1000"  src="https://raw.githubusercontent.com/orYoffe/create-react-native-web-app/master/cli_preview.png">
</p>

## Folder structure

```
myApp
├── android (When opening with Android studio, open this folder)
│   └── android project files
├── ios (When opening with Xcode, open this folder)
│   └── ios project files
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    └── project code
```

## Testing

```sh
# Web and Native
$ npm run test

# Web
$ npm run test:web

# Native
$ npm run test:native
```

## Debugging

Open dev menu:

1. CMD+D (IOS) / CMD+M (Android)
2. Press "Enable Live-Reload"

[React native docs - debugging real devices guide](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html)

[React native docs - debugging guide](http://facebook.github.io/react-native/docs/debugging.html)

[Network calls in the devtools](http://www.preslav.me/2017/03/26/debugging-network-calls-in-react-native-using-the-chrome-debugger/)

## Build

```sh
# Web
$ npm run build

# Android - upgrade the current build version in `android/app/build.gradle` file (both the `versionCode` and the `versionName`)
Example:
versionCode 2
versionName "1.1"

# And then run the build
$ cd android && ./gradlew assembleRelease

# Open apk folder to find the release apk
$ open ./android/app/build/outputs/apk
```

[React native docs - Android signed apk](http://facebook.github.io/react-native/releases/0.49/docs/signed-apk-android.html)

[React native docs for IOS](http://facebook.github.io/react-native/releases/0.49/docs/running-on-device.html#building-your-app-for-production)

## Resources

- [React Native for Web (react-native-web)](https://github.com/necolas/react-native-web)
- [React](https://reactjs.org/)
- [React Native](http://facebook.github.io/react-native/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Create React Native App](https://github.com/react-community/create-react-native-app)
