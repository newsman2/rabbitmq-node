const express = require("express");
const webstomp = require("webstomp-client");
const WebSocket = require("ws");

const client = webstomp.over(new WebSocket("ws://localhost:15674/ws"));
const app = express();
const port = 3004;

function onError(user, err) {
  console.log("Disconnected", user.name, err);
}

function onConnect(user) {
  console.log("Connected", user.name);
  client.subscribe("/exchange/web-service-endpoint", (message) => {
    console.log(
      `Received ${JSON.stringify(JSON.parse(message.body), null, 2)}`
    );
  });
}

client.connect("user", "password", onConnect, onError);

app.listen(port, () => console.log(`App listening on port ${port}!`));
