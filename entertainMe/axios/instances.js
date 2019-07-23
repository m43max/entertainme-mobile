const axios = require('axios')

module.exports = {
	mvServer: axios.create({
		baseURL: 'http://localhost:3001/movies'
	}),
	tvServer: axios.create({
		baseURL: 'http://localhost:3002/tv'
	}),
}