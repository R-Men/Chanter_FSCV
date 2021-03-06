const path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development',
    db = require('mysql');

const config = {
    development: {
        root: rootPath,
        app: {
            name: 'chanter-dev'
        },
        port: 3000,
        db: db.createConnection({
            host: "mariadb",
            database: "chanter-dev",
            user: "dev",
            password: "unlucky",
            multipleStatements: "true"
        }),
    },

    production: {
        root: rootPath,
        app: {
            name: 'chanter-webapp'
        },
        port: 3000,
        db: db.createConnection({
            host: "mariadb",
            database: "chanter-prod",
            user: "prod",
            password: "unlucky",
            multipleStatements: "true"
        }),
    },




};

module.exports = config[env];
