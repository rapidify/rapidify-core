const fastify = require("fastify");

const Config = require("./config");
const DbConnection = require("./database");

const {
  HOST,
  PORT,
  LOGGER_LEVEL,
  IS_NODE_ENV_LOWER,
  ORIGIN,
  HTTP_METHODS
} = new Config();

const server = fastify({
  logger: {
    level: LOGGER_LEVEL,
    enabled: IS_NODE_ENV_LOWER,
    prettyPrint: IS_NODE_ENV_LOWER
  }
});

server.register(require("fastify-cors"), {
  origin: ORIGIN,
  methods: HTTP_METHODS
});

// custom logger plugin
require("../lib/logger/logger").logger(server);

server.listen(PORT, HOST, err => {
  if (err) throw err;

  new DbConnection().connect();
});

module.exports = server;
