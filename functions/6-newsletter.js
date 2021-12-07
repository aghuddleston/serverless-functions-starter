require('dotenv').config()
const axios = require('axios')

const buttonDownUrl = 'https://api.buttondown.email/v1/subscribers'

// domain/.netlify/functions/6-newsletter
exports.handler = async (event, context) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST requests allowed'
    }
  }

  const { email } = JSON.parse(event.body)
  if (!email) {
    return {
      statusCode: 405,
      body: 'Please provide an email address'
    }
  }
  try {
    const data = await axios.post(buttonDownUrl, {
      email
    }, {
      headers: {
        Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`
      }
    })
    console.log(data)
    return {
      statusCode: 201,
      body: 'Success' // must be a string
    }
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify(err.response.data)
    }
  }
}
