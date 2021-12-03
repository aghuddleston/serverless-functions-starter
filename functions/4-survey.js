// domain/.netlify/functions/4-survey
require('dotenv').config()
const Airtable = require('airtable-node');

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
  .base('app5OvUTpcu9Amh8A')
  .table('survey')

const getSurveyData = async () => {
 try {
    const { records } = await airtable.list()
    const survey = records.map((item) => {
      const { id } = item
      const { room, votes } = item.fields
      return { id, room, votes}
    })
    return {
      statusCode: 200,
      body: JSON.stringify(survey)
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: 'Server error occurred'
    }
  }
}

const updateSurvey = async (body) => {
  console.log(body)
  try {
    const { id, votes } = JSON.parse(body)
    if (!id || !votes) {
      return {
        statusCode: 400,
        body: 'Please provide id and votes values'
      }
    }

    const fields = { votes: Number(votes) + 1 }
    const item = await airtable.update(id, { fields })
    if (item.error) {
      return { statusCode: 400, body: JSON.stringify(item) }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(item)
    }
  } catch (err) {
    console.log(error)
    return {
      statusCode: 500,
      body: 'Server error occurred'
    }

  }
}

exports.handler = async (event, context) => {
  const method = event.httpMethod
  if (method === 'PUT') {
    return updateSurvey(event.body)
  } else if (method === 'GET') {
    return getSurveyData()
  }

  return {
    statusCode: 405,
    body: 'Only GET and PUT supported'
  }

}
