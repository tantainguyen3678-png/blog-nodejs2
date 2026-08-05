// 1. Load dotenv ĐẦU TIÊN để tránh lỗi process.env bị undefined ở các file require phía dưới
require('dotenv').config(); 

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

// 2. Import routes và db (lúc này process.env đã sẵn sàng)
const route = require('../routes'); 
const db = require('../config/db'); 

const app = express();

// Kết nối CSDL
db.connect();

// Cấu hình Port linh hoạt
const port = process.env.PORT || 3000;

// 3. MIDDLEWARE
// Lưu ý: Adjust đường dẫn static tùy thuộc vào vị trí thực tế của thư mục public
app.use(express.static(path.join(__dirname, '../public'))); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// 4. TEMPLATE ENGINE
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
app.set('views', path.join(__dirname, 'views')); // Hoặc path.join(__dirname, '../views') nếu views ở thư mục gốc

// 5. ROUTES
route(app);

// 6. KHỞI CHẠY SERVER
app.listen(port, () => {
    console.log(`\n🚀 Server đang chạy thành công tại: http://localhost:${port}`);
});