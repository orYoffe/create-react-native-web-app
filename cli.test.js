const chalk = require("chalk");
const commander = require("commander");
const fs = require("fs-extra");
const path = require("path");
const execSync = require("child_process").execSync;
const packageJson = require("./package.json");
const isWin = process.platform === "win32";

jest.mock("fs-extra", () => {
  const ensureDirSync = jest.fn();
  const emptyDirSync = jest.fn();
  const copySync = jest.fn();

  return {
    ensureDirSync,
    emptyDirSync,
    copySync
  };
});

const originalConsoleLog = console.log;
console.log = jest.fn();

const originalConsoleError = console.error;
console.error = jest.fn();

jest.mock("child_process", () => {
  const execSync = jest.fn();

  return { execSync };
});

jest.mock("chalk", () => {
  const red = jest.fn(text => text);
  const cyan = jest.fn(text => text);
  const green = jest.fn(text => text);
  const magenta = jest.fn(text => text);

  return {
    red,
    cyan,
    green,
    magenta
  };
});

describe("cli runs properly", () => {
  it("cli runs with argument and logs info", () => {
    process.argv[2] = "myFakeName";
    jest.requireActual("./cli");

    expect(chalk.red.mock.calls).toEqual([]);
    expect(chalk.cyan.mock.calls).toEqual([
      ["⏳ Creating React Native Web App by the name of myFakeName ..."],
      ["⏳ Creating project folder..."],
      ["⏳ Adding project files..."],
      ["⏳ Installing project dependencies..."],
      ["cd myFakeName"],
      ["Then run the these commands to get started:"],
      ["npm run web"],
      ["npm run android"],
      ["npm run ios"],
      ["npm run test"],
      ["npm run build"]
    ]);
    expect(chalk.green.mock.calls).toEqual([
      ["<project-directory>"],
      ["<bundle-id>"],
      ["✅ Done! 😁👍 Your project is ready for development."]
    ]);
    expect(chalk.magenta.mock.calls).toEqual([
      ["*"],
      ["change directory to your new project"],
      ["*"],
      ["To run development Web server"],
      ["*"],
      [
        'To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)'
      ],
      ["*"],
      ["To run ios simulator (after installing Xcode - only on Apple devices)"],
      ["*"],
      ["To run tests for Native and Web"],
      ["*"],
      ["To run build for Web"]
    ]);

    expect(execSync.mock.calls).toEqual([
      [
        "cd myFakeName && npx react-native-rename-next myFakeName && npm i",
        { stdio: [0, 1, 2] }
      ]
    ]);

    expect(fs.emptyDirSync.mock.calls).toEqual([["myFakeName"]]);
    expect(fs.ensureDirSync.mock.calls).toEqual([["myFakeName"]]);
    expect(fs.copySync.mock.calls).toEqual([
      [__dirname + (isWin ? "\\" : "/") + "template", "myFakeName"]
    ]);

    const lastConsoleLog = `
      ${chalk.magenta("*")} ${chalk.magenta(
      "change directory to your new project"
    )}
      $ ${chalk.cyan(`cd myFakeName`)}

      $ ${chalk.cyan("Then run the these commands to get started:")}

      ${chalk.magenta("*")} ${chalk.magenta("To run development Web server")}
      $ ${chalk.cyan("npm run" + " web")}

      ${chalk.magenta("*")} ${chalk.magenta(
      'To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)'
    )}
      $ ${chalk.cyan("npm run" + " android")}

      ${chalk.magenta("*")} ${chalk.magenta(
      "To run ios simulator (after installing Xcode - only on Apple devices)"
    )}
      $ ${chalk.cyan("npm run" + " ios")}

      ${chalk.magenta("*")} ${chalk.magenta("To run tests for Native and Web")}
      $ ${chalk.cyan("npm run" + " test")}

      ${chalk.magenta("*")} ${chalk.magenta("To run build for Web")}
      $ ${chalk.cyan("npm run" + " build")}
  `;
    expect(console.log.mock.calls).toEqual([
      ["      ⏳ Creating React Native Web App by the name of myFakeName ..."],
      [],
      ["      ⏳ Creating project folder..."],
      [],
      ["      ⏳ Adding project files..."],
      [],
      ["      ⏳ Installing project dependencies..."],
      [],
      ["      ✅ Done! 😁👍 Your project is ready for development."],
      [],
      [
        `
        * change directory to your new project
        $ cd myFakeName

        $ Then run the these commands to get started:

        * To run development Web server
        $ npm run web

        * To run Android on connected device (after installing Android Debug Bridge \"adb\" - https://developer.android.com/studio/releases/platform-tools)
        $ npm run android

        * To run ios simulator (after installing Xcode - only on Apple devices)
        $ npm run ios

        * To run tests for Native and Web
        $ npm run test

        * To run build for Web
        $ npm run build
    `
      ]
    ]);
  });
});
