// supplies configuration from environment
// or optionally, a file
var nconf = require('nconf');

var file;

if (process.env.ENVIRONMENT === 'production') {
    file = '.config.json';
} else if (process.env.ENVIRONMENT === 'staging') {
    file = '.config.staging.json';
} else {
    // development
    file = '.config.dev.json';
}

nconf.argv()
    .env()
    .file({
        file: file
    });

module.exports = nconf;