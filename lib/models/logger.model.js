const { model } = require("mongoose");
const BaseModel = require('./BaseModel');
const { LoggerSchema } = require('../schemas/logger.schema');

class LoggerModel extends BaseModel {
    constructor() {
        super(model('log', LoggerSchema));
    }

    async createLog(req, res) {
        const reqHeaders = req.headers;
        const resHeaders = res.headers;

        const log = {
            reqId: req.id,
            ip: req.ip,
            body: req.body,
            url: req.url,
            method: req.method,
            hostName: req.hostname,
            reqHeaders,
            // resHeaders,
            LOG_LEVEL: res.LOG_LEVEL,
            HttpCode: res.statusCode,
            HttpStatusText: res.statusText || res.statusMessage,
        };

        // console.log("Log Body:", log);

        await super.create({ body: log });
    }
}

module.exports = { LoggerModel };