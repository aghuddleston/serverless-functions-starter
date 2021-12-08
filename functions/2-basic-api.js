// domain/.netlify/functions/2-basic-api
const items = require('../assets/data')

exports.handler = async (event, context) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': '*' // allow cors
    },
    statusCode: 200,
    body: JSON.stringify(items)
  }
}
