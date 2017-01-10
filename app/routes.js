import express from "express";
import _home from "./controllers/home.js"

module.exports = io => {

    // initiaizing express router
    let router = express.Router();

    // middleware
    router.use( (req, res, next) =>  next() );

    // define all the routes
    let home = _home(io);
    router.route('/')
        .get(home.get)
        .post(home.post);

    return router;

}
