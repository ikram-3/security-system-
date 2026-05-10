const express = require('express');
const threatController = require('../controllers/threatController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/', threatController.getAllThreats);
router.get('/stats', threatController.getStats);
router.get('/:id', threatController.getThreat);

router.post('/', restrictTo('admin', 'analyst'), threatController.createThreat);
router.patch('/:id', restrictTo('admin', 'analyst'), threatController.updateThreat);

module.exports = router;
