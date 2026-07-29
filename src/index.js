const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

// LƯU Ý: Kiểm tra lại đường dẫn tới routes và config/db cho đúng với cấu trúc thư mục của bạn
const route = require('../routes'); 
const db = require('../config/db'); 

const app = express();

// Kết nối CSDL
db.connect();

const port = 3000;

// 1. CẤU HÌNH MIDDLEWARE (Đúng thứ tự)
app.use(express.static(path.join(__dirname, 'public')));

// Parser dữ liệu từ Form/JSON (BẮT BUỘC ĐẶT TRƯỚC methodOverride)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Ghi đề phương thức HTTP (PUT, DELETE) từ Form
app.use(methodOverride('_method'));

// 2. TEMPLATE ENGINE (HANDLEBARS)
app.engine('hbs', engine({ 
    extname: '.hbs',
    helpers: {
        dateFormat: (date) => {
            if (!date) return '';
            const d = new Date(date);
            if (isNaN(d.getTime())) return '';
            
            const day = String(d.getDate()).padStart(2, '0');
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const year = d.getFullYear();
            return `${day}-${month}-${year}`;
        },
        eq: (a, b) => a === b
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 3. KHỞI TẠO ROUTES
route(app);

// 4. KHỞI CHẠY MÁY CHỦ
app.listen(port, () => {
    console.log(`\n🚀 Server đang chạy thành công tại: http://localhost:${port}`);
});