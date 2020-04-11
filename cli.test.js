const chalk = require("chalk");
// const commander = require("commander");
const fs = require("fs-extra");
// const path = require("path");
const execSync = require("child_process").execSync;
// const packageJson = require("./package.json");
const isWin = process.platform === "win32";

jest.mock("fs-extra", () => {
  const ensureDirSync = jest.fn();
  const emptyDirSync = jest.fn();
  const copySync = jest.fn();
  const existsSync = jest.fn();

  return {
    ensureDirSync,
    emptyDirSync,
    copySync,
    existsSync,
  };
});
jest.mock("./copyFiles", () => {
  const copyFiles = jest.fn(() => Promise.resolve());

  return copyFiles;
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

describe("cli runs properly", () => {
  it("cli runs with argument and logs info", (done) => {
    process.argv[2] = "myFakeName";
    fs.existsSync.mockReturnValue(true);
    jest.requireActual("./cli");

    process.nextTick(() => {
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
        ["npm run build"],
      ]);
      expect(chalk.green.mock.calls).toEqual([
        ["<project-directory>"],
        ["<bundle-id>"],
        ["✅ Done! 😁👍 Your project is ready for development."],
      ]);
      expect(chalk.magenta.mock.calls).toEqual([
        ["*"],
        ["change directory to your new project"],
        ["*"],
        ["To run development Web server"],
        ["*"],
        [
          'To run Android on connected device (after installing Android Debug Bridge "adb" - https://developer.android.com/studio/releases/platform-tools)',
        ],
        ["*"],
        [
          "To run ios simulator (after installing Xcode - only on Apple devices)",
        ],
        ["*"],
        ["To run tests for Native and Web"],
        ["*"],
        ["To run build for Web"],
      ]);

      if (isWin) {
        expect(execSync.mock.calls).toEqual([
          [
            "cd myFakeName && npx react-native-rename-next myFakeName && npm i ",
            { stdio: [0, 1, 2] },
          ],
        ]);
      } else {
        expect(execSync.mock.calls).toEqual([
          [
            "cd myFakeName && npx react-native-rename-next myFakeName && npm i ",
            { stdio: [0, 1, 2] },
          ],
          ["cd myFakeName/ios && pod --version"],
          ["cd myFakeName/ios && pod install"],
          ["cd myFakeName && git init"],
        ]);
      }

      expect(fs.emptyDirSync.mock.calls).toEqual([["myFakeName"]]);
      expect(fs.ensureDirSync.mock.calls).toEqual([["myFakeName"]]);
      // expect(fs.copySync.mock.calls).toEqual([
      //   [__dirname + (isWin ? "\\" : "/") + "template", "myFakeName"],
      // ]);
    });
    done();
  });
});
