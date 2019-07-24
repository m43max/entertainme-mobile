import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, StyleSheet, FlatList } from 'react-native';
import Card from './card';

function MyFlatList({ navi, data }) {
	console.log(data)
	const renderItem = ({item}) => {
		return <Card show={item}/>
		// // <Card
		// // 	ship={item}
		// // 	onClick={() => navi.navigate('Details', {ship: item})}
		// // />
	}
	const extractKey = movie => movie._id;
	
	return (
		<FlatList
			style={styles.container}
			contentContainerStyle={styles.center}
			numColumns={2}
			data={data}
			renderItem={renderItem}
			keyExtractor={extractKey}
		/>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch',
		padding: 6,
	},
	center: {
		alignItems: 'center',
	},
	row: {
		color: 'black',
		fontSize: 24,
	}
})

export default MyFlatList;