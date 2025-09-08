
// const fs = require("fs");
// const path = require("path");

// const date = new Date().toLocaleDateString("en-GB", {
//   day: "2-digit",
//   month: "2-digit",
//   year: "numeric",
// }).replaceAll("/", "-");

// const logsDirectory = path.join(__dirname, "..", "..", "logs");


// // Ensure logs directory exists
// if (!fs.existsSync(logsDirectory)) {
//   fs.mkdirSync(logsDirectory, { recursive: true });
// }

// const logErrorToFile = (error) => {
//   const logPath = path.join(logsDirectory, `${date}-errors.log`);
//   const errorLog = `[${new Date().toISOString()}] ${error.stack || error.message}\n`;

//   // Append to file (creates file if not existing)
//   fs.appendFileSync(logPath, errorLog, "utf8");
// };

// module.exports = logErrorToFile;


const fs = require("fs");
const path = require("path");

// Pick log directory depending on environment
const logsDirectory =
  process.env.NODE_ENV === "production"
    ? "/tmp/logs" // ✅ Only writable folder in Lambda/Vercel
    : path.join(__dirname, "..", "..", "logs");

// Ensure logs directory exists (only if writable)
if (logsDirectory !== "/tmp/logs" || process.env.NODE_ENV !== "production") {
  if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory, { recursive: true });
  }
}

const date = new Date()
  .toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
  .replaceAll("/", "-");

const logErrorToFile = (error) => {
  try {
    const logPath = path.join(logsDirectory, `${date}-errors.log`);
    const errorLog = `[${new Date().toISOString()}] ${
      error.stack || error.message || error
    }\n`;

    fs.appendFileSync(logPath, errorLog, "utf8");
  } catch (err) {
    // Fallback: log to console if file writing fails
    console.error("Failed to write log file:", err);
    console.error(error);
  }
};

module.exports = logErrorToFile;
