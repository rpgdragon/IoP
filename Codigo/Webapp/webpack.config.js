var chalk = require("chalk");
var fs = require('fs');
var path = require('path');
var defaultConfig = require('@ionic/app-scripts/config/webpack.config.js');

var env = process.env.MY_ENV;
if (!env) return console.error('Undefined environment')
console.log(chalk.blue('[Environment] Enviroment set to: ' + env));

defaultConfig[env] = defaultConfig.dev;
defaultConfig[env].resolve.alias = {
  "@env": path.resolve( environmentPath() ),
  "@app": path.resolve('./src/app/'),
  "@pages": path.resolve('./src/pages/'),
  "@assets": path.resolve('./src/assets/'),
  "@shared": path.resolve('./src/shared/'),
  "@theme": path.resolve('./src/theme/'),
  "@tests": path.resolve('./src/tests/'),
};


//console.info('Env path:', path.resolve( environmentPath(env) ))

function environmentPath() {
  var filePath = './src/environments/environment.' + env.trim() + '.ts';
  if ( !fs.existsSync(filePath) ) {
    console.log(chalk.red('[Environment] ' + filePath + ' does not exist!'));
  } else {
    return filePath;
  }
}

module.exports = 
function () {
  return defaultConfig;
};
