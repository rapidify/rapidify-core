class Config {
    constructor() {
        this.NODE_ENV = process.env.NODE_ENV || 'development';
        this.IS_NODE_ENV_LOWER = this.isNodeEnvLower();

        if (this.IS_NODE_ENV_LOWER) {
            require('dotenv').config();
        }

        this.HOST = process.env.HOST || '0.0.0.0';
        this.PORT = process.env.PORT || 9000;
        this.ORIGIN = process.env.ORIGIN || '*';
        this.LOGGER_LEVEL = process.env.LOGGER_LEVEL || 'info';
        this.BASE_API_ROUTE = process.env.BASE_API_ROUTE || '/api';
        this.MONGO_DB = process.env.MONGO_DB;
        this.MONGO_DB_URL = process.env.MONGO_DB_URL;
        this.MONGO_DB_USER = process.env.MONGO_DB_USER;
        this.MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
    }

    isNodeEnvLower() {
        const envs = {
            dev: 'development',
            qa: 'testing',
            stage: 'staging'
        };

        for (let kenv in envs) {
            return envs[kenv] === this.NODE_ENV;
        }
    }
}

module.exports = Config;