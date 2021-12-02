const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios.get('/api/1-hello')
    result.textContent = data;
    console.log(data)
  } catch (err) {
    console.log(err.response)
  }
}

fetchData()
