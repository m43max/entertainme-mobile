import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';

const CREATE_MOVIE = gql`
  mutation createMovie($show: ShowInput) {
    createMovie(movie: $show) {
      _id
			title
			overview
    }
  }
`;

const CREATE_TVSHOW = gql`
  mutation createTvShow($show: ShowInput) {
    createTvShow(tvShow: $show) {
      _id
			title
			overview
    }
  }
`;

function AddForm({ type }) {
	const [title, setTitle] = useState('')
	const [overview, setOverview] = useState('')
	const [popularity, setPopularity] = useState('')
	const [posterPath, setPosterPath] = useState('')
	const [tags, setTags] = useState('')

	const mutation = type === 'movie' ? CREATE_MOVIE : CREATE_TVSHOW
	const mutationInput = () => ({
		variables: {
			show: {
				title,
				overview,
				popularity: +popularity,
				poster_path: posterPath,
			}
		}
	})

	return (
		<Mutation mutation={mutation}>
      {(create, { data }) => (
				<View style={{marginTop: 24}}>
					<Text style={styles.title}>
						{type === 'movie' ? 'Add Movie' : 'Add TV Show'}
					</Text>
					<View>
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
							<Button title="Save"color="#694fad" onPress={() => {
								create(mutationInput())
							}}/>
						</View>
					</View>
				</View>
      )}
    </Mutation>
		
	)
}

const styles = StyleSheet.create({
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
	container: {
		flex: 1,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
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

export default AddForm;