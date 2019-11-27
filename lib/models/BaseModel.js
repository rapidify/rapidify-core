const BaseConfig = require('../../config/config');
const { DbResultErrors } = require('../utils');

class BaseModel {
  constructor({ Model }) {
    this.Model = Model;
    this.filter = BaseConfig.DB_RESULTSET_FILTER;
  }

  async create({ body }) {
    const resource = new this.Model(body);
    return await this.Model.create(resource);
  }

  async read() {
    const data = await this.Model.find({}, this.filter);

    if (data.length) {
      return data;
    } else {
      throw new DbResultErrors.DB_RESULT_ERROR_NOT_FOUND();
    }
  }

  async readByQuery({ query }) {
    return await this.Model.find(query, this.filter);
  }

  async update({ id, body }) {
    const doc = await this.Model.findById(id);

    return await this.Model.findOneAndUpdate({ _id: doc._id }, body);
  }

  async delete({ useSoftDelete, deleteDoc }) {
    const isExists = await this.Model.findOne(deleteDoc);

    if (isExists) {
      if (!useSoftDelete) {
        return await this.Model.findOneAndDelete(deleteDoc);
      }

      return await this.Model.findOneAndUpdate(deleteDoc);
    } else {
      throw new DbResultErrors.DB_RESULT_ERROR_NOT_FOUND();
    }
  }
}

module.exports = BaseModel;
