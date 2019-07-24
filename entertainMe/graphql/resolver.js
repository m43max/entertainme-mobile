const { mvServer, tvServer } = require('../axios/instances')
const client = require('../redis/redis')
const errHandler = err => { throw(err) }

module.exports = {
	movies: () => {
		return new Promise((resolve, reject) => {
			client.get('movies', (err, value) => {
				if(err) {
					reject(err)
				} else if(value) {
					resolve(JSON.parse(value))
				} else {
					mvServer.get('/')
						.then(({data}) => {
							client.setex('movies', 300, JSON.stringify(data))
							resolve(data)
						})
						.catch(reject)
				}
			})
		})
			.then(data => data)
			.catch(errHandler)
	},
	movie: ({ id }) => {
		return new Promise((resolve, reject) => {
			client.get('movies', (err, value) => {
				if(err) {
					reject(err)
				} else if(value) {
					let mvData = JSON.parse(value).find(mv => mv._id === id)
					resolve(mvData)
				} else {
					mvServer.get(`/${id}`)
						.then(({data}) => {
							resolve(data)
						})
						.catch(reject)
				}
			})
		})
			.then(data => data)
			.catch(errHandler)
	},
	createMovie: ({ movie }) => {
		return mvServer.post('/', movie)
			.then(({data}) => {
				client.del('movies')
				return data
			})
			.catch(errHandler)
	},
	deleteMovie: ({ id }) => {
		return mvServer.delete(`/${id}`)
			.then(() => {
				client.del('movies')
				return true
			})
			.catch(errHandler)
	},
	updateMovie: ({ movie }) => {
		let updates = Object.assign({}, movie)
		delete updates.id
		return mvServer.patch(`/${movie.id}`, updates)
			.then(({data}) => {
				client.del('movies')
				return data
			})
			.catch(errHandler)
	},
	tvShows: () => {
		return new Promise((resolve, reject) => {
			client.get('tvShows', (err, value) => {
				if(err) {
					reject(err)
				} else if(value) {
					resolve(JSON.parse(value))
				} else {
					tvServer.get('/')
						.then(({data}) => {
							client.setex('tvShows', 300, JSON.stringify(data))
							resolve(data)
						})
						.catch(reject)
				}
			})
		})
			.then(data => data)
			.catch(errHandler)
	},
	tvShow: ({ id }) => {
		return new Promise((resolve, reject) => {
			client.get('tvShows', (err, value) => {
				if(err) {
					reject(err)
				} else if(value) {
					let tvData = JSON.parse(value).find(tv => tv._id === id)
					resolve(tvData)
				} else {
					tvServer.get(`/${id}`)
						.then(({data}) => {
							resolve(data)
						})
						.catch(reject)
				}
			})
		})
			.then(data => data)
			.catch(errHandler)
	},
	createTvShow: ({ tvShow }) => {
		return tvServer.post('/', tvShow)
			.then(({data}) => {
				client.del('tvShows')
				return data
			})
			.catch(errHandler)
	},
	deleteTvShow: ({ id }) => {
		return tvServer.delete(`/${id}`)
			.then(() => {
				client.del('tvShows')
				return true
			})
			.catch(errHandler)
	},
	updateTvShow: ({ tvShow }) => {
		let updates = Object.assign({}, tvShow)
		delete updates.id
		return tvServer.patch(`/${tvShow.id}`, updates)
			.then(({data}) => {
				client.del('tvShows')
				return data
			})
			.catch(errHandler)
	},
}