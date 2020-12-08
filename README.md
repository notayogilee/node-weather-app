#Weather Website using Nodejs

This is a simple weather website to practice nodejs and calls to API. We first call mapbox geocoder with a location and get the latitude/logitude coordinates to use in the weaterstack API. This is unnecessary as the weatherstack API can take a location directly, but it was to practice chaining API calls.

1. Clone repo and install dependencies

2. Create a .env file in the root of the project

3. In the .env file, you will need to add:

from https://weatherstack.com/:

WEATHERSTACK_ACCESS_KEY=<YOUR_WEATHERSTACK_ACCESS_KEY>

from https://www.mapbox.com/:

GEOCODE_ACCESS_TOKEN=<YOUR_MAPBOX_ACCESS_TOKEN>

4. In your terminal: 
   -npm run start to run the app 
    or
   -npm run dev to run the app with nodemon if you will make some changes
