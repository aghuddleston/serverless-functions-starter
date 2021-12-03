const result = document.querySelector('.result')

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/3-z-complete')
    result.innerHTML = data.map(product => (`
    <a href='product.html?id=${product.id}' class="product">
      <img src=${product.url} alt=${product.name} />
      <div class="info">
        <h5>${product.name}</h5>
        <h5 class="price">$${product.price}</h5>
      </div>
    </a>
`)).join(' ');
  } catch (err) {
    console.log(err.response)
    result.innerHTML = 'Please try again later'
  }
}

fetchData()
