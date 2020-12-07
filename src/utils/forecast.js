const request = require('postman-request')

const forecast = (latitude, longitude, cb) => {
  const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_ACCESS_KEY}&query=${latitude},${longitude}`

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      cb('Unable to connet to weather service. Please try again later.')
    } else if (body.error) {
      cb('Unable to find location. Please try another search.')
    } else {
      const { temperature, feelslike, humidity, weather_descriptions } = body.current
      cb(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees outside, but it feels like ${feelslike}. \nThere is ${humidity}% humidity.`)
    }
  })
}

module.exports = forecast