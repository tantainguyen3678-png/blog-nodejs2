const Blog = require('../models/Blog');

class SiteController {
    // [GET] / (Trang chủ)
    index(req, res, next) {
        // Lấy danh sách, dùng .lean() để chuyển sang JS Object thuần
        Blog.find({}).lean()
            .then(blogs => {
                // Bảo vệ: Kiểm tra nếu blogs bị null/undefined thì khởi tạo mảng rỗng []
                blogs = blogs || [];

                // Truyền biến 'blogs' sang file giao diện home.hbs
                res.render('home', { blogs });
            })
            .catch(error => {
                // Ghi log lỗi để dễ kiểm tra
                console.error("Lỗi khi lấy danh sách bài viết:", error);
                
                // Trả về trang home với mảng rỗng thay vì làm sập app (Crash)
                // Hoặc bạn có thể chuyển tiếp lỗi cho middleware xử lý lỗi: next(error);
                res.render('home', { blogs: [] });
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