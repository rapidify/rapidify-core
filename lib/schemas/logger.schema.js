const { Schema } = require("mongoose");

const LoggerSchema = new Schema({
    reqId: String,
    ip: String,
    reqHeaders: Object,
    resHeaders: String,
    hostName: String,
    url: String,
    method: String,
    body: Object,
    time: Date,
    logLevel: String,
    httpCode: Number,
    httpStatusText: String
});

module.exports = { LoggerSchema };