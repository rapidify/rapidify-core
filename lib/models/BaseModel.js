const { HttpCode, LogLevel } = require("../helpers");
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

  success({ total, data, message } = {}) {
    return DbResult({
      isSuccess: true,
      statusCode: HttpCode[200].code,
      statusText: HttpCode[200].statusText,
      total: total,
      data: data,
      message: message || HttpCode[200].statusText
    });
  }

  created({ total, data, message } = {}) {
    return DbResult({
      isSuccess: true,
      statusCode: HttpCode[201].code,
      statusText: HttpCode[201].statusText,
      total: total,
      data: data,
      message: message || HttpCode[201].statusText
    });
  }

  notFound({ message } = {}) {
    throw DbResult({
      isSuccess: false,
      statusCode: HttpCode[404].code,
      statusText: HttpCode[404].statusText,
      logLevel: LogLevel.ERROR,
      total: undefined,
      data: undefined,
      message: message || HttpCode[404].statusText
    });
  }

  conflict({ message } = {}) {
    throw DbResult({
      isSuccess: false,
      statusCode: HttpCode[409].code,
      statusText: HttpCode[409].statusText,
      logLevel: LogLevel.ERROR,
      total: undefined,
      data: undefined,
      message: message || HttpCode[409].statusText
    });
  }

  fail({ message } = {}) {
    throw DbResult({
      isSuccess: false,
      statusCode: HttpCode[500].code,
      statusText: HttpCode[500].statusText,
      logLevel: LogLevel.ERROR,
      total: undefined,
      data: undefined,
      message: message || HttpCode[500].statusText
    });
  }
}

function DbResult({
  isSuccess,
  statusCode,
  statusText,
  logLevel,
  total,
  data,
  message
}) {
  class DbResult {
    success;
    statusCode;
    statusText;
    logLevel;
    total;
    data;
    message;

    constructor({
      isSuccess,
      statusCode,
      statusText,
      logLevel,
      total,
      data,
      message
    }) {
      this.success = isSuccess;
      this.statusCode = statusCode;
      this.statusText = statusText;
      this.logLevel = logLevel;
      this.total = total;
      this.data = data;
      this.message = message;
    }
  }

  return Object.freeze(
    new DbResult({
      isSuccess,
      statusCode,
      statusText,
      logLevel,
      total,
      data,
      message
    })
  );
}

module.exports = BaseModel;
