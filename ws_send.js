const express = require("express");
const webstomp = require("webstomp-client");
const WebSocket = require("ws");

const client = webstomp.over(new WebSocket("ws://localhost:15674/ws"));
const app = express();
const port = 3003;

function onError(user, err) {
  console.log("Disconnected", user.name, err);
}

const message = {
  firstName: "Tom",
  lastName: "Smith",
  dateOfBirth: "1970-01-22",
  gender: "M",
  email: "tomsmith@example.com",
};

function onConnect(user) {
  console.log("Initiating connection");
  console.log("Connected", user);
  client.send("/exchange/web-service-endpoint", JSON.stringify(message), {
    "content-type": "application/json",
  });
}

client.connect("user", "password", onConnect, onError);

setTimeout(() => {
  client.disconnect(() => {
    console.log("Disconnect from exchange");
  });
  process.exit(0);
}, 500);

app.listen(port, () => console.log(`App listening on port ${port}!`));
