'use strict'

const pump = require('pump')
const csvParser = require('csv-parser')

const findStops = require('.')
const {findStopovers} = findStops

const toGeojson = (stops) => {
	const res = stops
	.filter(s => s.stopovers > 2)
	.map(s => ({
		type: 'Feature',
		properties: {stopovers: s.stopovers},
		geometry: {
			type: 'Point',
			coordinates: [s.longitude, s.latitude]
		}
	}))
	return {
		type: 'FeatureCollection',
		features: res
	}
}

pump(
	process.stdin,
	csvParser({
		separator: ';'
	}),
	findStopovers(),
	findStops((stops) => {
		process.stdout.write(JSON.stringify(toGeojson(stops)) + '\n')
	}),
	(err) => {
		if (err) {
			console.error(err)
			process.exitCode = 1
		}
	}
)
