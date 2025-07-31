
const express = require('express');
const router = express.Router();
const { rankCandidates } = require('../controllers/rankController');

router.post('/', rankCandidates);

module.exports = router;

