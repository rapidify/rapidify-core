const fastify = require("fastify");

const BaseConfig = require("./config");
const DbConnection = require("./database");

const {
  HOST,
  PORT,
  LOGGER_LEVEL,
  IS_NODE_ENV_LOWER,
  ORIGIN,
  HTTP_METHODS
} = new BaseConfig();

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

// HTTP Response Decorator
require('../lib/hooks/http-result.hook')(server);

server.listen(PORT, HOST, err => {
  if (err) throw err;

  new DbConnection().connect();
});

module.exports = server;
