const Ajv = require('ajv');
const { find } = require('lodash');

const { reqUpdateSchema } = require('../utils').routeSchemas;

module.exports = fastify => {
  fastify.addHook('preHandler', (req, res, done) => {
    // preHandler hook to validate incoming update (PUT/PATCH) HTTP Requests
    const reqHTTPMethod = find(req, 'method').method.toLowerCase();

    if (reqHTTPMethod === 'put' || reqHTTPMethod === 'patch') {
      const ajv = new Ajv({
        allErrors: true
      });

      const valid = ajv.validate(reqUpdateSchema, req.body);

      const errors = [];

      if (ajv.errors) {
        for (const error of ajv.errors) {
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
