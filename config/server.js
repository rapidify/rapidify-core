const fastify = require('fastify');

const Config = require('./config');
const DbConfig = require('./database');

const { HOST, PORT, LOGGER_LEVEL, IS_NODE_ENV_LOWER, ORIGIN } = new Config();

const server = fastify({
    logger: {
        level: LOGGER_LEVEL,
        enabled: IS_NODE_ENV_LOWER,
        prettyPrint: IS_NODE_ENV_LOWER
    }
});

server.get('/', (req, reply) => {
    reply.send(`GET http://${HOST}:${PORT}/`);
});

server.listen(PORT, HOST, (err) => {
    if (err) throw err;

    new DbConfig().connect();
});

module.exports = server;