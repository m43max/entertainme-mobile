import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import MovieScreen from './screens/movie';
import TvScreen from './screens/tv';
import Details from './screens/details';

// Graphql
import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
const client = new ApolloClient({
  uri: 'http://10.0.2.2:3000/graphql'
});

// o
const MovieStack = createStackNavigator({
  Movies: {
    screen: MovieScreen,
    navigationOptions: {
      header: null,
      headerTitle: 'Movies',
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
      headerTitle: 'Movie Details',
      headerStyle: {
        backgroundColor: 'white'
      }
    }
  }
});

const TvStack = createStackNavigator({
  TvShows: {
    screen: TvScreen,
    navigationOptions: {
      header: null,
      headerTitle: 'TV Shows',
      headerStyle: {
        backgroundColor: "white"
      }
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
      headerTitle: 'TV Show Details',
      headerStyle: {
        backgroundColor: 'white'
      }
    }
  }
});

const Navigator = createMaterialBottomTabNavigator({
  Movies: {
    screen: MovieStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-film" size={24} color={tintColor} />
    },
  },
  'TV shows': {
    screen: TvStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Ionicons name="ios-tv" size={24} color={tintColor} />
    },
  },
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
    <ApolloProvider client={client}>
      <AppContainer/>
    </ApolloProvider>
  )
};