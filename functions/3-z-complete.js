// domain/.netlify/functions/3-z-complete
require('dotenv').config()
const Airtable = require('airtable-node');

const airtable = new Airtable({apiKey: process.env.AIRTABLE_API_KEY})
  .base('app5OvUTpcu9Amh8A')
  .table('products')

// This combines both 3-airtable and 3-product together
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
        body: JSON.stringify({id, name, price, description, url: image?.[0]?.url})
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: 'An error occurred'
      }
    }
  }

  try {
    const { records } = await airtable.list()
    const products = records.map((product) => {
      const { id } = product
      const { name, image, price } = product.fields
      const url = image[0].url
      return {
        id,
        name,
        url,
        price
      }
    })
    return {
      statusCode: 200,
      body: JSON.stringify(products)
    }
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: 'An error occurred'
    }
  }
}
