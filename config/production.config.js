// Exporting the Config Object
module.exports = {
    // All Config for Server app
    server: {
        HOST: "http://localhost:3001",
        // Setting the PORT where app will listen to
        PORT: 3001
    },
    // Setting the mongoDb config Object
    MongoDb: {
        // Setting the connection URI to the MongoDb database
        databaseName: "auth-server",
        connectionURI: "mongodb://localhost:27017",
        collections: {
            // Do not change the name of the keys
            'users': {
                name: "users" // You can change this
            },
            'email-verification-sessions': {
                name: 'email-verification-sessions'
            }
        }
    },
    nodemailer: {
        testAccount: false, // if true other auth information will be ignored
        transporterOptions: {
            host: "smtp.<Host>",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: "<YourEmail>",
                pass: "<YourPassword>",
            }
        }
    },
    // Setting up Environment Variables
    env: {
        UNIQUE_USERNAME: true, // if true while registering system will check if there is not any username with given username
        REFRESH_TOKEN_SECRET: "<YourRefreshTokenSecret>",
        ACCESS_TOKEN_SECRET: "<YourAccessTokenSecret>",
        ACCESS_TOKEN_EXPIRE_IN: "30m",
        EMAIL_VERIFICATION_SESSION_EXPIRE_MINUTES: 60 /* <- Minutes*/ * 24 // <- Hours
    }
};