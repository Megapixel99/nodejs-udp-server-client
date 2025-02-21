const udp = require("dgram");
const client = udp.createSocket("udp4");
const serverPort = process.env.PORT || 41234;
const serverIp = process.env.SERVER_IP || "0.0.0.0";

const data = Buffer.from(JSON.stringify({
  "app": "myapp",
  "message": "Error on L50 in thisorthat.js file",
  "file": "thisorthat.js"
}));

client.on("message", (message, info) => {
    console.log(`client got: ${message} from ${info.address}:${info.port}`);
});

setInterval(() => {
    client.send(data, serverPort, serverIp, (error) => {
        if (error) {
            console.log(error);
            client.close();
        } else {
            console.log("Data sent !!!");
        }
    });
    console.log("Sleeping for 10 seconds...");
}, 10000);
