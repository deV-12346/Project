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
const { globalErrorHandler, notFoundHandler } = require("./Middleware/errorMiddleware");

// Body parser middleware
backend.use(express.json()); 

// Static files
backend.use('/uploads', express.static(path.join(__dirname, 'Middleware/uploads')));

// CORS configuration
backend.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
)

// Lightweight health check (no DB access)
backend.get("/health", (req, res) => res.status(200).send("OK"))

// API Routes
backend.use(routes)

// 404 Handler - Must be after all routes
backend.use(notFoundHandler);

// Global Error Handler - Must be last middleware
backend.use(globalErrorHandler);

// MongoDB connection
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
      console.log(`${chalk.yellow("⚙")} ${chalk.blue("Environment:")} ${chalk.bgCyan.white(process.env.NODE_ENV || 'development')}`);
      // keep Render instance awake
      startKeepAlive();
    });
  })
  .catch((err) => {
    console.error(`${chalk.red("✗")} ${chalk.red("MongoDB Connection Failed:")}`);
    console.error(err);
    process.exit(1);
  });