const BaseConfig = require("../../config/config");

class BaseModel {
  filter;
  Model;

  constructor(model) {
    this.Model = model;
    this.filter = new BaseConfig().DB_RESULTSET_FILTER;
  }

  async create({ body }) {
    const resource = new this.Model(body);
    return await this.Model.create(resource);
  }

  async read() {
    return await this.Model.find({}, this.filter);
  }

  async readByQuery({ query }) {
    return await this.Model.find(query, this.filter);
  }

  async update({ id, body }) {
    const doc = await this.Model.findById(id);

    return await this.Model.findOneAndUpdate({ _id: doc._id }, body);
  }

  async delete({ id, useSoftDelete, deleteDoc }) {
    const doc = await this.Model.findById(id);

    if (useSoftDelete === false) {
      return await this.Model.findOneAndDelete({ _id: doc._id });
    }

    return await this.Model.findOneAndUpdate({ _id: doc._id }, deleteDoc);
  }
}

module.exports = BaseModel;
