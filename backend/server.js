const express = require("express");
const app = express();
const ConnectDB = require("./DB/db");
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 8090 ;
const authController = require("./Contotollers/authConctroller")


ConnectDB()

app.use(express.json())

app.use("/api", authController)

app.listen(PORT, ()=>console.log(`Server Started at ${PORT}`));