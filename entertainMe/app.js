const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
// redis
const redis = require('redis');
const client = redis.createClient();
// graphql
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const resolver = require('./graphql/resolver');

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

client.on('error', err => {
	console.log('Error ' + err);
});

app.use('/graphql',
	graphqlHTTP({
		schema,
		rootValue: resolver,
    graphiql: true,
  }),
);

app.get('/', (req, res) => {
	client.get('mvtv', (err, value) => {
		if(err) {
			console.log('Redis error: ', err)
			res.status(500).end()
		} else if (value) {
			res.json(JSON.parse(value))
		} else {
			Promise.all([
				axios.get('http://localhost:3001/movies'),
				axios.get('http://localhost:3002/tv'),
			])
				.then(values => {
					const data = values.map(value => value.data)
					client.setex('mvtv', 300, JSON.stringify(data))
					res.json(data)
				})
				.catch(err => {
					res.status(500).end()
				})
		}
	})
});

// app.get('/checkredis', (req, res) => {
// 	client.get('mvtv', (err, value) => {
// 		if(err) {
// 			console.log('error --------------------')
// 			console.log(err)
// 		} else {
// 			console.log(JSON.parse(value))
// 		}
// 		res.end()
// 	})
// })
  
const PORT = 3000;
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })