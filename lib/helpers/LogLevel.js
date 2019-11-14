class LogLevel {
    constructor({ level, name }) {
        this.level = level;
        this.name = name;
    }
}

module.exports = {
    ERROR: new LogLevel({ level: 5, name: "ERROR" }),
    WARN: new LogLevel({ level: 4, name: "WARN" })
};