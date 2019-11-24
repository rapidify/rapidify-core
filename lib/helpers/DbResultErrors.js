class DB_RESULT_ERROR extends Error {
  constructor(message) {
    super(message);
  }
}

class DB_RESULT_ERROR_FAIL extends DB_RESULT_ERROR {
  constructor(message) {
    super(message);
  }
}

class DB_RESULT_ERROR_NOT_FOUND extends DB_RESULT_ERROR {
  constructor(message) {
    super(message);
  }
}

class DB_RESULT_ERROR_CONFLICT extends DB_RESULT_ERROR {
  constructor(message) {
    super(message);
  }
}

module.exports = {
  DB_RESULT_ERROR,
  DB_RESULT_ERROR_FAIL,
  DB_RESULT_ERROR_CONFLICT,
  DB_RESULT_ERROR_NOT_FOUND
};
