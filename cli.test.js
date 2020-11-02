const chalk = require('chalk');
const execSync = require('child_process').execSync;

const originalConsoleLog = console.log;
console.log = jest.fn(() => true);

const originalConsoleError = console.error;
console.error = jest.fn();

jest.mock('child_process', () => {
  const execSync = jest.fn();

  return {execSync};
});

jest.mock('chalk', () => {
  const red = jest.fn((text) => text);
  const cyan = jest.fn((text) => text);
  const green = jest.fn((text) => text);
  const magenta = jest.fn((text) => text);

  return {
    red,
    cyan,
    green,
    magenta,
  };
});

describe('cli runs properly', () => {
  it('cli runs with argument and logs info', (done) => {
    process.argv[2] = 'myFakeName';
    jest.requireActual('./cli');

    let isYarnAvailable;
    try {
      execSync('yarnpkg --version', {stdio: 'ignore'});
      isYarnAvailable = true;
    } catch (e) {
      isYarnAvailable = false;
    }

    const packageManagerRunCommand = isYarnAvailable ? 'yarn' : 'npm run';
    process.nextTick(() => {
      expect(chalk.red.mock.calls).toEqual([]);
      expect(chalk.cyan.mock.calls).toEqual([
        ['⏳ Creating React Native Web App by the name of myFakeName'],
        ['cd myFakeName'],
        ['Then run the these commands to get started:'],
        [`${packageManagerRunCommand} web`],
        [`${packageManagerRunCommand} android`],
        [`${packageManagerRunCommand} ios`],
        [`${packageManagerRunCommand} test`],
        [`${packageManagerRunCommand} build`],
      ]);
      expect(chalk.green.mock.calls).toEqual([['<project-directory>']]);
      expect(chalk.magenta.mock.calls).toEqual([
        ['*'],
        ['change directory to your new project'],
        ['*'],
        ['To run development Web server'],
        ['*'],
        [
          'To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)',
        ],
        ['*'],
        [
          'To run ios simulator (after installing Xcode - only on Apple devices)',
        ],
        ['*'],
        ['To run tests for Native and Web'],
        ['*'],
        ['To run build for Web'],
      ]);

      expect(execSync.mock.calls).toEqual([
        [
          'npx react-native init myFakeName --template react-native-template-react-native-web',
          {stdio: [0, 1, 2]},
        ],
        ['yarnpkg --version', {stdio: 'ignore'}],
        ['cd myFakeName && git init'],
        ['yarnpkg --version', {stdio: 'ignore'}],
      ]);
    });
    done();
  });
});
