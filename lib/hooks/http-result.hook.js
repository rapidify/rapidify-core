const { HttpCode, LogLevel, HTTPResult } = require('../helpers');

module.exports = (fastify) => {
  // on-send hook: response decorator
  fastify.addHook("onSend", (req, res, payload, done) => {
    const newPayload = new HTTPResult(JSON.parse(payload));

    if (res.statusCode === HttpCode[200].code || res.statusCode === HttpCode[201].code) {
      newPayload.success = true;
    } else {
      newPayload.success = false;
      newPayload.logLevel = LogLevel.ERROR;
    }

    newPayload.statusCode = HttpCode[res.statusCode].code;
    newPayload.statusText = HttpCode[res.statusCode].statusText;

    done(null, JSON.stringify(newPayload));
  });
}