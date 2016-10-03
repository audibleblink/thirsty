#!/usr/bin/node

// psuedocode for triggering a tweet when the plant needs water
//
var five = johnny five library
var rpi  = raspi-io library
var twitter = twitter api

// create a variable to hold an object that represents GPIO pin 5
var input = rpi.pin(5)

// voltage threshold that says 'this plant needs water'
var threshold = process.env.THRESHOLD
// whether a user has been notified that a  plant needs water
var notified = false

five.onBoardReady(function() {

        while(true) {

                if (input.voltage < threshold) {
                        notified = false
                } else {
                        if (!notified) {
                                twitter.tweet('user', 'water me')
                                notified = true
                        }
                }
        }
})
