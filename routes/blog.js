const express = require('express');
const router = express.Router();

// Tên file controller (giữ nguyên 'BlogControllers' theo project của bạn)
const blogController = require('../app/controllers/BlogControllers');

// 1. Route tạo bài viết
router.get('/create', blogController.create);
router.post('/store', blogController.store);

// 2. Route sửa bài viết (Lưu ý: tham số ID truyền vào URL)
router.get('/:id/edit', blogController.edit);
router.put('/:id', blogController.update);

// 3. Route xóa bài viết
router.delete('/:id', blogController.destroy);

// 4. Route xem chi tiết động - BẮT BUỘC LUÔN ĐỂ DƯỚI CÙNG
// Tránh Express nhầm '/create' hoặc '/:id/edit' thành ':slug'
router.get('/:slug', blogController.show);

module.exports = router;