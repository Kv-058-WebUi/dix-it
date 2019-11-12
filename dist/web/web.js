"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
// Express app initialization
const app = express_1.default();
// Template configuration
app.set("view engine", "ejs");
app.set("views", "public");
// Static files configuration
app.use("/assets", express_1.default.static(path_1.default.join(__dirname, "frontend")));
// Controllers
app.get("/*", (req, res) => {
    res.render("index");
});
// Start function
exports.start = (port) => {
    const server = http_1.default.createServer(app);
    return new Promise((resolve, reject) => {
        server.listen(port, resolve);
    });
};
//# sourceMappingURL=web.js.map