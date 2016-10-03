#!/usr/bin/node

// psuedocode for triggering a tweet when the plant needs water
//
var five = require("johnny-five")
var Raspi = require("raspi-io")
var board = new five.Board({ io: new Raspi() })
var Twitter = require('twitter')
var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

// voltage threshold that says 'this plant needs water'
var threshold = process.env.THRESHOLD

// whether a user has been notified that a  plant needs water
var notified = false

board.on("ready", function() {

  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  var sensor = new five.Sensor("A0")

  sensor.on("change", function(value) {
    if (value > threshold) {
      notified = false
    } else {
      if (!notified) {
        twitterClient.post('statuses/update', {status: 'PLANT DEATH IMMINENT!'}, function(error, tweet, response) {
          if (!error) {
            console.log(tweet)
          }
        })
      }
    }
  })
})
