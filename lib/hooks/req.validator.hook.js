const Ajv = require('ajv');

const { reqUpdateSchema } = require('../utils').routeSchemas;

module.exports = fastify => {
    fastify.addHook("preHandler", (req, res, done) => {
        // preHandler hook to validate incoming update (PUT/PATCH) HTTP Requests
        if (req.raw.method.toLowerCase() === 'put' || req.raw.method.toLowerCase() === 'patch') {
            const ajv = new Ajv({
                allErrors: true
            });

            const valid = ajv.validate(reqUpdateSchema, req.body);

            const errors = [];

            if (ajv.errors) {
                for (let error of ajv.errors) {
                    const message = error.dataPath === '' ? `body ${error.message}` : `${error.dataPath.replace('.', '')} ${error.message}`;
                    errors.push(message);
                }
            }

            if (!valid) {
                res.code(500).send({ message: errors.toString() });
            }
        }

        done();
    });
};