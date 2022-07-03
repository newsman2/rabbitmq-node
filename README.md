# What is this project?

## How to run this project?

Run RabbitMQ container image
`docker run -it --rm --hostname my-rabbit -p 15672:15672 -p 15674:15674 -p 5672:5672 --name some-rabbit -e RABBITMQ_DEFAULT_USER=user -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3.10.5-management`

Run the following command in container shell
`rabbitmq-plugins enable rabbitmq_web_stomp`
