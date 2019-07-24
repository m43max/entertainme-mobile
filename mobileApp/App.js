import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// Screens
import MovieScreen from './screens/movie';
import TvScreen from './screens/tv';

const Navigator = createMaterialBottomTabNavigator({
  Movies: { screen: MovieScreen },
  'TV shows': { screen: TvScreen },
}, {
  initialRouteName: 'Movies',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
  barStyle: { backgroundColor: '#694fad' },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppContainer = createAppContainer(Navigator);

export default function App() {
  return (
    <AppContainer/>
  )
};