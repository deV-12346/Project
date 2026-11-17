const cron = require("node-cron");
const axios = require("axios");
const chalk = require("chalk");

// Render's free tier spins a service down after 15 minutes without inbound
// traffic. Pinging our own public URL every 14 minutes keeps it awake.
//
// Render sets RENDER_EXTERNAL_URL automatically (e.g. https://my-app.onrender.com).
// You can override it with SELF_URL if needed.
const startKeepAlive = () => {
  const url = process.env.SELF_URL || process.env.RENDER_EXTERNAL_URL;

  if (!url) {
    console.log(
      `${chalk.yellow("!")} ${chalk.blue(
        "Keep-alive cron skipped (no RENDER_EXTERNAL_URL / SELF_URL set)"
      )}`
    );
    return;
  }

  const target = `${url.replace(/\/$/, "")}/health`;

  cron.schedule("*/14 * * * *", async () => {
    try {
      const res = await axios.get(target, { timeout: 30000 });
      console.log(
        `${chalk.green("✓")} Keep-alive ping ${target} -> ${res.status} at ${new Date().toISOString()}`
      );
    } catch (err) {
      console.log(
        `${chalk.red("✗")} Keep-alive ping failed: ${err.message}`
      );
    }
  });

  console.log(
    `${chalk.green("✓")} ${chalk.blue("Keep-alive cron scheduled (every 14 min) ->")} ${target}`
  );
};

module.exports = startKeepAlive;
