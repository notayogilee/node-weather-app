const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let location = search.value

  messageOne.textContent = 'Loading search...'
  messageTwo.textContent = ''

  fetch(`/weather?address=${location}`)
    .then((res) => {
      res.json()
        .then((data) => {
          if (data.error) {
            messageOne.classList.add('error-message')
            messageOne.textContent = data.error
            setTimeout(() => {
              messageOne.classList.remove('error-message')
              messageOne.textContent = ''
            }, 5000)
            return;
          } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
          }
        })
    })
})