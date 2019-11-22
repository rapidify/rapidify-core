const { HttpCode } = require("../helpers");

class BaseController {
  success({ req, res, total, data, message }) {
    res
      .code(HttpCode[200].code)
      .send({
        total: total,
        data: data,
        message: message || HttpCode[200].statusText
      });
  }

  created({ req, res, total, data, message }) {
    res
      .code(HttpCode[201].code)
      .send({
        total: total,
        data: data,
        message: message || HttpCode[201].statusText
      });
  }

  notFound({ req, res, message }) {
    res
      .code(HttpCode[404].code)
      .send({
        total: undefined,
        data: undefined,
        message: message || HttpCode[404].statusText
      });
  }

  conflict({ req, res, message }) {
    res
      .code(HttpCode[409].code)
      .send({
        total: undefined,
        data: undefined,
        message: message || HttpCode[409].statusText
      });
  }

  fail({ req, res, message }) {
    res
      .code(HttpCode[500].code)
      .send({
        total: undefined,
        data: undefined,
        message: message || HttpCode[500].statusText
      });
  }
}

module.exports = BaseController;
