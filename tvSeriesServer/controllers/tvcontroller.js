const Tv = require('../models/tvseries');

class Controller {
  static create(req, res, next) {
    let { title, overview, poster_path, popularity, tags } = req.body
    
    Tv.create({ title, overview, poster_path, popularity, tags })
      .then(tvSeries => {
        console.log('tvSeries created')
        res.status(201).json(tvSeries)
      })
      .catch(next)
  }

  static findAll(req, res, next) {
    Tv.find()
      .exec()
      .then(tvSeries => {
        // to test caching
        res.json(tvSeries)
      })
      .catch(next)
  }

  static findOne(req, res, next) {
    Tv.findById(req.params.id)
      .exec()
      .then(tvSeries => {
        res.json(tvSeries)
      })
      .catch(next)
  }

  static delete(req, res, next) {
    Tv.findByIdAndDelete(req.params.id)
      .exec()
      .then(() => {
        res.status(204).end()
      })
      .catch(next)
  }

  static update(req, res, next) {
    let updates = Object.assign({}, req.body)
    Tv.findByIdAndUpdate(req.params.id,
      { $set: updates },
      { new: true },
    )
      .exec()
      .then(tvSeries => {
        res.json(tvSeries)
      })
      .catch(next)
  }
}

module.exports = Controller;