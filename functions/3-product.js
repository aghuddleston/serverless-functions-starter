// domain/.netlify/functions/3-airtable
require('dotenv').config()
const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base('app5OvUTpcu9Amh8A')
  .table('products')

exports.handler = async (event, context) => {
  const {id} = event.queryStringParameters
  if (id) {
    try {
      const product = await airtable.retrieve(id)
      if (product.error) {
        return {
          statusCode: 404,
          body: `No product with id ${id}`
        }
      }
      const {name, description, image, price} = product.fields
      return {
        statusCode: 200,
        body: JSON.stringify({id, name, price, description, url: image[0].url})
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'An error occurred'
      }
    }
  }

  return {
    statusCode: 400,
    body: 'Please provide product id'
  }
}
