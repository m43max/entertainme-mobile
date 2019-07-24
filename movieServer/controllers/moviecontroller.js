const Movie = require('../models/movie');

class Controller {
  static create(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body
    
    Movie.create({ title, overview, poster_path, popularity, tags })
      .then(movie => {
        console.log('movie created')
        res.status(201).json(movie)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Movie.find()
      .exec()
      .then(movies => {
        setTimeout(() => {
          res.json(movies)
        }, 1000)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Movie.findById(req.params.id)
      .exec()
      .then(movie => {
        res.json(movie)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Movie.findByIdAndDelete(req.params.id)
      .exec()
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  }

  static update(req, res, next) {
    let updates = Object.assign({}, req.body)
    Movie.findByIdAndUpdate(req.params.id,
      { $set: updates },
      { new: true },
    )
      .exec()
      .then(movie => {
        res.json(movie)
      })
      .catch(next)
  }
}

module.exports = Controller;