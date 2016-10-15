#!/usr/bin/node

// triggering a tweet when the plant needs water
//
var five    = require('johnny-five')
var Raspi   = require('raspi-io')
var board   = new five.Board({ io: new Raspi() })
var Twitter = require('twitter')
var client  = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

board.on('ready', function() {
  // Create a new generic sensor instance for a sensor connected to an digital pin
  // See http://wiringpi.com/pins/  and https://github.com/nebrius/raspi-io
  var sensor = new five.Sensor.Digital(1)

  sensor.on('change', function(value) {
    console.log("INFO: sensor value is now: ", value)
    if (value) {
      var tweetObj = { status: 'PLANT DEATH IMMINENT!' }
      client.post('statuses/update', tweetObj, function(error, tweetObj, response) {
        if (error) {
          console.error("ERROR: " + JSON.stringify(error))
        } else {
          console.log("INFO: tweet sent") 
        }
      })
    }
  })
})

