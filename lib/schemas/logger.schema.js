const { Schema } = require("mongoose");

const LoggerSchema = new Schema({
    reqId: String,
    url: String,
    method: String,
    time: Date,
    LoggerLevel: String,
    HttpCode: Number,
    HttpStatusText: String
});

module.exports = { LoggerSchema };