const { buildSchema } = require('graphql')

module.exports = buildSchema(`
	type Movie {
		_id: ID!
		title: String!
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	input MovieInput {
		title: String
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	type RootQuery {
		events: [String!]!
		movies: [Movie!]!
	}

	type RootMutation {
		createEvent(name: String): String
		createMovie(movieInput: MovieInput): Movie
	}

	schema {
		query: RootQuery
		mutation: RootMutation
	}
`)