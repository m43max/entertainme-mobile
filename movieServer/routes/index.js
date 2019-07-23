const router = require('express').Router();
const Controller = require('../controllers/moviecontroller');

router.post('/', Controller.create)
router.get('/', Controller.findAll)
router.get('/:id', Controller.findOne)
router.delete('/:id', Controller.delete)
router.patch('/:id', Controller.update)

module.exports = router;