# React Native Web CLI
### create-react-native-web-app
### A simple CLI tool to start your React Native Web project to develop same app for IOS Android and Web. Constructed from create-react-app and create-react-native-app

<p align="center" >
<img width="300"  src="https://raw.githubusercontent.com/VISI-ONE/create-react-native-web-app/master/template/src/logo.png">
</p>

## Installation

- Android - Install [adb (Android Debug Bridge)](https://developer.android.com/studio/releases/platform-tools.html)
- IOS - Xcode and an apple device required


- Install the package globally and run it with your name of choice

```sh
# Install package
$ npm install -g create-react-native-web-app

# Run create-react-native-web-app <project-directory>
$ create-react-native-web-app myApp

# cd into your <project-directory>
$ cd myApp

# Run Web/Ios/Android development
# Web
$ npm run web

# IOS (simulator)
$ npm run ios

# Android (connected device)
$ npm run android

```

- Optional - Install Xcode and Android studio and follow the react native instructions [under the "Building Projects with Native Code" tab](http://facebook.github.io/react-native/docs/getting-started.html)

<p align="center" >
<img width="1000"  src="https://raw.githubusercontent.com/VISI-ONE/create-react-native-web-app/master/cli_preview.png">
</p>

## Folder structure
```
myApp
├── node_modules
├── package.json
├── index.js
├── .watchmanconfig
├── .flowconfig
├── app.json
├── .gitignore
├── android (When opening with Android studio, open this folder)
│   └── android project files
├── config
│   ├── jest
│   │    │── initTest.js
│   │    │── native.jest.config.js
│   │    │── web.jest.config.js
│   │    └── jest transform files
│   ├── env.js
│   ├── paths.js
│   ├── polyfills.js
│   ├── webpack.config.dev.js
│   ├── webpack.config.prod.js
│   └── webpackDevServer.config.js
├── ios (When opening with Xcode, open this folder)
│   └── ios project files
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── scripts
│   ├── build.js
│   ├── start.js
│   ├── switchSnapshots.js
│   └── test.js
└── src
    ├── App.js
    ├── App.test.js
    ├── index.css # global
    ├── index.js
    ├── logo.png
    └── registerServiceWorker.js
```

## Testing

```sh
# Web and Native
$ npm run test

# Web
$ npm run test:web

# Web watch mode
$ npm run test:web-watch


# Native
$ npm run test:native

# Native watch mode
$ npm run test:native-watch


# Coverage - web
$ npm run coverage

# Coverage - native
$ npm run coverage:native
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


# Contributors
- Or Yoffe https://github.com/orYoffe

## Resources
- [React Native for Web (react-native-web)](https://github.com/necolas/react-native-web)
- [React](https://reactjs.org/)
- [React Native](http://facebook.github.io/react-native/)
- [Create React App](https://github.com/facebook/create-react-app)
- [Create React Native App](https://github.com/react-community/create-react-native-app)
