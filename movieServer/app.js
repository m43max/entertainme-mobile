require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes/');
const errorHandler = require('./middleware/errorhandler')

// local mongodb connection
mongoose.connect(`mongodb://localhost/cache-movies`, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => {
    app.emit('dbConnect')
    console.log('MongoDB connected')
  })
  .catch(err => console.log('MongoDB cannot connect'))

// atlas connection
  
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/movies', routes)
app.use(errorHandler);
  
const PORT = 3001;
app.listen(PORT, () => { console.log(`Server started on port ${PORT}`) })

module.exports = app;