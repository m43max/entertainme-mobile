import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableNativeFeedback } from 'react-native';
import { Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import Flatlist from '../components/flatlist';
import AddForm from '../components/addform';

function TvScreen({ navigation }) {
  const [showAdd, setShowAdd] = useState(false)
  return (
    <>
      {showAdd && <AddForm type="tvShow"/>}
      <Query
        query={gql`{
          tvShows {
            _id
            title
            overview
            poster_path
            popularity
            tags
          }
        }`}
      >
        {({ loading, error, data }) => { console.log(data);return (
          <View style={styles.container}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error 🙁</Text>}
            {data.tvShows &&
              <Flatlist data={data.tvShows} navi={navigation} type="tvShow"/>
            }
          </View>
        )}}
      </Query>
      <TouchableNativeFeedback onPress={() => setShowAdd(b => !b)}>
        <View style={styles.addButton}>
          <Text style={styles.plus}>+</Text>
        </View>
      </TouchableNativeFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 26,
    flex: 1,
    alignItems: 'center',
  },
  addButton: {
    height: 42,
    width: 42,
    position: 'absolute',
    bottom: 10,
    right: 8,
    elevation: 5,
    borderRadius: 21,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 22,
    color: 'white',
  },
});

export default TvScreen;