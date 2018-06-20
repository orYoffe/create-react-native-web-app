/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');
const glob = require('glob');

const getPlatformDirName = isNative => isNative ? '__native_snapshots__' : '__web_snapshots__';
const getOtherPlatformDirName = isNative => isNative ? '__web_snapshots__' : '__native_snapshots__';

const ensureFolder = dir => !fs.existsSync(dir) && fs.mkdirSync(dir);

const switchFolders = (
  snapshotFolder,
  isNative,
  currentPlatformFolderName,
  otherPlatformFolderName
) => {
  return new Promise(function(resolve, reject) {
    const snapshotDir = path.join(__dirname, '..', snapshotFolder);
    const currentPlatformFolder = snapshotDir.replace('__snapshots__', currentPlatformFolderName);
    const otherPlatformFolder = snapshotDir.replace('__snapshots__', otherPlatformFolderName);

    ensureFolder(currentPlatformFolder);
    ensureFolder(otherPlatformFolder);

    fsx.copySync(snapshotDir, otherPlatformFolder);

    fsx.removeSync(snapshotDir);
    ensureFolder(snapshotDir);

    fsx.copySync(currentPlatformFolder, snapshotDir);
    resolve();
  });
};

const switchSnapshots = (isNative) => {
    const currentPlatformFolderName = getPlatformDirName(isNative);
    const otherPlatformFolderName = getOtherPlatformDirName(isNative);

    console.log('*** Switching snapshots...');
    console.time('*** Finished switching snapshots in');

    const dirs = glob.sync('**/__snapshots__');

    (async function main() {
      const promises = dirs.map(snapshotFolder => switchFolders(
        snapshotFolder,
        isNative,
        currentPlatformFolderName,
        otherPlatformFolderName
      ));
    	await Promise.all(promises);
      console.timeEnd('*** Finished switching snapshots in');
    })()
    .catch(
    	e => {
    		throw e;
    	}
    );
};

module.exports = switchSnapshots;
