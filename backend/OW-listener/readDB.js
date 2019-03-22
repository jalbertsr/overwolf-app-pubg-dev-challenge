const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const sendResponse = require('./sendResponse.js');

module.exports = (accountId, callback) => {

  const readParams = {
    TableName: 'OverwolfEvents',
    Key: {
      accountId
    }
  };

  docClient.get(readParams, (err, data) => {
    if (err) {
      callback(null, sendResponse('fail', err));
    } else {
      callback(null, sendResponse('success', data));
    }
  });
};
