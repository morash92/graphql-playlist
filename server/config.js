require('dotenv').config();
console.log(process.env.DEV_DB_HOST)

const env = process.env.NODE_ENV;

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 4000
    },
    db: {
        host: process.env.DEV_DB_HOST || 'localhost',
        port: parseInt(process.env.DEV_DB_PORT) || 27017,
        name: process.env.DEV_DB_NAME || 'db',
        username: process.env.DEV_DB_USERNAME || '',
        password: process.env.DEV_DB_PASSWORD
    }
};

const config = { dev };

module.exports = config[env];