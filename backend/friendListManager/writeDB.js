const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1" });
const sendResponse = require("./sendResponse.js");

module.exports = (accountId, data, callback) => {
  const { nickname } = data;
  const createParams = {
    Item: {
      accountId,
      nickname
    },
    TableName: "FriendList"
  };

  docClient.put(createParams, (err, data) => {
    if (err) {
      callback(null, sendResponse("fail", err));
    } else {
      callback(null, sendResponse("success", data));
    }
  });
};
