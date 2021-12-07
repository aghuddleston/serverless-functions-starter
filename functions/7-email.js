require('dotenv').config()
const nodemailer = require('nodemailer')

const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env
const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD
  }
});

// domain/.netlify/functions/7-email
exports.handler = async (event, context) => {
  const method = event.httpMethod
  if (method !== 'POST') {
    return {
      statusCode: 405,
      body: 'Only POST requests allowed'
    }
  }

  const { name, email, subject, message } = JSON.parse(event.body)
  if (!name || !email || !subject || !message) {
    return {
      statusCode: 400,
      body: 'Please provide all values'
    }
  }

  const data = {
    from: '"Jane Doe" <test@test.com>',
    to: `"${name}" <${email}>`,
    subject,
    html: `<p>${message}</p>`
  }
  console.log('data is', data)

  try {
    await transporter.sendMail(data)
    return {
      statusCode: 200,
      body: 'Success' // must be a string
    }
  } catch (err) {
    console.log(err)
    return {
      statusCode: 400,
      body: JSON.stringify(err.message) // must be a string
    }
  }

}
