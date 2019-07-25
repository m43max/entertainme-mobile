import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import Card from './card';

function MyFlatList({ navi, data, type }) {
	const toDetail = show => {
		navi.navigate('Details', { type, show })
	};
	const renderItem = ({item}) => <Card show={item} onClick={() => toDetail(item)}/>;
	const extractKey = show => show._id;
	
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