// importing cors
const cors = require("cors");

// creating router object
const router = require("express").Router();

router.use(cors());

const routes = [
    {
        path: "/register",
        module: require("./register"),
        method: "post"
    },
    {
        path: "/login",
        module: require("./login"),
        method: "post"
    },
    {
        path: "/verifyemail/:sessionId",
        module: require("./verifyemail"),
        method: "get"
    },
    {
        path: "/send-email-verification-mail/:id",
        module: require("./send-email-verification-mail"),
        method: "post"
    },
    {
        path: "/user",
        module: require("./user"),
        method: "post"
    },
    {
        path: "/access",
        module: require("./access"),
        method: "post"
    },
    {
        path: "/logout",
        module: require("./logout"),
        method: "post"
    },
]


// listening for / route in api
router.get("/", (req, res) => {
    // Sending the Simple Hello to the client
    res.send("Hello From Auth-Server API");
})


// setting routes from routes array
for (route of routes) {
    // Setting route
    router[route.method /* selecting the method function */](route.path /* Setting Path */, route.module /* Setting Function */);
}



// Exporting the router
module.exports = router;
