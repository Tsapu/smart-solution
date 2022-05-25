var createError = require('http-errors');
var express = require('express');
const cors = require("cors");
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

const EventEmitter = require('node:events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

// const redis = require('redis');
// const REDIS_SERVER = "redis://localhost:6379";
// var redisClient = redis.createClient(REDIS_SERVER);

// redisClient.on('error', (err) => console.log('Redis Client Error', err));
// await redisClient.connect();
// redisClient.subscribe('app:notifications');

var app = express();
var expressWs = require('express-ws')(app);
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let DJ_Values = {};

// var aWss = expressWs.getWss();
//const wsServer = new WebSocket.Server({ server }); // We should enable auth for this
// app.ws("/echo", function(ws, req) {
//   console.log("Echo connected");
//   ws.on("message", msg => {
//     console.log(msg.data);
//     .clients.forEach(function (client) {
//       client.send(msg.data);
//     });
//   })
// })

app.post("/laser", (req, res) => {
  console.log(req.body);
  res.send({69: "Nice bro"});
  console.log("LAAASAEEEER")
  myEmitter.emit('laser');
})

app.ws("/publish", (ws, req) => {
  console.log("publisher connected");
  ws.on("message", rawData => {
    const data = JSON.parse(rawData) // crashes if not JSON lOL
    console.log("Received from client ", data);
    DJ_Values = data;
    myEmitter.emit('event');
    // await redisClient.set('dj', data);
    // aWss.clients.forEach(function each(client) { // way to send all published things back to clients, but idk
    //   console.log(client.readyState);
    //   if (client.readyState === 1) {
    //     client.send(rawData);
    //   }
    // });
  });
  ws.on("close", () => {
    console.log("client disconnected")
  });
});

app.ws("/subscribe", (ws, req) => {
  console.log("subscriber connected");
  // redisClient.on('DJ', function(channel, message){
  //   console.log(message);
  //   ws.send(message);
  // })
  myEmitter.on('event', () => {
    ws.send(JSON.stringify(DJ_Values));
  });
  myEmitter.on('laser', () => {
    ws.send(JSON.stringify({"laser": "LAAAAAAAAAAAAAAAAAAAASEEEEEEEEER"}));
  });
  ws.on("close", () => {
    console.log("client disconnected")
  });
});



// server.on('connection', function connection(ws) {
//   // broadcast on web socket when receving a Redis PUB/SUB Event
//   redisClient.on('message', function(channel, message){
//     console.log(message);
//     ws.send(message);
//   })

// });

// app.use(express.static(path.join(__dirname, 'public')));


if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/secret", function(req, res, next) {
  res.send("Hello")
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({"error": 404});
});

module.exports = app;
