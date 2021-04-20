const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../DB/config");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.userPath = "/api/user";
    // Database connection
    this.databaseConnection();
    // Middlewares
    this.middlewares();
    // Application routes
    this.routes();
  }

  async databaseConnection() {
    await dbConnection();
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
