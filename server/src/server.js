import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import db from "../db/db";
import ROUTES from "../routes";


const APP = express();
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

APP.disable('x-powered-by'); // turn off x-powered-by:express header

// to overcome CORSS restrictions (https://github.com/expressjs/cors / https://www.robinwieruch.de/node-js-express-tutorial);
const corsOptions = {
    origin: ["http://localhost:8080"] // white list for allowed origins (for more options see the github link above)
};


// const corsOptions = function (req, callback) {
//     var corsOpts;
//     debugger;
//     if (["http://localhost:8080/"].indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//     } else {
//         corsOptions = { origin: false } // disable CORS for this request
//     }
//     callback(null, corsOpts) // callback expects two parameters: error and options
// }


APP.use(cors(corsOptions));

// documentation: http://expressjs.com/en/resources/middleware/body-parser.html
// https://www.robinwieruch.de/node-express-server-rest-api#application-level-express-middleware
APP.use(express.json()); // parse json at the POST request in order to be able to get `req.body` (NOTE: request content type must be "application/json")
// for data send by the <form>
APP.use(express.urlencoded({ extended: true }));

console.log("Hello server!!!");

// ROUTES HANDLING ===============================================

// AUTH ****************************
APP.use("/api/auth/", ROUTES.auth);

// LINK ****************************
APP.use("/api/link", ROUTES.link);

// REDIRECT LINKS ****************************
APP.use("/t", ROUTES.redirect);

const v = path.join(__dirname, "..", "..", "dist");

var i = path.resolve(__dirname, "..", "..", "dist", "index.html");


var k = 0;
// ===============================================================
if (process.env.NODE_ENV === "production") {
    APP.use("/", express.static(path.join(__dirname, "..", "..", "dist")));

    APP.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "..", "..", "dist", "index.html"));
    });
}
// STATIC =================================================

// =================================================

// CONNECT TO DB =================================================
const DB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};
// we start server only after DB is connected
db.connect(DB_URL, DB_OPTIONS).then(startServer);
// ================================================================

// MAIN SERVER LISTENER ===========================================
function startServer() {
    APP.listen(PORT, serverListener);
}

function serverListener(req, res) {
    console.log(`SERVER APP LISTENING ON PORT: ${PORT}`);
};
// ================================================================


