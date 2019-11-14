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
    LoggerLevel: String,
    HttpCode: Number,
    HttpStatusText: String
});

module.exports = { LoggerSchema };