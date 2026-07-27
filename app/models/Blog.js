// Hàm tạo Slug
const slugify = (text) => {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')       
        .replace(/[^\w\-]+/g, '')       
        .replace(/\-\-+/g, '-');        
};

// Dữ liệu mẫu bài viết
let mockBlogs = [
    {
        name: "Lập trình Node.js và Express cho người mới bắt đầu",
        slug: "lap-trinh-nodejs-express",
        tag: "NodeJS",
        content: "Bài viết này sẽ hướng dẫn bạn cách xây dựng một ứng dụng web cơ bản sử dụng Express framework và xử lý giao diện với Handlebars template...",
        img: "/img/pattern.png",
        author_name: "Julia Walker",
        author_img: "/img/author.png",
        updatedAt: new Date()
    },
    {
        name: "Tối ưu hóa Core Web Vitals nâng cao hiệu suất",
        slug: "toi-uu-core-web-vitals",
        tag: "Web Performance",
        content: "Tìm hiểu các chỉ số LCP, FID, CLS là gì và cách làm thế nào để website của bạn đạt điểm tối đa trên Google PageSpeed Insights...",
        img: "/img/pattern.png",
        author_name: "Julia Walker",
        author_img: "/img/author.png",
        updatedAt: new Date()
    }
];

module.exports = {
    // Lấy tất cả bài viết
    getAll: () => mockBlogs,

    // Lọc tìm kiếm
    search: (query, searchType) => {
        if (!query) return [];
        const searchKey = query.toLowerCase();
        return mockBlogs.filter(blog => {
            if (searchType === 'author') {
                return blog.author_name.toLowerCase().includes(searchKey);
            } else {
                return blog.name.toLowerCase().includes(searchKey) || 
                       blog.content.toLowerCase().includes(searchKey);
            }
        });
    },

    // Thêm bài viết mới
    create: (data) => {
        const { name, content, tag, img, author_img, author_name } = data;
        const newBlog = {
            name,
            slug: slugify(name || ''), 
            tag,
            content,
            img: img || '/img/pattern.png', 
            author_name,
            author_img: author_img || '/img/author.png', 
            updatedAt: new Date()
        };
        mockBlogs.unshift(newBlog);
        return newBlog;
    }
};