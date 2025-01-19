const fs = require("fs");
const path = require("path");

const toISOString = new Date().toISOString();
const dateOnly = toISOString.split('T')[0]
const date = dateOnly.split('-').reverse().join('-');


const logsDirectory = path.join(__dirname, "..", "..", "logs");
if(!fs.existsSync(logsDirectory)){
    return fs.mkdirSync(logsDirectory)
}

const logErrorToFile = (error) => {
    const logPath = path.join(logsDirectory, `${date}-errors.log`);
    const errorLog = `[${new Date().toISOString()}] ${error.stack || error.message}\n`;
    fs.appendFileSync(logPath, errorLog, "utf8");
  };
module.exports = logErrorToFile;