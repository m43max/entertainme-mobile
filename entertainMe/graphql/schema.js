const { buildSchema } = require('graphql')

module.exports = buildSchema(`
	type Show {
		_id: ID!
		title: String!
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	input ShowInput {
		id: ID
		title: String
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	type RootQuery {
		movies: [Show!]!
		movie(id: ID): Show
		tvShows: [Show!]!
		tvShow(id: ID): Show
	}

	type RootMutation {
		createMovie(movie: ShowInput): Show
		deleteMovie(id: ID) : Boolean
		updateMovie(movie: ShowInput) : Show
		createTvShow(tvShow: ShowInput): Show
		deleteTvShow(id: ID) : Boolean
		updateTvShow(tvShow: ShowInput) : Show
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)