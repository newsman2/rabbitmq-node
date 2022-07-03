const express = require("express");
const app = express();
const amqp = require("amqplib/callback_api");

const port = 3001;

amqp.connect("amqp://user:password@localhost", (err, conn) => {
  conn.createChannel((err, ch) => {
    const queue = "FirstQueue";
    const message = { type: "2", content: "Hello World" };

    ch.assertQueue(queue, { durable: false });
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    console.log("Message was sent");
  });

  setTimeout(() => {
    conn.close();
    process.exit(0);
  }, 500);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
