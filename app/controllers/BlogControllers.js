const Blog = require('../models/Blog');

class BlogController {
    // [GET] /blogs/:slug (Trang chi tiết bài viết)
    show(req, res, next) {
        Blog.findOne({ slug: req.params.slug }).lean()
            .then(blog => {
                if (!blog) {
                    return res.status(404).send('<h1>404 - Bài viết không tồn tại</h1><a href="/">Quay về trang chủ</a>');
                }
                res.render('detail', { blog });
            })
            .catch(error => {
                console.error("Lỗi khi tải chi tiết bài viết:", error);
                next(error);
            });
    }

    // [GET] /blogs/create
    create(req, res) {
        res.render('blogs/create');
    }

    // [POST] /blogs/store
    store(req, res, next) {
        console.log("Dữ liệu nhận được từ Form:", req.body);

        Blog.create(req.body)
            .then(blog => res.json(blog))
            .catch(error => next(error));
    }

    // [GET] /blogs/:id/edit (Hiển thị Form Edit bài viết)
    edit(req, res, next) {
        Blog.findById(req.params.id).lean()
            .then(blog => res.render('blogs/edit', { blog }))
            .catch(next);
    }

    // [PUT] /blogs/:id (Cập nhật dữ liệu vào DB)
    update(req, res, next) {
        Blog.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/')) // Sửa xong quay về Trang chủ
            .catch(next);
    }

    // [DELETE] /blogs/:id (Xóa bản ghi)
    destroy(req, res, next) {
        Blog.deleteOne({ _id: req.params.id })
            .then(() => res.redirect(req.get('Referrer') || '/')) // Xóa xong tải lại trang hiện tại hoặc về trang chủ
            .catch(next);
    }
}

module.exports = new BlogController();