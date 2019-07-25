import { gql } from 'apollo-boost';

export const GET_MOVIES = gql`
	query {
		movies {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`

export const GET_TVSHOWS = gql`
	query {
		tvShows {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`