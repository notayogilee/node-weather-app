const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather App",
    name: "Leekers"
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: 'Leekers'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    msg: "This is the help page. Come here when you need help.",
    name: "Leekers"
  })
})

app.get('/weather', (req, res) => {
  const address = req.query.address

  if (!address) {
    return res.send({
      error: "You must provide an address."
    })
  }

  geocode(address, (error, data) => {
    if (error) return res.send({ error })

    const { latitude, longitude, location } = data

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error })

      res.send({
        location,
        forecast: forecastData,
        address
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "404",
    error_msg: "Help article not found.",
    name: "Leekers"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    error_msg: "Page not found.",
    name: "Leekers"
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})