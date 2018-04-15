'use strict'

const {Transform, Writable} = require('stream')
const distance = require('gps-distance')
const centroid = require('@turf/centroid').default

const computeCentroid = (points) => {
	const coords = []
	for (let p of points) coords.push([p.longitude, p.latitude])
	const p = centroid({
		type: 'MultiPoint',
		coordinates: coords
	}).geometry
	return {latitude: p.coordinates[1], longitude: p.coordinates[0]}
}

const findStopovers = () => {
	const byVehicle = Object.create(null)

	function write (update, _, cb) {
		let d = byVehicle[update.vehicle_id], first = false
		if (!d) {
			d = byVehicle[update.vehicle_id] = {
				doorsOpen: null,
				stopoverStarted: null,
				stopoverPositions: null,
				t: null,
				latitude: null,
				longitude: null
			}
			first = true
		}

		const t = +new Date(update.created_at)
		if (!first && t <= d.t) {
			const msg = [
				'time not continuous:',
				new Date(t), 'vs', new Date(d.t)
			].join(' ')
			return cb(new Error(msg))
		}
		const prevT = first ? t - 1000 : d.t
		const doorsOpen = update.doors === 't'
		const prevDoorsOpen = first ? doorsOpen : d.doorsOpen
		const latitude = parseFloat(update.latitude)
		const longitude = parseFloat(update.longitude)
		const dist = first
			? 0
			: distance(latitude, longitude, d.latitude, d.longitude) * 1000

		if (doorsOpen && !prevDoorsOpen) { // stopover started
			d.stopoverStarted = t
			d.stopoverPositions = [{latitude, longitude}]
		} else if (
			(doorsOpen && prevDoorsOpen && dist > 1) ||
			(!doorsOpen && prevDoorsOpen)
		) { // stopover ended
			const start = d.stopoverStarted
			let duration = t - start
			if ((t - prevT) >= 5000) {
				// split into two stopovers
				duration = prevT - start + 1000
				d.stopoverStarted = t - 1000
			} else d.stopoverStarted = t
			this.push({
				start,
				duration,
				position: computeCentroid(d.stopoverPositions)
			})
			d.stopoverPositions = []
		} else if (doorsOpen) {
			d.stopoverPositions.push({latitude, longitude})
		}

		// todo: position

		d.t = t
		d.doorsOpen = doorsOpen
		d.latitude = latitude
		d.longitude = longitude
		cb()
	}

	const flush = (cb) => {
		// todo
	}

	return new Transform({objectMode: true, write, flush})
}

const findStops = (cb) => {
	const write = (stopover, _, cb) => {
		// todo
	}

	const final = (cb) => {
		// todo
	}

	return new Writable({objectMode: true, write, final})
}

findStops.findStopovers = findStopovers
module.exports = findStops
