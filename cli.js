#!/usr/bin/env node

const chalk = require("chalk");
const commander = require("commander");
const fs = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;
const packageJson = require("./package.json");

const nodeVersion = process.versions.node;
const nodeVersionSplitted = nodeVersion.split(".");
const nodeMajorVersion = nodeVersionSplitted[0];

if (nodeMajorVersion < 8) {
  console.error(chalk.red(`
      You are running Node ${nodeVersion}
      Create React Native Web App requires Node 8 or higher.
      Please update your version of Node.
  `));
  process.exit(1);
}

const printCyan = text => console.log(`      ${chalk.cyan(text)}`);
const printGreen = text => console.log(`      ${chalk.green(text)}`);

let appName;
const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")}`)
  .action(name => {
    appName = name;
  })
  .on("--help", () => {
    console.log(`    Only ${chalk.green("<project-directory>")} is required.`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`
    );
    printCyan("https://github.com/orYoffe/create-react-native-web-app/issues/new");
    console.log();
  })
  .parse(process.argv);

if (appName) {
  printCyan(`⏳ Creating React Native Web App by the name of ${appName} ...`);
  console.log();

  // create folder appName and copy files
  fs.ensureDirSync(appName);
  fs.emptyDirSync(appName);

  printCyan("✅ Created project folder.");
  console.log();
  const copy = fs.copySync(path.resolve(__dirname, "template"), appName);

  printCyan("✅ Added project files.");
  console.log();

  // install deps
  printCyan("⏳ Installing project dependencies...");
  console.log();
  let command = `cd ${appName} && npx react-native-rename ${appName} && npm i`;

  execSync(command, { stdio: [0, 1, 2] });

  printCyan("✅ Installed project dependencies.");
  console.log();

  // print script commands with info links
  printGreen("✅ Done! 😁👍 Your project is ready for development.");
  console.log();
  const packageManagerRunCommand = "npm run";
  console.log(`
        ${chalk.magenta("*")} ${chalk.magenta("change directory to your new project")}
        $ ${chalk.cyan(`cd ${appName}`)}

        $ ${chalk.cyan("Then run the these commands to get started:")}

        ${chalk.magenta("*")} ${chalk.magenta("To run development Web server")}
        $ ${chalk.cyan(packageManagerRunCommand + " web")}

        ${chalk.magenta("*")} ${chalk.magenta('To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)')}
        $ ${chalk.cyan(packageManagerRunCommand + " android")}

        ${chalk.magenta("*")} ${chalk.magenta("To run ios simulator (after installing Xcode - only on Apple devices)")}
        $ ${chalk.cyan(packageManagerRunCommand + " ios")}

        ${chalk.magenta("*")} ${chalk.magenta("To run tests for Native and Web")}
        $ ${chalk.cyan(packageManagerRunCommand + " test")}

        ${chalk.magenta("*")} ${chalk.magenta("To run build for Web")}
        $ ${chalk.cyan(packageManagerRunCommand + " build")}
    `);
} else {
  console.error(
    chalk.red("In order to create a new project you must give a name as an argument. "),
    chalk.cyan("Example: create-react-native-web-app AppName")
  );
  process.exit(1);
}
