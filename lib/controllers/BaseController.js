class BaseController {
  sendResponse({ req, res, response }) {
    res.code(response.statusCode).send(response);
  }

  sendErrorResponse({ req, res, errResponse }) {
    res.code(errResponse.statusCode).send(errResponse);
  }
}

module.exports = BaseController;
