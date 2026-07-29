const Blog = require('../models/Blog');

class SiteController {
    // [GET] / (Trang chủ)
    index(req, res, next) {
        // Dùng Model Blog để tìm kiếm toàn bộ dữ liệu trong Collection
        Blog.find({})
            .then(blogs => {
                // Trả dữ liệu dạng JSON về trình duyệt theo yêu cầu Bước 5
                res.json(blogs);
            })
            .catch(error => {
                // Nếu có lỗi, chuyển đến middleware xử lý lỗi
                next(error);
            });
    }

    // [GET] /about
    about(req, res) {
        res.render('about');
    }

    // [GET] /contact
    contact(req, res) {
        res.render('contact');
    }

    // [GET] /search
    search(req, res) {
        console.log("Từ khóa tìm kiếm:", req.query.q);
        res.render('search');
    }
}

// Xuất đối tượng ra để sử dụng ở file Route
module.exports = new SiteController();