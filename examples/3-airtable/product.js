const result = document.querySelector('.result')

const fetchData = async () => {
  result.innterHTML = '<h2>Loading...</h2>'
  try {
    const id = window.location.search
    const { data } = await axios.get(`/api/3-z-complete${id}`)
    result.innerHTML = `
  <h1 class="title">${data.name}</h1>
  <article class="product">
    <img class="product-img" src=${data.url} alt=${data.name} />
    <div class="product-info">
      <h5 class="title">${data.name}</h5>
      <h5 class="price">$${data.price}</h5>
      <p class="desc">${data.description}</p>
    </div>
  </article>
`;
  } catch (err) {
    console.log(err)
    result.innerHTML = 'Could not find the product'
  }
}

fetchData()
