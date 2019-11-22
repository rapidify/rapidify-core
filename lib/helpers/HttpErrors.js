class HTTP_ERROR extends Error {
    constructor(message) {
        super(message);
    }
}

class HTTP_ERROR_NOT_FOUND extends HTTP_ERROR {
    constructor(message) {
        super(message);
    }
}

class HTTP_ERROR_CONFLICT extends HTTP_ERROR {
    constructor(message) {
        super(message);
    }
}

class HTTP_ERROR_INTERNAL_SERVER_ERROR extends HTTP_ERROR {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    HTTP_ERROR,
    HTTP_ERROR_CONFLICT,
    HTTP_ERROR_NOT_FOUND,
    HTTP_ERROR_INTERNAL_SERVER_ERROR
}