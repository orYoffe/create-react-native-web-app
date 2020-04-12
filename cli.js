#!/usr/bin/env node

const chalk = require("chalk");
const commander = require("commander");
const fs = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;
const packageJson = require("./package.json");
const copyFiles = require("./copyFiles");

const nodeVersion = process.versions.node;
const nodeVersionSplitted = nodeVersion.split(".");
const nodeMajorVersion = nodeVersionSplitted[0];

if (nodeMajorVersion < 8) {
  console.error(
    chalk.red(`
      You are running Node ${nodeVersion}
      Create React Native Web App requires Node 8 or higher.
      Please update your version of Node.
  `)
  );
  process.exit(1);
}

const printCyan = (text) => console.log(`      ${chalk.cyan(text)}`);
const printGreen = (text) => console.log(`      ${chalk.green(text)}`);

let appName;
let appBundleId;
const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory> [<bundle-id>]")
  .usage(
    `${chalk.green("<project-directory>")} [${chalk.green("<bundle-id>")}]`
  )
  .action((name, bundleId) => {
    appName = name;
    appBundleId = bundleId;
  })
  .on("--help", () => {
    console.log(`    Only ${chalk.green("<project-directory>")} is required.`);
    console.log();
    console.log(
      `    If you have any problems, do not hesitate to file an issue:`
    );
    printCyan(
      "https://github.com/orYoffe/create-react-native-web-app/issues/new"
    );
    console.log();
  })
  .parse(process.argv);

async function run() {
  if (appName) {
    function installPods() {
      // TODO add better testing for pods
      if (process.platform === "darwin") {
        const iosFolderPath = `${appName}/ios`;
        try {
          if (!fs.existsSync(iosFolderPath)) {
            return;
          }

          const hasPods = fs.existsSync(`${iosFolderPath}/Podfile`);

          if (!hasPods) {
            return;
          }

          try {
            // Check if "pod" is available and usable. It happens that there are
            // multiple versions of "pod" command and even though it's there, it exits
            // with a failure
            execSync(`cd ${iosFolderPath} && pod --version`);
          } catch (e) {
            // "pod" command outputs errors to stdout (at least some of them)
            console.log(error.stderr || error.stdout);

            throw new Error(
              `Failed to install CocoaPods dependencies for iOS project, which is required by this template.\nPlease try again manually: "gem install cocoapods --no-document && cd ./${appName}/ios && pod install".\nCocoaPods documentation: 
              "https://cocoapods.org/"
            `
            );
          }

          try {
            console.log(
              `Installing CocoaPods dependencies 
              "(this may take a few minutes)"
            `
            );
            execSync(`cd ${iosFolderPath} && pod install`);
          } catch (error) {
            // "pod" command outputs errors to stdout (at least some of them)
            console.log(error.stderr || error.stdout);

            throw new Error(
              `Failed to install CocoaPods dependencies for iOS project, which is required by this template.\nPlease try again manually: "cd ./${appName}/ios && pod install".\nCocoaPods documentation: 
              "https://cocoapods.org/"
            `
            );
          }
        } catch (error) {
          throw error;
        }
      }
    }
    printCyan(`⏳ Creating React Native Web App by the name of ${appName} ...`);
    console.log();

    printCyan("⏳ Creating project folder...");
    console.log();
    // create folder appName and copy files
    fs.ensureDirSync(appName);
    fs.emptyDirSync(appName);

    printCyan("⏳ Adding project files...");
    console.log();

    await copyFiles(path.resolve(__dirname, "template"), appName);

    // fs.copySync(path.resolve(__dirname, "template"), appName);

    // install deps
    printCyan("⏳ Installing project dependencies...");
    console.log();

    const renameCommand = `cd ${appName} && npx react-native-rename-next ${appName}${
      appBundleId ? ` -b ${appBundleId}` : ""
    }`;

    execSync(renameCommand);
    const installCommand = `cd ${appName} && npm i`;
    execSync(installCommand, { stdio: [0, 1, 2] });

    installPods();

    try {
      execSync(`cd ${appName} && git init`);
    } catch (error) {}
    // print script commands with info links
    printGreen("✅ Done! 😁👍 Your project is ready for development.");
    console.log();
    const packageManagerRunCommand = "npm run";
    console.log(`
        ${chalk.magenta("*")} ${chalk.magenta(
      "change directory to your new project"
    )}
        $ ${chalk.cyan(`cd ${appName}`)}

        $ ${chalk.cyan("Then run the these commands to get started:")}

        ${chalk.magenta("*")} ${chalk.magenta("To run development Web server")}
        $ ${chalk.cyan(packageManagerRunCommand + " web")}

        ${chalk.magenta("*")} ${chalk.magenta(
      'To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)'
    )}
        $ ${chalk.cyan(packageManagerRunCommand + " android")}

        ${chalk.magenta("*")} ${chalk.magenta(
      "To run ios simulator (after installing Xcode - only on Apple devices)"
    )}
        $ ${chalk.cyan(packageManagerRunCommand + " ios")}

        ${chalk.magenta("*")} ${chalk.magenta(
      "To run tests for Native and Web"
    )}
        $ ${chalk.cyan(packageManagerRunCommand + " test")}

        ${chalk.magenta("*")} ${chalk.magenta("To run build for Web")}
        $ ${chalk.cyan(packageManagerRunCommand + " build")}
    `);
  } else {
    console.error(
      chalk.red(
        "In order to create a new project you must give a name as an argument. "
      ),
      chalk.cyan("Example: create-react-native-web-app AppName")
    );
    process.exit(1);
  }
}
run();
