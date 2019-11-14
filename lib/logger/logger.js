const { HttpCode } = require('../helpers');
const { LoggerModel } = require('../models/logger.model');

exports.LOG_LEVEL = {
  ERROR: "ERROR",
  FATAL: "FATAL",
  WARN: "WARN", //Put top 3 into DB
  DEBUG: "DEBUG",
  INFO: "INFO",
  TRACE: "TRACE",
};

exports.logger = server => {
  requestLogger(server);
  responseLogger(server);
};

function requestLogger(server) {
  server.addHook("onRequest", (req, res, done) => {
    done();
  });
}

async function responseLogger(server) {
  server.addHook("onResponse", async (req, res) => {
    // log only those requests & responses for which Server/DB throws Error
    if (res.statusCode !== HttpCode[200].code || res.statusCode !== HttpCode[201].code) {
      const logger = new LoggerModel();

      await logger.createLog(req, res);
    }
  });
}
