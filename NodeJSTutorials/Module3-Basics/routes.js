const fs = require("fs");
const requestListener = (request, response) => {
  const url = request.url;
  const method = request.method;
  // setting the name of the header and the type of data we will return with it
  response.setHeader("Content-Type", "text/html");
  if (url === "/") {
    // allows to write the data in chunks
    response.write("<html>");
    response.write("<head><title>My First Page</title></head>");
    response.write(
      `<body>
      <h1>Hello from My Node.js server</h1>
      <form action="/message" method="POST">
          <input type="text" name="message"/>
          <button type="submit">Submit</button>
      </form>
    </body>`
    );
    response.write("</html>");
    return response.end();
  }

  if (url === "/message" && method === "POST") {
    //////+++++++++++++++++++++++++++++++++++++++++//////

    // fired whenever a new chunk is ready to be read
    const body = [];
    request.on("data", (chunk) => {
      body.push(chunk);
      console.log("body", body);
    });

    return request.on("end", () => {
      // fired when all the chunks are received and data is stored in the body
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1].split("+").join(" ");

      //////+++++++++++++++++++++++++++++++++++++++++//////

      // stands for Synchronous , block execution of next line of code until the file is created and written properly
      // fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }

  //////+++++++++++++++++++++++++++++++++++++++++//////

  //   console.log("request.url", request.url);
  //   console.log("request.method", request.method);
  //   console.log("request.headers", request.headers);

  //////+++++++++++++++++++++++++++++++++++++++++//////

  response.write("<html>");
  response.write("<head><title>My First Page</title></head>");
  response.write(
    `<body>
      <h1>This is a Form</h1>
       <div>
        Having fun learning the Node.js this is i guess the third module
       </div>
    </body>`
  );
  response.write("</html>");

  //////+++++++++++++++++++++++++++++++++++++++++//////
};

module.exports = requestListener;
