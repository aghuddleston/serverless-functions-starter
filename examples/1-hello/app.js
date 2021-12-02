const result = document.querySelector('.result');

const fetchData = async () => {
  try {
    const { data } = await axios.get('/.netlify/functions/1-hello')
    result.textContent = data;
    console.log(data)
  } catch (err) {
    console.log(err.response)
  }
}

fetchData()
