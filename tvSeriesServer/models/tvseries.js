const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tvSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  overview: {
    type: String,
  },
  poster_path: {
    type: String,
  },
  popularity: {
    type: Number,
  },
  tags: {
    type: Array,
  },
});

module.exports = mongoose.model('tvSeries', tvSchema);