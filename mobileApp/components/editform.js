import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_MOVIES, GET_TVSHOWS } from '../helpers/refetchqueries';

const UPDATE_MOVIE = gql`
  mutation updateMovie($show: ShowInput) {
    updateMovie(movie: $show) {
      _id
			title
			overview
    }
  }
`;

const UPDATE_TVSHOW = gql`
  mutation updateTvShow($show: ShowInput) {
    updateTvShow(tvShow: $show) {
      _id
			title
			overview
    }
  }
`;

function EditForm({ type, show, onSave }) {
	const [title, setTitle] = useState('')
	const [overview, setOverview] = useState('')
	const [popularity, setPopularity] = useState('')
	const [posterPath, setPosterPath] = useState('')
	const [tags, setTags] = useState('')
	const clearInput = () => {
		setTitle('');	setOverview(''); setPopularity('');	setPosterPath(''); setTags('')
	}

	const mutation = type === 'movie' ? UPDATE_MOVIE : UPDATE_TVSHOW
	const refetchQuery = type === 'movie' ? GET_MOVIES : GET_TVSHOWS
	const mutationInput = () => ({
		variables: {
			show: {
				title,
				overview,
				popularity: +popularity,
				poster_path: posterPath,
				tags: [],
			}
		}
	})

	return (
		<Mutation
			mutation={mutation}
			refetchQueries={[{ query: refetchQuery }]}	
		>
      {(create) => (
				<View style={styles.container}>
					<Text style={styles.title}>
						{type === 'movie' ? 'Edit Movie' : 'Edit TV Show'}
					</Text>
					<View style={{flex: 1}}>
						<TextInput
							style={styles.search}
							placeholder="Enter title"
							onChangeText={text => setTitle(text)}
							value={title}
						/>
						<TextInput
							style={styles.search}
							placeholder="Enter overview"
							onChangeText={text => setOverview(text)}
							value={overview}
						/>
						<TextInput
							style={styles.search}
							placeholder="Enter popularity"
							onChangeText={text => setPopularity(text)}
							value={popularity}
						/>
						<TextInput
							style={styles.search}
							placeholder="Enter url for poster image"
							onChangeText={text => setPosterPath(text)}
							value={posterPath}
						/>
						<TextInput
							style={styles.search}
							placeholder="Enter comma-seperated tags"
							onChangeText={text => setTags(text)}
							value={tags}
						/>
						<View style={styles.save}>
							<View style={{marginBottom: 12}}>
								<Button title="Cancel"color="#694fad" onPress={onSave}/>
							</View>
							<Button title="Save"color="#694fad" onPress={() => {
								create(mutationInput())
								setTimeout(() => {
									onSave()
								}, 200)
							}}/>
						</View>
					</View>
				</View>
      )}
    </Mutation>
		
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		flex: 1,
		width: '100%',
		height: 700,
		backgroundColor: '#dfdfdf',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 10,
	},
	a: {
		// flex: 1,
		width: 180,
		height: 292,
		marginHorizontal: 10,
		marginBottom: 12,
		backgroundColor: '#dfdfdf',
		borderRadius: 4,
		overflow: 'hidden',
	},
	title: {
		marginVertical: 6,
		marginHorizontal: 10,
		fontSize: 20,
		color: '#222',
		textAlign: 'center',
	},
	search: {
		alignSelf: 'stretch',
		height: 34,
		marginHorizontal: 12,
		marginBottom: 10,
		paddingHorizontal: 10, 
		borderRadius: 4,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#aaa',
	},
	save: {
		marginTop: 12,
		marginHorizontal: 42,
	}
})

export default EditForm;