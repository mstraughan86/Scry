const fs = require('fs');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '.env')});

const readline = require('readline');
const google = require('googleapis');
const sheets = google.sheets('v4');
const googleAuth = require('google-auth-library');

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
]; // Find a list of scopes here at: https://developers.google.com/oauthplayground/

const SAVE_DIR = __dirname;
const TOKEN_PATH = path.join(__dirname, 'token.googleapis.com-gapi-learning.json');
const SECRET_PATH = path.join(__dirname, 'secret.googleapis.com-gapi-learning.json');
const SPREADSHEET_PATH = path.join(__dirname, 'sheets.googleapis.com-gapi-learning.json');
let BOOK_ID;
let SHEET_TITLE; // should I have a default one? does that mean should I make a default one as well?

const projectName = process.env.WHITE_LABEL;
const masterSheetName = 'TV Series';

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
const storeTokenToDisk = token => {
  try {
    fs.mkdirSync(SAVE_DIR);
  }
  catch (err) {
    if (err.code != 'EEXIST') throw err;
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log('Token stored to ' + TOKEN_PATH);
};
const globalizeAuthentication = auth => Promise.resolve(google.options({auth: auth}));
const authorize = () => {
  const credentials = JSON.parse(fs.readFileSync(SECRET_PATH));
  return new Promise((resolve, reject) => {
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) getNewToken(oauth2Client, resolve, reject);
      else {
        oauth2Client.credentials = JSON.parse(token);
        resolve(Promise.resolve(oauth2Client).then(globalizeAuthentication));
      }
    });
  });
};

const createBook = () => {
  return new Promise((resolve, reject) => {
    const request = {
      resource: {
        "properties": {"title": `${projectName} Database`},
        "sheets": [
          {
            "properties": {
              "sheetId": 0,
              "title": masterSheetName,
              "index": 0,
              "sheetType": "GRID",
              "gridProperties": {
                "rowCount": 1000,
                "columnCount": 26
              }
            },
            "data": [
              {
                "rowData": [
                  {
                    "values": [
                      {"userEnteredValue": {"stringValue": 'title'}},
                      {"userEnteredValue": {"stringValue": 'imdb_id'}},
                      {"userEnteredValue": {"stringValue": 'episodes'}}
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    };

    sheets.spreadsheets.create(request, (err, response) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      // const responseExample = {
      //   "spreadsheetId": "1elu7oIq_h99CC-77dhaAomZ2t2hg4tUW8XlVU_Xq_fA",
      //   "properties": {
      //     "title": "delete me",
      //     "locale": "en_US",
      //     "autoRecalc": "ON_CHANGE",
      //     "timeZone": "Etc/GMT",
      //     "defaultFormat": {
      //       "backgroundColor": {
      //         "red": 1,
      //         "green": 1,
      //         "blue": 1
      //       },
      //       "padding": {
      //         "top": 2,
      //         "right": 3,
      //         "bottom": 2,
      //         "left": 3
      //       },
      //       "verticalAlignment": "BOTTOM",
      //       "wrapStrategy": "OVERFLOW_CELL",
      //       "textFormat": {
      //         "foregroundColor": {},
      //         "fontFamily": "arial,sans,sans-serif",
      //         "fontSize": 10,
      //         "bold": false,
      //         "italic": false,
      //         "strikethrough": false,
      //         "underline": false
      //       }
      //     }
      //   },
      //   "sheets": [
      //     {
      //       "properties": {
      //         "sheetId": 0,
      //         "title": "main",
      //         "index": 0,
      //         "sheetType": "GRID",
      //         "gridProperties": {
      //           "rowCount": 1000,
      //           "columnCount": 26
      //         }
      //       }
      //     }
      //   ],
      //   "spreadsheetUrl": "https://docs.google.com/spreadsheets/d/1elu7oIq_h99CC-77dhaAomZ2t2hg4tUW8XlVU_Xq_fA/edit"
      // };

      try {
        fs.mkdirSync(SAVE_DIR);
      }
      catch (err) {
        if (err.code != 'EEXIST') throw err;
      }
      fs.writeFile(SPREADSHEET_PATH, JSON.stringify(response, null, 2));
      console.log('Spreadsheet data stored to ' + SPREADSHEET_PATH);
      //console.log(JSON.stringify(response, null, 2));
      resolve(response);
    });

  });
};
const checkBook = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(SPREADSHEET_PATH, (err, sheet) => {
      if (err) return createBook().then(resolve);
      BOOK_ID = JSON.parse(sheet).spreadsheetId;
      return resolve(JSON.parse(sheet));
    });
  });
};
const getBook = () => {
  return new Promise((resolve, reject) => {
    const request = {
      spreadsheetId: BOOK_ID,
      includeGridData: false
    };

    sheets.spreadsheets.get(request, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
};
const setBook = spreadsheetId => {BOOK_ID = spreadsheetId};

const checkSheet = data => {
  setActiveSheet(data.title);
  return Promise.resolve(getBook())
    .then(book => new Promise((resolve, reject) => {
      const sheet = book.sheets.find(e => e.properties.title === SHEET_TITLE);
      if (sheet === undefined) {
        const request = {
          spreadsheetId: BOOK_ID,
          resource: {
            requests: [
              {"addSheet": {"properties": {"title": SHEET_TITLE}}},
              {
                "appendCells": {
                  "sheetId": 0,
                  "rows": [{
                    "values": [
                      {"userEnteredValue": {"stringValue": data.title}},
                      {"userEnteredValue": {"stringValue": data.imdb_id}},
                      {"userEnteredValue": {"stringValue": "0"}}
                    ]
                  }], "fields": "*"
                }
              }
            ],
          }
        };
        sheets.spreadsheets.batchUpdate(request, (err, response) => {
          if (err) return reject(err);
          console.log('New ID entered, creating Entry and Sheet.');

          const request = {
            spreadsheetId: BOOK_ID,
            range: SHEET_TITLE,
            valueInputOption: 'RAW',
            resource: {
              values: [
                [
                  'aired', 'description', 'duration', 'episode', 'genres', 'season', 'show', 'title', 'imdb_id'
                ]
              ]
            }
          };

          sheets.spreadsheets.values.update(request, (err, result) => {
            if (err) return reject(err);
            return resolve(data);
          });
        });
      }
      else {
        return resolve(data);
      }
    }));
};
const getActiveSheetData = () => {
  return new Promise((resolve, reject) => {
    const request = {
      spreadsheetId: BOOK_ID,
      range: SHEET_TITLE
    };
    sheets.spreadsheets.values.get(request, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
};
const setActiveSheet = sheetTitle => {SHEET_TITLE = sheetTitle}; // add checking for obj or string
const updateActiveSheet = (range, values) => {
  return new Promise((resolve, reject) => {
    const request = {
      spreadsheetId: BOOK_ID,
      range: `'${SHEET_TITLE}'!${range}`,
      valueInputOption: 'RAW',
      resource: {values: values}
    };

    sheets.spreadsheets.values.update(request, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  })
};
const appendRowToActiveSheet = (data = [[1, 2, 3]]) => {
  return new Promise((resolve, reject) => {
    const request = {
      spreadsheetId: BOOK_ID,
      range: SHEET_TITLE,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: data
      }
    };

    sheets.spreadsheets.values.append(request, (err, response) => {
      if (err) return reject(err);
      return resolve(response);
    });
  });
};
const resetActiveSheet = () => {
  return new Promise((resolve, reject) => {
    const request = {
      spreadsheetId: BOOK_ID,
      range: SHEET_TITLE,
    };

    sheets.spreadsheets.values.clear(request, (err, response) => {
      if (err) return reject(err);

      let values;
      if (SHEET_TITLE == masterSheetName) values = [['title', 'imdb_id', 'episodes']];
      else values = [['aired', 'description', 'duration', 'episode', 'genres', 'season', 'show', 'title', 'imdb_id']];

      const request = {
        spreadsheetId: BOOK_ID,
        range: SHEET_TITLE,
        valueInputOption: 'RAW',
        resource: {
          values: values
        }
      };

      sheets.spreadsheets.values.update(request, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });

    })
  });
};

module.exports = {
  authorize,
  google,
  sheets,
  masterSheetName,

  checkBook,
  getBook,
  setBook,

  checkSheet,
  getActiveSheetData,
  setActiveSheet,
  updateActiveSheet,
  resetActiveSheet,
  appendRowToActiveSheet
};