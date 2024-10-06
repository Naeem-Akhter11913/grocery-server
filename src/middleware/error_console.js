const fs = require("fs");
const path = require("path");

const saveError = async (error, req, res, next) => {
  const errorLogsDir = "./error_logs";
  if (!fs.existsSync(errorLogsDir)) {
    fs.mkdirSync(errorLogsDir);
  }

  // Get the current date to create a unique log file for the day
  const currentDate = new Date();
  const logFileName = `log_${currentDate.toISOString().slice(0, 10)}.txt`;
  const logFilePath = path.join(errorLogsDir, logFileName);

  // Extract line number from the stack trace
  const stackTrace = error.stack || "";
  // console.log(stackTrace)
  // const lineNumber = stackTrace.split('\n')[1].trim().replace(/^at .*?:(\d+).*$/, '$1');

  // Append the route information and line number to the log entry
  let logEntry = "";
  if (req) {
    logEntry = `${currentDate.toISOString()}\nRoute: ${req.method} ${
      req.path
    }\nError: ${error.message}\nStack Trace: ${stackTrace}\n\n`;
  } else {
    logEntry = `${currentDate.toISOString()}\nError: ${
      error.message
    }\nStack Trace: ${stackTrace}\n\n`;
  }

  // Append the log entry to the log file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error appending to log file:", err);
    } else {
      console.log("Log entry appended to", logFilePath);
    }
  });

  if (res && res !== undefined) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { saveError };