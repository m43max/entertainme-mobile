const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
// graphql
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/graphql',
	graphqlHTTP({
		schema,
		rootValue: resolver,
    graphiql: true,
  }),
);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`)
});