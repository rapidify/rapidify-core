const mongoose = require('mongoose');
const BaseConfig = require('./config');

class DbConnection {
  constructor() {
    this.config = new BaseConfig();
    this.MONGO_DB = this.config.MONGO_DB;
    this.MONGO_DB_USER = this.config.MONGO_DB_USER;
    this.MONGO_DB_URL = this.config.MONGO_DB_URL;
    this.MONGO_DB_PASSWORD = this.config.MONGO_DB_PASSWORD;
  }

  async connect() {
    try {
      // mongoose.set('user', this.MONGO_DB_USER);
      // mongoose.set('password', this.MONGO_DB_PASSWORD);

      mongoose.set('useNewUrlParser', true);
      mongoose.set('useFindAndModify', false);
      mongoose.set('useUnifiedTopology', true);

      if (this.MONGO_DB_URL) {
        await mongoose.connect(this.MONGO_DB_URL);
        console.log('Connected to Mongo');
      } else {
        console.error('Database Connection String Not Defined!');
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = DbConnection;
