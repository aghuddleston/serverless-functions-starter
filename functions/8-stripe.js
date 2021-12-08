require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_API_KEY)

// domain/.netlify/functions/8-stripe
exports.handler = async (event, context) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST requests allowed'
    }
  }

  const { purchase, total_amount, shipping_fee } = JSON.parse(event.body)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total_amount + shipping_fee,
      currency: 'USD'
    })
    return {
      statusCode: 200,
      body: JSON.stringify({clientSecret: paymentIntent.client_secret})
    }

  } catch (err) {
    console.log(err)
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message }) // must be a string
    }
  }

}
