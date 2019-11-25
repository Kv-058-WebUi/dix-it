import express from "express";
import http from "http";
import path from "path";

// Express app initialization
const app = express();

// Template configuration
app.set("view engine", "ejs");
app.set("views", "public");

// Static files configuration
app.use("/assets", express.static(path.join(__dirname, "frontend")));

// Controllers
app.get("/*", (req, res) => {
    res.render("index");
});

// Start function
// export const start = (port: number): Promise<void> => {
//     const server = http.createServer(app);

//     return new Promise<void>((resolve, reject) => {
//         server.listen(port, resolve);
//     });
// };

export const start = (port: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const server = app.listen(process.env.PORT || 5001, function() {
      console.log(`Listening on port ${process.env.PORT} 8000`);
    });
  });
};

