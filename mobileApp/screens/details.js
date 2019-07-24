import React, { useState, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

function Details({ navigation }) {
	const { url } = navigation.getParam('ship')
	console.log({url}, '\n')
	const [ship, setShip] = useState(null)

	useEffect(() => {
		axios.get(url)
			.then(({data}) => {
				setShip(data)
			})
			.catch(console.log)
	}, []);

  return (
		<View style={styles.a}>
			{ship ? 
				(
					<View style={styles.c}>
						<Text style={styles.name}>
							{`${ship.name}`}
						</Text>
						<Text style={styles.b}>
							{'\n'}
							Model: {`${ship.model}\n`}
							Manufacturer: {`${ship.manufacturer}\n`}
							Starship Class: {`${ship.starship_class}\n`}
							Length: {`${ship.length} m\n`}
							Cost In Credits: {`${ship.cost_in_credits}\n`}
							Crew: {`${ship.crew}\n`}
							Passengers: {`${ship.passengers}\n`}
							Hyperdrive Rating: {`${ship.hyperdrive_rating}m\n`}
							Cargo Capacity: {`${ship.cargo_capacity} kg\n`}
						</Text>
					</View>
				) :
				(
					<View style={{flex: 1, alignItems: 'center', marginTop: 24}}>
						<ActivityIndicator size="large" color="#dfdfdf" />
					</View>
				)
			}
    </View>
  );
}

const styles = StyleSheet.create({
	a: {
		flex: 1,
		// justifyContent: 'center',
		backgroundColor: '#282828',
	},
	c: {
		flex: 0,
		marginVertical: 8,
		marginHorizontal: 14,
		alignSelf: 'flex-start',
	},
	b: {
		color: 'white',
		lineHeight: 22,
	},
	name: {
		fontSize: 28,
		color: 'white',
	}
});

Details.navigationOptions = ({ navigation }) => ({
	title: 'Details',
});

export default Details;