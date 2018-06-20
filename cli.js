
const appName = process.argv[2];
if (appName) {
  console.log('Building...');
// TODO mkdir appName if doesn't exist
// TODO copy files
// TODO install deps
// TODO print script commands with link to repo

console.log('---------__dirname--------', __dirname);
} else {
  console.log('In order to create a new project you must give a name as an argument. Example: create-rnw-app AppName');
}
