import React, { useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableNativeFeedback } from 'react-native';

import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_MOVIES, GET_TVSHOWS } from '../helpers/refetchqueries';

import EditForm from '../components/editform';

const GET_MOVIE = gql`
	query GetMovie($id: ID!) {
		movie(id: $id) {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;

const GET_TVSHOW = gql`
	query GetTvShow($id: ID!) {
		tvShow(id: $id) {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`;

const DELETE_MOVIE = gql`
	mutation deleteMovie($id: ID) {
		deleteMovie(id: $id)
	}
`;

const DELETE_TVSHOW = gql`
	mutation deleteTvShow($id: ID) {
		deleteTvShow(id: $id)
	}
`;

function Details({ navigation }) {
	const [showEdit, setShowEdit] = useState(false)

	const type = navigation.getParam('type')
	const id = navigation.getParam('show')._id

	const query = type === 'movie' ? GET_MOVIE : GET_TVSHOW
	const mutation = type === 'movie' ? DELETE_MOVIE : DELETE_TVSHOW
	const refetchQuery = type === 'movie' ? GET_MOVIES : GET_TVSHOWS

  return (
		<View style={styles.container}>
			<Query query={query} variables={{ id }}>
				{({ loading, error, data }) => {
					if (loading) return null;
					if (error) return <Text>Error 🙁</Text>;
					if (data) {
						const show = data[type]
						return (
							<>
								{showEdit && (
									<EditForm type={type} show={show} onSave={() => setShowEdit(false)}/>
								)}
								<View style={styles.a}>
									<Image style={styles.image} source={{uri: show.poster_path}} />
									<Text style={styles.b}>
										<Text style={styles.c}>
											{show.title + '\n'}
										</Text>
										Overview: {show.overview + '\n'}
										Popularity: {show.popularity + '\n'}
										Tags: {show.tags.join(', ') + '\n'}
									</Text>
								</View>
							</>
						)
					}
				}}
			</Query>
			<Mutation
				mutation={mutation}
				refetchQueries={[{ query: refetchQuery }]}	
			>
				{(deleteOne) => {
					return (
						<TouchableNativeFeedback onPress={() => {
							deleteOne({ variables: { id } })
							setTimeout(() => {
								if(type === 'movie') {
									navigation.navigate('Movies')
								} else {
									navigation.navigate('TvShows')
								}
							}, 350)
						}}>
							<View style={styles.Button}>
								<Text style={styles.inside}>Delete</Text>
							</View>
						</TouchableNativeFeedback>
					)
				}}
			</Mutation>
			<TouchableNativeFeedback
				onPress={() => setShowEdit(b => !b)}
			>
				<View style={{ ...styles.Button, bottom: 54 }}>
					<Text style={styles.inside}>Edit</Text>
				</View>
			</TouchableNativeFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#e5e5e5',
		padding: 12,
	},
	a: {
		width: 280,
		marginBottom: 24,
		borderRadius: 5,
		overflow: 'hidden',
	},
	image: {
		width: 280,
		height: 380,
	},
	b: {
		paddingTop: 12,
		paddingBottom: 42,
		fontSize: 14,
		lineHeight: 20,
	},
	c: {
		marginBottom: 22,
		fontSize: 22,
	},
	Button: {
		height: 36,
		paddingHorizontal: 14,
    position: 'absolute',
    bottom: 10,
    right: 8,
    elevation: 5,
    borderRadius: 5,
    backgroundColor: '#2f2f2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inside: {
    fontSize: 14,
    color: 'white',
  }
});

export default Details;