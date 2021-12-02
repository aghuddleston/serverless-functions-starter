const result = document.querySelector('.result')

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/2-basic-api')
    result.innerHTML = data.map(product => (`
    <article class="product">
      <img src=${product.image.url} alt=${product.name} />
      <div class="info">
        <h5>${product.name}</h5>
        <h5 class="price">$${product.price}</h5>
      </div>
    </article>
`)).join(' ');
  } catch (err) {
    console.log(err.response)
    result.innerHTML = 'Please try again later'
  }
}

fetchData()
