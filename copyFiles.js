const fs = require("fs");
const path = require("path");

function walk(current) {
  if (!fs.lstatSync(current).isDirectory()) {
    return [current];
  }

  const files = fs
    .readdirSync(current)
    .map((child) => walk(path.join(current, child)));
  const result = [];
  return result.concat.apply([current], files);
}

/**
 * Copy files (binary included) recursively.
 */
async function copyFiles(srcPath, destPath, options = {}) {
  return Promise.all(
    walk(srcPath).map(async (absoluteSrcFilePath) => {
      const exclude = options.exclude;
      if (exclude && exclude.some((p) => p.test(absoluteSrcFilePath))) {
        return;
      }
      const relativeFilePath = path.relative(srcPath, absoluteSrcFilePath);
      await copyFile(
        absoluteSrcFilePath,
        path.resolve(destPath, relativeFilePath)
      );
    })
  );
}

/**
 * Copy a file to given destination.
 */
function copyFile(srcPath, destPath) {
  if (fs.lstatSync(srcPath).isDirectory()) {
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath);
    }
    // Not recursive
    return;
  }

  return new Promise((resolve, reject) => {
    copyBinaryFile(srcPath, destPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(destPath);
    });
  });
}
module.exports.copyFile = copyFile;

/**
 * Same as 'cp' on Unix. Don't do any replacements.
 */
function copyBinaryFile(srcPath, destPath, cb) {
  let cbCalled = false;
  const { mode } = fs.statSync(srcPath);
  const readStream = fs.createReadStream(srcPath);
  const writeStream = fs.createWriteStream(destPath);
  readStream.on("error", (err) => {
    done(err);
  });
  writeStream.on("error", (err) => {
    done(err);
  });
  readStream.on("close", () => {
    done();
    fs.chmodSync(destPath, mode);
  });
  readStream.pipe(writeStream);
  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

module.exports = copyFiles;
