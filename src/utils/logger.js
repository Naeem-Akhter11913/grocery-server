
const fs = require("fs");
const path = require("path");

const date = new Date().toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
}).replaceAll("/", "-");

const logsDirectory = path.join(__dirname, "..", "..", "logs");


// Ensure logs directory exists
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory, { recursive: true });
}

const logErrorToFile = (error) => {
  const logPath = path.join(logsDirectory, `${date}-errors.log`);
  const errorLog = `[${new Date().toISOString()}] ${error.stack || error.message}\n`;

  // Append to file (creates file if not existing)
  fs.appendFileSync(logPath, errorLog, "utf8");
};

module.exports = logErrorToFile;
