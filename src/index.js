const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const route = require('../routes'); // Đi ra ngoài src/ để vào routes/

const app = express();

// Bước 3: Nạp db từ thư mục ../config/db
const db = require('../config/db'); // Đi ra ngoài src/ để vào config/

// Thực thi kết nối DB
db.connect();

const port = 3000;

// 1. CẤU HÌNH HỆ THỐNG
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Template Engine (Handlebars)
app.engine('hbs', engine({ 
    extname: '.hbs',
    helpers: {
        dateFormat: (date, format) => {
            const d = new Date(date);
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

// 2. KHỞI TẠO ROUTES
route(app);

// 3. KHỞI CHẠY MÁY CHỦ
app.listen(port, () => {
    console.log(`\n🚀 Server đang chạy thành công tại: http://localhost:${port}`);
});