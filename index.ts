import http from "node:http";
import path from "node:path";
import routes from "./src/routes";
import express from "express";
import morgan from "morgan";
import { sequelize as database } from "./src/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3333;
const host = process.env.HOST;

//Basic setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(routes);

//Static files
app.use(express.static(path.join(__dirname, "./public")));

//View engine
app.set("views", path.join(__dirname, "./src/views"));
app.set("view engine", "ejs");

//Turn on the server
server.listen("3333", async () => {
  try {
    await database.sync();
  } catch (error) {
    console.log("error: " + error);
  }
  console.log(`server running on ${host}:${port}`);
});