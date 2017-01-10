// require our dependencies
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import exphbs from "express-handlebars"; // it doesn't suck like original handlebars
import router from "./app/routes.js";
import socketCon from "./app/socket.js";
// import socketIO from "socket.io";
// import socketEvent from "./app/socket.js";


// injecting environment variables
dotenv.config();


// initializing server requirments
const port = process.env.PORT || 3000;
const app = express();


// start the server
const server = app.listen(port, function() {
    console.log('app started at ' + port);
});


// socket connection
let io = socketCon(server);
// let io = socketIO(server);
// io.on('connection', socketEvent);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));


// routes for our app
let routes = router(io);
app.use('/', routes);


// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// template engine
const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'main'
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
