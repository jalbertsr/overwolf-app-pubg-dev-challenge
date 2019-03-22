const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const sendResponse = require('./sendResponse.js');

module.exports = (accountId, data, callback) => {
  const { nickname } = data;
  const createParams = {
    Item: {
      accountId,
      nickname,
    },
    TableName: "OverwolfEvents"
  };
  const removeParams = {
    Key: {
      accountId
    },
    TableName: "OverwolfEvents",
    // ConditionExpression: "attribute_exists(accountId)"   # check is not needed, deleting something that dosent exists never causes error
  };

  docClient.delete(removeParams, (err, data) => {
    if (err) {
      callback(null, sendResponse('fail', err));
    } else {
      docClient.put(createParams, (err, data) => {
        if (err) {
          callback(null, sendResponse('fail', err));
        } else {
          callback(null, sendResponse('success', data));
        }
      });
    }
  })
};
