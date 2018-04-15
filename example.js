'use strict'

const pump = require('pump')
const csvParser = require('csv-parser')

const findStops = require('.')
const {findStopovers} = findStops

pump(
	process.stdin,
	csvParser({
		separator: ';'
	}),
	findStopovers(),
	findStops(console.log),
	(err) => {
		if (err) {
			console.error(err)
			process.exitCode = 1
		}
	}
)
