const writeDB = require('./writeDB.js');
const readDB = require('./readDB.js');
const updateDB = require('./updateDB.js');
const sendResponse = require('./sendResponse.js');

exports.handler = (event, ctx, callback) => {
  const parsedBody = event.body !== null && event.body !== undefined && JSON.parse(event.body);

  const bodyIsEmpty = !(Object.keys(parsedBody).length);
  const dataIsEmpty = !(Object.keys(parsedBody.data).length)

  if (!bodyIsEmpty) {
    const { accountId, data, isLocation, createPlayer, readOnly } = parsedBody;

    if (!createPlayer && !readOnly && !dataIsEmpty) {
      updateDB(accountId, data, isLocation, callback);
    } else if (createPlayer && !dataIsEmpty) {
      writeDB(accountId, data, callback);
    } else if (readOnly) {
      readDB(accountId, callback);
    } else {
      sendResponse('fail', parsedBody);
    }
  } else {
    sendResponse('fail', parsedBody);
  }
};
