# Rapidify Core (Web API Framework)

This framework is built using fastify an efficient web server offering some features like Route Schemas, Hooks to alter Request-Response lifecycle. But, one thing is always missing "A Proper Web API Project structure".

This framework is here to solve that. Follows DRY approach, offers BaseController and, BaseModel Classes doing there respective works so that you don't have to.

## Project Dev Dependencies

Developer has to install following dev dependencies

- cross-env
- dotenv
- nodemon

## Framework Dependencies

This framework uses following dependencies

- Fastify, web server framework
- mongoose, (ODM) Object Document Mapper
- Pino & Pino Pretty, to pretty print logs to console

### Running Seeders

- Make directory src/seeders
- If seeders doesn't exists under the src/seeders dir then, update location in .env for var ROOT_SEEDER_DIR
- Inherit BaseSeeder from framework
- Add following keys in scripts:
  - "seed:run": "cross-env SEED_OPTION=run node node_modules/@the-medicsoft/webapi-framework/lib/seeders/seeder.js",
  - "seed:drop": "cross-env SEED_OPTION=drop node node_modules/@the-medicsoft/webapi-framework/lib/seeders/seeder.js"
