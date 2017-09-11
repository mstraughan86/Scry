const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const googleAuth = require('google-auth-library');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/sheets.googleapis.com-nodejs-quickstart.json
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/tagmanager.delete.containers',
  'https://www.googleapis.com/auth/tagmanager.edit.containers',
  'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
  'https://www.googleapis.com/auth/tagmanager.manage.accounts',
  'https://www.googleapis.com/auth/tagmanager.manage.users',
  'https://www.googleapis.com/auth/tagmanager.publish'
];
const TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
const TOKEN_PATH = TOKEN_DIR + 'token.googleapis.com-nodejs-quickstart.json';
const SPREADSHEET_ID = '1OoSOjnw9gSsxhpiH9XZz9YLWuqCjrBo1XY-rnmaV6pg'; //1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
const RANGE = 'Sheet1!A2:O';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials) => {
  return new Promise(function (resolve, reject) {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function (err, token) {
      if (err) getNewToken(oauth2Client, resolve, reject);
      else {
        oauth2Client.credentials = JSON.parse(token);
        resolve(oauth2Client);
      }
    });
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
const getNewToken = (oauth2Client, resolve, reject) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  console.log('Authorize this app by visiting this url: ', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('Enter the code from that page here: ', function (code) {
    rl.close();
    oauth2Client.getToken(code, function (err, token) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        reject(err);
        return;
      }
      oauth2Client.credentials = token;
      storeTokenToDisk(token);
      resolve(oauth2Client);
    });
  });
};

const storeTokenToDisk = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR);
  }
  catch (err) {
    if (err.code != 'EEXIST') throw err;
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
};

const globalizeAuthentication = (auth) => Promise.resolve(google.options({auth: auth}));

/**
 * Print the names and majors of students in a sample spreadsheet:
 * https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 */
const listMajors = () => {
  return new Promise(function (resolve, reject) {
    const sheets = google.sheets('v4');
    const options = {
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
    };

    sheets.spreadsheets.values.get(options, function (err, response) {
      if (err) {
        console.log('The API returned an error: ' + err);
        reject(err);
        return;
      }
      const rows = response.values;
      if (rows.length == 0) {
        console.log('No data found.');
        reject('No data found.');
        return;
      }
      else {
        console.log('Tag Name, CSS Selector, GTM ID:');
        for (let i = 0; i < rows.length; i++) {
          const row = rows[i];
          console.log('%s, %s, %s', row[4], row[8], row[10]);
        }
        resolve('aaaa');
        return;
      }
    });
  });
};

const gtmListBuiltInVariables = (asdf) => {
  const tagmanager = google.tagmanager('v2');
  tagmanager.accounts.containers.workspaces.built_in_variables.list({
      parent: 'accounts/97652445/containers/7209102/workspaces/90'
    }, function(err, response) {

      if (err) {
        console.log('The API returned an error: ' + err);
        return;
      }

      console.log(JSON.stringify(response, null, 2));
      console.log(asdf);

    }
  );
};

const main = () => {
  // Load client secrets from a local file.
  const content = fs.readFileSync('client_secret.json');

  authorize(JSON.parse(content))
    .then(globalizeAuthentication)
    .then(listMajors)
    .then(gtmListBuiltInVariables);
};

main();

// I now have access to ... the spreadsheets and can access them to do stuff.

/*


 https://tagmanager.google.com/?authuser=1#/container/accounts/97652445/containers/7209102/workspaces/90/variables/2147481606


 what do i want to do with these new powers? I want to create an Automatic
 event uploader to GTM.

 I first need to make a.... GTM setup-er.

 What is the first thing to do when setting up a GTM account? let slook.

 Enable some built-in variables.
 /accounts/97652445/containers/7209102/workspaces/90
 accounts/97652445/containers/7209102/workspaces/90

 POST https://www.googleapis.com/tagmanager/v2/+parent/built_in_variables



 Hook up Google Analytics.




 */