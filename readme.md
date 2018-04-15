# identify-bvg-shuttle-stops

**Identify stops from [recorded positions of the BVG autonomous shuttle](https://cloud.innoz.de/index.php/s/BE8EJsFpImUtq1q).**

[![npm version](https://img.shields.io/npm/v/identify-bvg-shuttle-stops.svg)](https://www.npmjs.com/package/identify-bvg-shuttle-stops)
[![build status](https://api.travis-ci.org/derhuerst/identify-bvg-shuttle-stops.svg?branch=master)](https://travis-ci.org/derhuerst/identify-bvg-shuttle-stops)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/identify-bvg-shuttle-stops.svg)
[![chat with me on Gitter](https://img.shields.io/badge/chat%20with%20me-on%20gitter-512e92.svg)](https://gitter.im/derhuerst)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install identify-bvg-shuttle-stops
```


## Usage

```js
const csvParser = require('csv-parser')
const findStops = require('identify-bvg-shuttle-stops')
const {findStopovers} = findStops

const done = (stops) => {
	console.log(stops)
}

process.stdin,
.pipe(csvParser({separator: ';'}))
.pipe(findStopovers())
.pipe(findStops(done))
```

```shell
cat vehicle_states.csv | node index.js
```

```js
[
	{latitude: 52.48216376880161, longitude: 13.357211926989104},
	{latitude: 52.482483875306386, longitude: 13.35751598641926},
	{latitude: 52.4817017355642, longitude: 13.356620222708647},
	{latitude: 52.482472467369995, longitude: 13.357291935350002},
	{latitude: 52.48267806617778, longitude: 13.357537696744444},
	{latitude: 52.48255858655, longitude: 13.357398499350001},
	{latitude: 52.4822292764, longitude: 13.3569638034},
	{latitude: 52.48161299, longitude: 13.3568944008},
	{latitude: 52.48224300732858, longitude: 13.35733493442857},
	{latitude: 52.48137507725, longitude: 13.356708429200001},
	{latitude: 52.4818917553, longitude: 13.3565476968},
	{latitude: 52.4819968924, longitude: 13.356677952750001},
	{latitude: 52.4817106127, longitude: 13.3570866586},
	{latitude: 52.481943223150004, longitude: 13.3573785506},
	{latitude: 52.481770648799994, longitude: 13.356488525100001},
	{latitude: 52.48208482255, longitude: 13.35739284525}
]
```


## Contributing

If you have a question or have difficulties using `identify-bvg-shuttle-stops`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/identify-bvg-shuttle-stops/issues).
