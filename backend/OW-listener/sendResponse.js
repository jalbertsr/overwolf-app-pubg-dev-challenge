module.exports = (status, data) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  };

  if (status === 'success') {
    return ({
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data,
        responseStatus: 'success'
      })
    });
  } else if (status === 'fail') {
    return ({
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data,
        responseStatus: 'fail'
      })
    });
  } else {
    return ({
      statusCode: 200,
      headers,
      body: JSON.stringify({
        data,
        responseStatus: 'Not fail, not success, wtf'
      })
    });
  }
};
