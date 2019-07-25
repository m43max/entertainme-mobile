import { gql } from 'apollo-boost';

export const GET_MOVIES = gql`
	query {
		movies {
			_id
			title
			poster_path
			popularity
		}
	}
`

export const GET_TVSHOWS = gql`
	query {
		tvShows {
			_id
			title
			poster_path
			popularity
		}
	}
`