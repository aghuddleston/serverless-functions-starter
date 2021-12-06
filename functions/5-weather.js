require('dotenv').config()
const axios = require('axios')

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${process.env.OPEN_WEATHER_API_KEY}&q=`

// domain/.netlify/functions/5-weather
exports.handler = async (event, context) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST requests allowed'
    }
  }
  const { city } = JSON.parse(event.body)
  console.log('city', city)
  try {
    const res = await axios.get(`${weatherUrl}${city}`)
    return {
      statusCode: 200,
      body: JSON.stringify(res.data)
    }
  } catch (err) {
    console.log('in err', err)
    return {
      statusCode: 404,
      body: JSON.stringify(err)
    }
  }
}
