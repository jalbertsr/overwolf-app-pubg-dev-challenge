const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
const sendResponse = require("./sendResponse.js");

module.exports = (accountId, data, callback) => {
  const [updateKey] = Object.keys(data);
  const updateValue = data[updateKey];

  const updateExpression = `set ${updateKey} = list_append(if_not_exists(${updateKey}, :empty_list), :l)`;
  const expressionAttributes = { ":l": [updateValue], ":empty_list": [] };

  const updateParams = {
    TableName: "FriendList",
    Key: {
      accountId
    },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributes
  };

  docClient.update(updateParams, (err, data) => {
    if (err) {
      callback(null, sendResponse("fail", err));
    } else {
      callback(null, sendResponse("success", data));
    }
  });
};
