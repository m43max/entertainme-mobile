import React from 'react'
import { StyleSheet, View, Button, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function TvScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{padding: 8}}>
				<Text style={{fontSize: 18}}>
					Eager Hit That Frog
				</Text>
			</View>
			<Button
				color="#297bff"
				title="Play the game"
				onPress={() => {}}
			/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

TvScreen.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons name="ios-tv" size={24} color={tintColor} />
  ),
}

export default TvScreen;