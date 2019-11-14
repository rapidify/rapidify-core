const fs = require('fs');
const path = require('path');

const Config = require('../../config/config');

class Seeder {
    async runner(args) {
        switch (args) {
            case 'run':
                this.run();
                break;
            case 'drop':
                this.drop();
                break;
            default:
                console.log("Please Pass SEED_OPTION Env Var. either to run or, drop");
                process.exit(0);
        }
    }

    async run() {
        const listOfSeeders = this.requireSeeders();

        for (let seeder of listOfSeeders) {
            let seedObj = new seeder();

            if (this.isRunExists(seedObj)) {
                seedObj.run();
            }
        }

        process.exit(0);
    }

    async drop() {
        const listOfSeeders = this.requireSeeders();

        for (let seeder of listOfSeeders) {
            let seedObj = new seeder();

            if (this.isDropExists(seedObj)) {
                seedObj.drop();
            }
        }

        process.exit(0);
    }

    isRunExists(seedObj) {
        return Reflect.get(seedObj, 'run');
    }

    isDropExists(obj) {
        return Reflect.get(obj, 'drop');
    }

    resolvePathToRootSeeders() {
        return path.join(process.cwd(), new Config().ROOT_SEEDER_DIR);
    }

    requireSeeders() {
        // Read User-defined seeder-files from project-root/src/seeders
        const projRootSeedersDir = this.resolvePathToRootSeeders();

        const readFileNamesFromDir = fs.readdirSync(projRootSeedersDir);

        const readFilesFromDir = [];

        for (let fileName of readFileNamesFromDir) {
            readFilesFromDir.push(eval(fs.readFileSync(`${projRootSeedersDir}\\${fileName}`, { encoding: 'utf8' })));
        }

        return readFilesFromDir;
    }
}

new Seeder().runner(process.env.SEED_OPTION);