#!/usr/bin/node

// triggering a tweet when the plant needs water
//
const five = require('johnny-five')
const Raspi = require('raspi-io')
const Twitter = require('twitter')
const board = new five.Board({ io: new Raspi() })
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

board.on('ready', () => {
  // Create a new generic sensor instance for a sensor connected to an digital pin
  // See http://wiringpi.com/pins/  and https://github.com/nebrius/raspi-io
  const sensor = new five.Sensor.Digital(1)

  sensor.on('change', (value) => {
    console.log('INFO: sensor value is now: ', value)
    if (value) {
      const tweetObj = { status: 'PLANT DEATH IMMINENT!' }
      client.post('statuses/update', tweetObj, (error, tweetObj, response) => {
        if (error) {
          console.error('ERROR: ' + JSON.stringify(error))
        } else {
          console.log('INFO: tweet sent')
        }
      })
    }
  })
})

