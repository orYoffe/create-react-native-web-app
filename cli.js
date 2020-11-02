#!/usr/bin/env node

const chalk = require('chalk');
const commander = require('commander');
// const fs = require('fs-extra');
// const path = require('path');
const execSync = require('child_process').execSync;
const packageJson = require('./package.json');
// const copyFiles = require('./copyFiles');

const nodeVersion = process.versions.node;
const nodeVersionSplitted = nodeVersion.split('.');
const nodeMajorVersion = nodeVersionSplitted[0];

if (nodeMajorVersion < 8) {
  console.error(
    chalk.red(`
      You are running Node ${nodeVersion}
      Create React Native Web App requires Node 8 or higher.
      Please update your version of Node.
  `),
  );
  process.exit(1);
}

const printCyan = (text) => console.log(`      ${chalk.cyan(text)}`);
// const printGreen = (text) => console.log(`      ${chalk.green(text)}`);

let appName;
const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .option('-r, --router')
  .usage(`${chalk.green('<project-directory>')}`)
  .action((name) => {
    appName = name;
  })
  .on('--help', () => {
    console.log(` ${chalk.green('<project-directory>')} is required.`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`,
    );
    printCyan(
      'https://github.com/orYoffe/create-react-native-web-app/issues/new',
    );
    console.log();
  })
  .parse(process.argv);

async function run() {
  if (appName) {
    printCyan(`⏳ Creating React Native Web App by the name of ${appName}`);
    console.log();

    execSync(
      `npx react-native init ${appName} --template react-native-template-react-native-web`,
      {stdio: [0, 1, 2]},
    );

    let isYarnAvailable;
    try {
      execSync('yarnpkg --version', {stdio: 'ignore'});
      isYarnAvailable = true;
    } catch (e) {
      isYarnAvailable = false;
    }

    try {
      execSync(`cd ${appName} && git init`);
    } catch (error) {}

    const packageManagerRunCommand = isYarnAvailable ? 'yarn' : 'npm run';
    console.log(`
        ${chalk.magenta('*')} ${chalk.magenta(
      'change directory to your new project',
    )}
        $ ${chalk.cyan(`cd ${appName}`)}

        $ ${chalk.cyan('Then run the these commands to get started:')}

        ${chalk.magenta('*')} ${chalk.magenta('To run development Web server')}
        $ ${chalk.cyan(packageManagerRunCommand + ' web')}

        ${chalk.magenta('*')} ${chalk.magenta(
      'To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)',
    )}
        $ ${chalk.cyan(packageManagerRunCommand + ' android')}

        ${chalk.magenta('*')} ${chalk.magenta(
      'To run ios simulator (after installing Xcode - only on Apple devices)',
    )}
        $ ${chalk.cyan(packageManagerRunCommand + ' ios')}

        ${chalk.magenta('*')} ${chalk.magenta(
      'To run tests for Native and Web',
    )}
        $ ${chalk.cyan(packageManagerRunCommand + ' test')}

        ${chalk.magenta('*')} ${chalk.magenta('To run build for Web')}
        $ ${chalk.cyan(packageManagerRunCommand + ' build')}
    `);
  } else {
    console.error(
      chalk.red(
        'In order to create a new project you must give a name as an argument. ',
      ),
      chalk.cyan('Example: create-react-native-web-app AppName'),
    );
    process.exit(1);
  }
}

try {
  run();
} catch (error) {
  console.error(error);
}
