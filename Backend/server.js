// mongo connection establish
const mongoose = require("mongoose");
const chalk = require("chalk");
const routes = require("./routes/index");
const cors = require("cors")
require("dotenv").config()
const express = require("express");
const path = require("path")
const backend = express();

// routing 3
backend.use(express.json()); 


backend.use('/uploads', express.static(path.join(__dirname, 'Middleware/uploads')));

// CORS (Second step) 2
backend.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
)
backend.use(routes)

// mongoose connect 1
mongoose.connect(process.env.Connection_String)
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = 5000;
    backend.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));