const nameInput = document.querySelector('.name-input')
const emailInput = document.querySelector('.email-input')
const subjectInput = document.querySelector('.subject-input')
const messageInput = document.querySelector('.message-input')
const form = document.querySelector('.form')
const btn = document.querySelector('.submit-btn')
const alert = document.querySelector('.alert')
const title = document.querySelector('.title')
alert.style.display = 'none'

form.addEventListener('submit', async function(e) {
  console.log('in submit')
  e.preventDefault()
  alert.style.display = 'none'
  btn.disabled = true
  btn.innerHTML = '<span class="sending"></span>'

  const name = nameInput.value
  const email = emailInput.value
  const subject = subjectInput.value
  const message = messageInput.value
  try {
    await axios.post('/api/7-email', { name, email, subject, message })
    console.log('got response')
    nameInput.value = ''
    emailInput.value = ''
    subjectInput.value = ''
    messageInput.value = ''
    title.textContent = 'Message Sent'

    setTimeout(() => {
      title.textContent = 'Send a Message'
    }, 3000)
  } catch (err) {
    console.log(err.response)
    alert.style.display = 'block'
    alert.textContent = err.response.data
  }
  btn.disabled = false
  btn.innerHTML = 'Send'
})

