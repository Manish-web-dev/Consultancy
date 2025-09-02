 import express from "express";
import config from "./config/config.js";
import bodyParser from "body-parser";
import connectDB from "./config/database.js";
 
const app = express();
app.use(bodyParser.json());

connectDB();

app.get("/", (req, res) => {
  res.json({
    name: config.name,
    port: config.port,
    status: "Running...",
    version: config.version,
  });
});

 

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port} in the version ${config.version} ....`);
});