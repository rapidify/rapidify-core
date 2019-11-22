class BaseConfig {
  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.IS_NODE_ENV_LOWER = this.isNodeEnvLower();

    if (this.IS_NODE_ENV_LOWER) {
      require("dotenv").config();
    }

    this.HOST = process.env.HOST || "0.0.0.0";
    this.PORT = process.env.PORT || 9000;
    this.ORIGIN = process.env.ORIGIN || "*";
    this.HTTP_METHODS =
      process.env.HTTP_METHODS || "GET, PATCH, POST, DELETE, OPTIONS";
    this.LOGGER_LEVEL = process.env.LOGGER_LEVEL || "info";
    this.ROOT_SEEDER_DIR = process.env.ROOT_SEEDER_DIR || "/src/seeders";
    this.MONGO_DB = process.env.MONGO_DB;
    this.MONGO_DB_URL = process.env.MONGO_DB_URL;
    this.MONGO_DB_USER = process.env.MONGO_DB_USER;
    this.MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;
    this.DB_RESULTSET_FILTER =
      process.env.DB_RESULTSET_FILTER || "-_id -__v -password";
  }

  isNodeEnvLower() {
    const envs = {
      dev: "development",
      qa: "testing",
      stage: "staging"
    };

    for (let kenv in envs) {
      if (envs[kenv] === this.NODE_ENV) {
        return envs[kenv] === this.NODE_ENV;
      }
    }
  }
}

module.exports = BaseConfig;
