import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql"
});

import { gql } from "apollo-boost";
// or you can use `import gql from 'graphql-tag';` instead

client
  .query({
    query: gql`
      {
        tvShows {
					title
					overview
					poster_path
					popularity
					tags
        }
      }
    `
  })
  .then(result => console.log(result));