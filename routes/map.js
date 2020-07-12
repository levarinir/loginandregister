const express = require('express');
const router = express.Router();

const { add, getall, getXls } = require('../controllers/map');

router.post('/marker/add', add);
router.get('/all', getall);
router.get('/allToXls', getXls);

module.exports = router;
