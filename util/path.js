const path = require("path");

// dirname() trả về tên thư mục/folder của path
// process.mainModule.filename(require.main.filename) thay thế cho path đến file cần chạy
module.exports = path.dirname(require.main.filename);
