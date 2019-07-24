import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableNativeFeedback } from 'react-native';

function Card({ show, onClick }) {
	return (
		<TouchableNativeFeedback
			onPress={() => {}}
			background={TouchableNativeFeedback.SelectableBackground()}
		>
			<View style={styles.a}>
				<Image style={styles.image} source={{uri: show.poster_path}} />
				<Text style={styles.b}>
					<Text style={styles.c}>{show.title + '\n'}</Text>
					Popularity: {show.popularity + '\n'}
				</Text>
			</View>
    </TouchableNativeFeedback>
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
	image: {
		width: 180,
		height: 242,
	},
	b: {
		padding: 8,
		fontSize: 14,
		lineHeight: 18,
	},
	c: {
		marginBottom: 16,
		fontSize: 18,
	},
})

export default Card;