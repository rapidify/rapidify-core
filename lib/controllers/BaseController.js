const { HttpCode, HTTPResult } = require('../utils');

class BaseController {
  constructor({ Model }) {
    this.Model = Model;
  }

  async get(req, res) {
    try {
      let data = undefined;

      if (Object.keys(req.query).length) {
        data = await this.Model.readByQuery({ query: req.query });
      } else {
        data = await this.Model.read();
      }

      const httpResult = new HTTPResult({
        data,
        total: data.length
      });

      res.code(HttpCode[200].code).send(httpResult);
    } catch (error) {
      throw error;
    }
  }

  async create(req, res) {
    try {
      let data = await this.Model.create({ body: req.body });

      if (data) {
        const httpResult = new HTTPResult({
          data,
          total: data.length
        });

        res.code(HttpCode[201].code).send(httpResult);
      }
    } catch (error) {
      throw error;
    }
  }

  async update(req, res) {
    try {
      let data = await this.Model.update({ id: req.body.id, body: req.body });

      if (data) {
        res.code(HttpCode[200].code).send({});
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(req, res) {
    try {
      let data = await this.Model.delete({ useSoftDelete: false, deleteDoc: req.body });

      if (data) {
        res.code(HttpCode[200].code).send({});
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseController;
