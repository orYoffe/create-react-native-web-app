const chalk = require('chalk');
const commander = require('commander');
const fs = require('fs-extra');
const path = require('path');
const execSync = require('child_process').execSync;
const packageJson = require('./package.json');

jest.mock('fs-extra', () => {
  const ensureDirSync = jest.fn();
  const emptyDirSync = jest.fn();
  const copySync = jest.fn();

  return {
    ensureDirSync,
    emptyDirSync,
    copySync,
  };
});

const originalConsoleLog = console.log;
console.log = jest.fn();

const originalConsoleError = console.error;
console.error = jest.fn();

jest.mock('child_process', () => {
  const execSync = jest.fn();

  return { execSync };
});

jest.mock('chalk', () => {
  const red = jest.fn(text => text);
  const cyan = jest.fn(text => text);
  const green = jest.fn(text => text);
  const magenta = jest.fn(text => text);

  return {
    red,
    cyan,
    green,
    magenta,
  };
});

describe('cli runs properly', () => {
  it('cli runs with argument and logs info', () => {
    process.argv[2] = 'myFakeName';
    jest.requireActual('./cli');

    expect(chalk.red.mock.calls).toEqual([]);
    expect(chalk.cyan.mock.calls).toEqual([['⏳ Creating React Native Web App by the name of myFakeName ...'], ['✅ Created project folder.'], ['✅ Added project files.'], ['⏳ Installing project dependencies...'], ['✅ Installed project dependencies.'], ['cd myFakeName'], ['Then run the these commands to get started:'], ['yarn web'], ['yarn android'], ['yarn ios'], ['yarn test'], ['yarn build']]);
    expect(chalk.green.mock.calls).toEqual([['<project-directory>'], ['✅ Done! 😁👍 Your project is ready for development.']]);
    expect(chalk.magenta.mock.calls).toEqual([['*'], ['change directory to your new project'], ['*'], ['To run development Web server'], ['*'], ['To run Android on connected device (after installing Android Debug Bridge \"adb\" - https://developer.android.com/studio/releases/platform-tools)'], ['*'], ['To run ios simulator (after installing Xcode - only on Apple devices)'], ['*'], ['To run tests for Native and Web'], ['*'], ['To run build for Web']]);

    expect(execSync.mock.calls).toEqual([
      ['yarnpkg --version', { stdio: 'ignore' }],
      ['cd myFakeName && yarn', { stdio: [0, 1, 2] }],
    ]);

    expect(fs.emptyDirSync.mock.calls).toEqual([['myFakeName']]);
    expect(fs.ensureDirSync.mock.calls).toEqual([['myFakeName']]);
    expect(fs.copySync.mock.calls).toEqual([[__dirname + '/template', 'myFakeName']]);

      const lastConsoleLog = `
      ${chalk.magenta('*')} ${chalk.magenta('change directory to your new project')}
      $ ${chalk.cyan(`cd myFakeName`)}

      $ ${chalk.cyan('Then run the these commands to get started:')}

      ${chalk.magenta('*')} ${chalk.magenta('To run development Web server')}
      $ ${chalk.cyan('yarn' + ' web')}

      ${chalk.magenta('*')} ${chalk.magenta('To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)')}
      $ ${chalk.cyan('yarn' + ' android')}

      ${chalk.magenta('*')} ${chalk.magenta('To run ios simulator (after installing Xcode - only on Apple devices)')}
      $ ${chalk.cyan('yarn' + ' ios')}

      ${chalk.magenta('*')} ${chalk.magenta('To run tests for Native and Web')}
      $ ${chalk.cyan('yarn' + ' test')}

      ${chalk.magenta('*')} ${chalk.magenta('To run build for Web')}
      $ ${chalk.cyan('yarn' + ' build')}
  `;
    expect(console.log.mock.calls).toEqual([
      ['      ⏳ Creating React Native Web App by the name of myFakeName ...'],
      [], ['      ✅ Created project folder.'], [], ['      ✅ Added project files.'],
      [], ['      ⏳ Installing project dependencies...'], [], ['      ✅ Installed project dependencies.'],
      [], ['      ✅ Done! 😁👍 Your project is ready for development.'], [], [`
        * change directory to your new project
        $ cd myFakeName

        $ Then run the these commands to get started:

        * To run development Web server
        $ yarn web

        * To run Android on connected device (after installing Android Debug Bridge \"adb\" - https://developer.android.com/studio/releases/platform-tools)
        $ yarn android

        * To run ios simulator (after installing Xcode - only on Apple devices)
        $ yarn ios

        * To run tests for Native and Web
        $ yarn test

        * To run build for Web
        $ yarn build
    `],
    ]);
  });
});

  // originalConsoleLog('----originalConsoleLog(require.cache);--', require.cache);
