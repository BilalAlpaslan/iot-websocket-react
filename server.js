const WebSocket = require("ws");
const redis = require("redis");

// Configuration: adapt to your environment
const REDIS_SERVER = "redis://localhost:6379";
const WEB_SOCKET_PORT = 5678;

// Connect to Redis and subscribe to "app:notifications" channel
var redisClient = redis.createClient(REDIS_SERVER);
redisClient.subscribe("app:notifications");

// Create & Start the WebSocket server
const server = new WebSocket.Server({ port: WEB_SOCKET_PORT });

// Register event for client connection
server.on("connection", function connection(ws) {
  // broadcast on web socket when receving a Redis PUB/SUB Event
  redisClient.on("message", function (channel, message) {
    console.log(message);
    ws.send(message);
  });
});

console.log("WebSocket server started at ws://locahost:" + WEB_SOCKET_PORT);
