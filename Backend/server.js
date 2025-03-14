// mongo connection 
const mongoose = require("mongoose");
const chalk = require("chalk");
const routes = require("./routes/index");
const cors=require("cors")
const express = require("express");
const backend = express();

// routing 3
backend.use(express.json()); 



// CORS (Second step) 2
backend.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
)
backend.use(routes)

// mongoose connect 1
mongoose.connect("mongodb+srv://dr395108:FoPfEar405P6EmUq@cluster0.lukdk.mongodb.net/")
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = 5001;
    backend.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));