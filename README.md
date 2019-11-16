# The MedicSoft (WebApi Framework)

Going forward this framework will be used in making Web API(s).
This framework follows DRY approach and, has BaseModel class to perform any CRUD operation against DB.

## Project Dev Dependencies

Developer has to install following dev dependencies

- cross-env
- dotenv
- nodemon

## Framework Dependencies

This framework uses following dependencies

- fastify, web server framework
- mongoose, (ODM) Object Document Mapper
- Pino & Pino Pretty, to pretty print logs to console

### Running Seeders

- Make directory src/seeders
- If seeders doesn't exists under the src/seeders dir then, update location in .env for var ROOT_SEEDER_DIR
- Inherit BaseSeeder from framework
- Add following keys in scripts:
  - "seed:run": "cross-env SEED_OPTION=run node node_modules/@the-medicsoft/webapi-framework/lib/seeders/seeder.js",
  - "seed:drop": "cross-env SEED_OPTION=drop node node_modules/@the-medicsoft/webapi-framework/lib/seeders/seeder.js"
