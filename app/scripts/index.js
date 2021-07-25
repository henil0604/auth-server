const cors = require("cors");
// creating router object
const router = require("express").Router();

const routes = [
    {
        path: "/auth-handler.js",
        script: './auth-handler/dist/main.js',
        method: "get"
    }
]

router.use(cors());

// listening for / route in api
router.get("/", (req, res) => {
    // Sending the Simple Hello to the client
    res.send("Hello From Auth-Server API");
})

// setting routes from routes array
for (route of routes) {
    // Setting route
    router[route.method /* selecting the method function */](route.path /* Setting Path */, (req, res) => {
        res.contentType("application/javascript")
        res.sendFile(__dirname + "/" + route.script);
    });
}



// Exporting the router
module.exports = router;