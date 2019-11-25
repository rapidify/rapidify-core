class HTTPResult {
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

module.exports = HTTPResult;
