// domain/.netlify/functions/1-hello
exports.handler = async (event, context) => {
  console.log(event)
  console.log('context', context)
  return {
    statusCode: 200,
    body: 'My first Netlify function example' // must be a string
  }
}
