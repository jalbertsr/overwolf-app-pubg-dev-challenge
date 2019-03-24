const writeDB = require('./writeDB.js');
const readDB = require('./readDB.js');
const updateDB = require('./updateDB.js');
const sendResponse = require('./sendResponse.js');

exports.handler = (event, ctx, callback) => {
  console.log(event)
  const { accountId } = event.pathParameters;
  if (event.httpMethod === 'GET') {
    readDB(accountId, callback);
  } else if (event.httpMethod === 'POST') {
    const parsedBody = event.body !== null && event.body !== undefined && JSON.parse(event.body);
    const bodyIsEmpty = !(Object.keys(parsedBody).length);
    const dataIsEmpty = !(Object.keys(parsedBody.data).length)
    if (!bodyIsEmpty) {
      const { createPlayer, updateFriend, data } = parsedBody;
      if (createPlayer && !dataIsEmpty) {
        writeDB(accountId, data, callback);
      } else if (updateFriend && !dataIsEmpty) {
        updateDB(accountId, data, callback);
      }
    } else {
      sendResponse('fail', parsedBody);
    }
  }
};
