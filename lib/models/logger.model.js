const { model } = require("mongoose");
const BaseModel = require('./BaseModel');
const { LoggerSchema } = require('../schemas/logger.schema');

class LoggerModel extends BaseModel {
    constructor() {
        super(model('log', LoggerSchema));
    }

    async createLog(req, res) {
        const log = {
            reqId: req.id,
            url: req.url,
            method: req.method,
            LoggerLevel: res.LOGGER_LEVEL,
            HttpCode: res.statusCode,
            HttpStatusText: res.statusText
        };

        await super.create(log);
    }
}