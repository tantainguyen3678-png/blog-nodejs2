const Blog = require('../models/Blog');

class BlogController {
    // [GET] /blogs/create
    create(req, res) {
        res.render('blogs/create');
    }

    // [POST] /blogs/store
    store(req, res) {
        console.log("Dữ liệu nhận được từ Form:", req.body);
        
        // Lưu bài mới vào danh sách
        Blog.create(req.body);

        // Trả về JSON theo đúng bài học
        res.json(req.body);
    }
}

module.exports = new BlogController();