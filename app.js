#!/usr/bin/node

// psuedocode for triggering a tweet when the plant needs water
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

// signal threshold that says 'this plant needs water'
var threshold = process.env.THRESHOLD

// whether a user has been notified that a plant needs water
var userNotified = false

board.on('ready', function() {

  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  // See http://wiringpi.com/pins/  and
  // https://github.com/nebrius/raspi-io
  // to see why pin 7
  var sensor = new five.Sensor({ pin: 7, threshold: 2 })

  sensor.scaleTo(0,100).on('change', function(value) {

    if (value > threshold) {
      userNotified = false
    } else {
      if (!userNotified) {
        var tweetObj = { status: 'PLANT DEATH IMMINENT!' }
        client.post('statuses/update', tweetObj, function(error, tweetObj, response) {
          if (!error) console.log(tweet) 
        })
      }
    }
  })
})

