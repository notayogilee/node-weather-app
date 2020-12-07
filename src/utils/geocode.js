const request = require('postman-request')

const geocode = (address, cb) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/encodeURIComponent(${address}).json?access_token=${process.env.GEOCODE_ACCESS_TOKEN}&limit=1`

  request({ url, json: true }, (error, response) => {
    const { features } = response.body
    if (error) {
      // do not need to declare data as undefined
      cb('Unable to connect to loacation services!', undefined)
    } else if (features.length === 0) {
      cb('Location not found. Try another search.', undefined)
    } else {
      cb(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode