const express = require('express');
const router = express.Router();

// Lưu ý: Tên file controller của bạn là BlogControllers.js (có chữ 's')
const blogController = require('../app/controllers/BlogControllers');

router.get('/create', blogController.create);
router.post('/store', blogController.store);

module.exports = router;