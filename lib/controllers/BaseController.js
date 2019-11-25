const { HttpCode, HTTPResult } = require('../helpers');

class BaseController {
  constructor({ Model }) {
    this.Model = Model;
  }

  async get(req, res) {
    try {
      const data = await this.Model.read();

      const httpResult = new HTTPResult({
        data,
        total: data.length
      });

      res.code(HttpCode[200].code).send(httpResult);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseController;
