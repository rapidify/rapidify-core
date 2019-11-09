const chalk = require("chalk");
const { HttpCode } = require("../helpers");

const LOG_LEVEL = {
  DEBUG: "DEBUG",
  ERROR: "ERROR",
  FATAL: "FATAL",
  INFO: "INFO",
  TRACE: "TRACE",
  WARN: "WARN"
};

exports.logger = server => {
  requestLogger(server);
  responseLogger(server);
};

function requestLogger(server) {
  server.addHook("onRequest", (req, res, done) => {
    console.log(chalk.white("Request Logger Working!"));

    done();
  });
}

function responseLogger(server) {
  server.addHook("onResponse", (req, res, done) => {
    console.log(chalk.white("Response Logger Working!"));

    done();
  });
}
