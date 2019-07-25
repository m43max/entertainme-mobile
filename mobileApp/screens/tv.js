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
      {showAdd && <AddForm type="tvShow" onSave={() => setShowAdd(false)}/>}
      <Query
        query={gql`{
          tvShows {
            _id
            title
            poster_path
            popularity
          }
        }`}
      >
        {({ loading, error, data, refetch, networkStatus }) => {
          return (
            <View style={styles.container}>
              {loading && <Text>Loading...</Text>}
              {error && <Text>Error 🙁</Text>}
              {data.tvShows &&
                <Flatlist data={data.tvShows} navi={navigation} type="tvShow"/>
              }
            </View>
          )
        }}
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
    backgroundColor: '#2f2f2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 22,
    color: 'white',
  },
});

export default TvScreen;