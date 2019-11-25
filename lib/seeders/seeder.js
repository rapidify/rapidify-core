const fs = require('fs');
const path = require('path');

const { BaseConfig } = require('../../config');

class BaseSeeder {
  async run() {
    try {
      const listOfSeeders = requireSeeders();

      for (const Seeder of listOfSeeders) {
        const seedObj = new Seeder();

        if (isRunExists(seedObj)) {
          await seedObj.run();
        }
      }

      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  async drop() {
    try {
      const listOfSeeders = requireSeeders();

      for (const Seeder of listOfSeeders) {
        const seedObj = new Seeder();

        if (isDropExists(seedObj)) {
          await seedObj.drop();
        }
      }

      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

module.exports = BaseSeeder;

// start running seeder from this point
runner(process.env.SEED_OPTION);

async function runner(args) {
  switch (args) {
    case 'run':
      await new BaseSeeder().run();
      break;
    case 'drop':
      await new BaseSeeder().drop();
      break;
    default:
      console.log('Please Pass SEED_OPTION Env Var. either to run or, drop');
      process.exit(0);
  }
}

function isRunExists(seedObj) {
  return Reflect.has(seedObj, 'run');
}

function isDropExists(seedObj) {
  return Reflect.has(seedObj, 'drop');
}

function instanceofBaseSeeder(seedObj) {
  const instanceofBaseSeeder = seedObj instanceof BaseSeeder;

  if (!instanceofBaseSeeder) {
    console.log('Seeder Object Not an instance of BaseSeeder \'', seedObj, '\'');
    throw new Error();
  }

  return true;
}

function resolvePathToRootSeeders() {
  return path.join(process.cwd(), new BaseConfig().ROOT_SEEDER_DIR);
}

function requireSeeders() {
  // Read User-defined seeder-files from project-root/src/seeders
  const projRootSeedersDir = resolvePathToRootSeeders();

  const readFileNamesFromDir = fs
      .readdirSync(projRootSeedersDir)
      .filter(fileName => fileName.includes('.seeder.js'));

  console.log(readFileNamesFromDir);

  const readFilesFromDir = [];

  for (const fileName of readFileNamesFromDir) {
    readFilesFromDir.push(
        eval(
            fs.readFileSync(`${projRootSeedersDir}/${fileName}`, {
              encoding: 'utf8'
            })
        )
    );
  }

  // validate seeder instanceof BaseSeeder
  for (const Seeder of readFilesFromDir) {
    instanceofBaseSeeder(new Seeder());
  }

  return readFilesFromDir;
}
