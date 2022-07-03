const express = require("express");
const app = express();
const amqp = require("amqplib/callback_api");

const port = 3002;

amqp.connect("amqp://user:password@localhost", (err, conn) => {
  conn.createChannel((err, ch) => {
    const queue = "FirstQueue";

    ch.assertQueue(queue, { durable: false });
    console.log(`Waiting for message in ${queue}`);
    ch.consume(
      queue,
      (message) => {
        console.log(`Received ${message.content}`);
      },
      { noAck: true }
    );
  });
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
