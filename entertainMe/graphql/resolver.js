const { mvServer, tvServer } = require('../axios/instances')
const axios = require('axios')

module.exports = {
	events: () => {
		return ['cooking', 'running', 'reading'];
	},
	createEvent: args => {
		return args.name;
	},
	movies: () => {
		return movies
	},
	createMovie: args => {
		const { title, overview, poster_path, popularity, tags } = args.movieInput
		return mvServer.post('/', {
			title,
			overview,
			poster_path,
			popularity,
			tags,
		})
			.then(({data}) => {
				const { _id, title, overview, poster_path, popularity, tags } = data
				return { _id, title, overview, poster_path, popularity, tags }
			})
			.catch(console.log)
	}
}