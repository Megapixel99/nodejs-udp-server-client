const udp = require("dgram");
const server = udp.createSocket("udp4");
const port = process.env.PORT || 41234;

server.on("error", (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on("message", (message, info) => {
    console.log(`server got: ${message} from ${info.address} : ${info.port}`);

    const response = {
        message: `Hello from the server running at IP: ${
            server.address().address
        }:${server.address().port}`,
        time: new Date().toISOString(),
    };

    const responseBuffer = Buffer.from(JSON.stringify(response));

    server.send(responseBuffer, info.port, info.address, (err) => {
        if (err) {
            console.log(`server error:\n${err.stack}`);
        } else {
            console.log(
                `server sent: ${responseBuffer} to ${info.address} : ${info.port}`
            );
        }
    });
});

server.on("listening", () => {
    const address = server.address();
    const port = address.port;
    const family = address.family;
    const ipaddr = address.address;

    console.log(`server is listening at ${family} ${ipaddr}:${port}`);
});

server.bind(port);
