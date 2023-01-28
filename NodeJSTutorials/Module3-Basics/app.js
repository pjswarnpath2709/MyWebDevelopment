const http = require("http");
const requestListener = require("./routes");

const server = http.createServer(requestListener);

server.listen(8000);
