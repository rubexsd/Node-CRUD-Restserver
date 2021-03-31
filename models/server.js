const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    // Middlewares
    this.middlewares();
    // Application routes
    this.routes();
  }
  middlewares() {
    //cors
    this.app.use(cors());

    // Body's parese and read
    this.app.use(express.json());

    // Public directory
    this.app.use(express.static("public"));
  }
  routes() {
    this.app.use(this.userPath, require("../routes/user"));
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server starter on port ${this.port}`);
    });
  }
}

module.exports = Server;
