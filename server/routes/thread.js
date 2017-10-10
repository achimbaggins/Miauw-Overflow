var express = require('express');
var router = express.Router();
const threadController = require('../controllers/threadController');
const authority = require('../helpers/authority');


router.get('/', threadController.findAll);
router.post('/', threadController.createData)
router.post('/:slug/vote', threadController.vote)
router.get('/:slug', threadController.getBySlug)
router.post('/:slug', threadController.createRespon)
// router.put('/:id', threadController.put)
router.delete('/:id', threadController.destroy)


module.exports = router;
