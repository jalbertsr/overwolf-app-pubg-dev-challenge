const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
const sendResponse = require('./sendResponse.js');

module.exports = (accountId, data, isLocation, callback) => {
  const [updateKey] = Object.keys(data);
  const updateValue = data[updateKey];

  const updateExpression = isLocation ? `set ${updateKey} = list_append(if_not_exists(${updateKey}, :empty_list), :l)` : `set ${updateKey} = :r`;
  const expressionAttributes = isLocation ? { ":l": [updateValue], ":empty_list": [] } : { ":r": updateValue };

  const updateParams = {
    TableName: "OverwolfEvents",
    Key: {
      accountId
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributes,
    ReturnValues: "UPDATED_NEW"
  };

  docClient.update(updateParams, (err, data) => {
    if (err) {
      callback(null, sendResponse('fail', err));
    } else {
      callback(null, sendResponse('success', data));
    }
  });
};
