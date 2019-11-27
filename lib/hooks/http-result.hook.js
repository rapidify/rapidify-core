const {
  HttpCode,
  LogLevel,
  HTTPResult,
  DbResultErrors
} = require('../utils');

module.exports = fastify => {
  // on-send hook: response decorator
  fastify.addHook('onSend', (req, res, payload, done) => {
    const newPayload = new HTTPResult(JSON.parse(payload));

    if (
      res.statusCode === HttpCode[200].code ||
      res.statusCode === HttpCode[201].code
    ) {
      newPayload.success = true;
    } else {
      newPayload.success = false;
      newPayload.logLevel = LogLevel.ERROR;
    }

    newPayload.statusCode = HttpCode[res.statusCode].code;
    newPayload.statusText = HttpCode[res.statusCode].statusText;
    newPayload.message = newPayload.message || newPayload.statusText;

    done(null, JSON.stringify(newPayload));
  });

  // global exception handler
  fastify.addHook('onError', (req, res, error, done) => {
    if (error instanceof DbResultErrors.DB_RESULT_ERROR_CONFLICT) {
      res.statusCode = HttpCode[409].code;
    } else if (error instanceof DbResultErrors.DB_RESULT_ERROR_NOT_FOUND) {
      res.statusCode = HttpCode[404].code;
    }

    done();
  });
};
