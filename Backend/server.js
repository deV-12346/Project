// mongo connection establish
const mongoose = require("mongoose");
const chalk = require("chalk");
const routes = require("./routes/index");
const cors = require("cors")
require("dotenv").config()
const express = require("express");
const path = require("path")
const backend = express();
const createdefaultadmin = require("./controllers/Auth/DefaultAdmin")
const startKeepAlive = require("./Utils/KeepAlive")
// routing 3
backend.use(express.json()); 


backend.use('/uploads', express.static(path.join(__dirname, 'Middleware/uploads')));

// CORS (Second step) 2
backend.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
)
// lightweight health check used by the keep-alive cron (no DB access)
backend.get("/health", (req, res) => res.status(200).send("OK"))
backend.use(routes)

// mongoose connect 1
mongoose.connect(process.env.Connection_String)
   .then(async () => {
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`);
    await createdefaultadmin();
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    backend.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
      // keep Render instance awake
      startKeepAlive();
    });
  })
  .catch((err) => console.log(err));