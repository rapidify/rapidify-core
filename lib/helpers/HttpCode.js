class HttpCode {
  constructor({ code, statusText }) {
    this.code = code;
    this.statusText = statusText;
    // todo: add logger_level prop
  }
}

module.exports = {
  200: new HttpCode({ code: 200, statusText: "OK" }),
  201: new HttpCode({ code: 201, statusText: "Created" }),
  400: new HttpCode({ code: 400, statusText: "Bad Request" }),
  401: new HttpCode({ code: 401, statusText: "Unauthorized" }),
  403: new HttpCode({ code: 403, statusText: "Forbidden" }),
  404: new HttpCode({ code: 404, statusText: "Not Found" }),
  409: new HttpCode({ code: 409, statusText: "Conflict" }),
  500: new HttpCode({ code: 500, statusText: "Internal Server Error" })
};
