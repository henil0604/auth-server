// Loading the toolBox
const toolBox = require("@henil0604/toolbox");
// logging that modlues are loading
toolBox.logger("Loading Modules...", "info", '[SERVER]')
// setting STARTING_TIME as the started time in ms
const STARTING_TIME = Date.now();

// Importing the app object from /app
let app = require("./app");
// loading the config
const config = require("./config");





// listening to the app
app.listen(config.server.PORT, () => {
    // Logging that app is listening on {PORT}
    toolBox.logger(`Server Started and Listening at ${config.server.PORT}...`, "success", '[SERVER]')
    // Telling the Load time to the console
    toolBox.logger(`Load time was ${Date.now() - STARTING_TIME}ms`, "info", '[SERVER]')
})