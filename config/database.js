const mongoose = require('mongoose');
const Config = require('./config');

class DbConnection {
    constructor() {
        this.config = new Config();
        this.MONGO_DB = this.config.MONGO_DB;
        this.MONGO_DB_USER = this.config.MONGO_DB_USER;
        this.MONGO_DB_URL = this.config.MONGO_DB_URL;
        this.MONGO_DB_PASSWORD = this.config.MONGO_DB_PASSWORD;
    }

    async connect() {
        try {
            mongoose.set("user", this.MONGO_DB_USER);
            mongoose.set("password", this.MONGO_DB_PASSWORD);

            mongoose.set("useNewUrlParser", true);
            mongoose.set("useFindAndModify", false);
            mongoose.set("useUnifiedTopology", true);

            await mongoose.connect(this.MONGO_DB_URL);

            console.log('Connected to Mongo');
        } catch (err) {
            throw err;
        }
    }
}

module.exports = DbConnection;