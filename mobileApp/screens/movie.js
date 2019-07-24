import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Button, Text, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ApolloProvider, Query } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';
const client = new ApolloClient({
  uri: 'http://10.0.2.2:3000/graphql'
});

import Flatlist from '../components/flatlist';

function MovieScreen({ navigation }) {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <ApolloProvider client={client}>
      <Query
        query={gql`
          {
            movies {
              _id
              title
              overview
              poster_path
              popularity
              tags
            }
          }
        `}
      >
        {({ loading, error, data }) => (
          <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error 🙁</Text>}
            {data.movies && <Flatlist data={data.movies}/>}
          </View>
        )}
      </Query>
      <TouchableNativeFeedback
        onPress={() => setShowAdd(true)}
      >
        <View style={styles.addButton}>
          <Text style={styles.plus}>
            +
          </Text>
        </View>
      </TouchableNativeFeedback>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: 10,
    right: 8,
    elevation: 5,
    borderRadius: 20,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 22,
    color: 'white',
  }
});

MovieScreen.navigationOptions = {
  tabBarIcon: ({ focused, tintColor }) => (
    <Ionicons name="ios-film" size={24} color={tintColor} />
  ),
}

export default MovieScreen;