// mở terminal gõ node server.js để chạy
// nhập url localhost:3000 vào browser để tương tác với server

const http = require("http");
const fileSystem = require("fs");

function requestListener(request, response) {
  const url = request.url;
  const method = request.method;
  if (url === "/") {
    response.write("<html>");
    response.write("<head><title>Send Message</title></head>");
    response.write(
      "<body><form action='/message' method='POST'><input type='text' name='textMessage'><button type='submit'>SUBMIT</button></form></body>"
    );
    response.write("</html>");
    return response.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    request.on("data", (chunk) => {
      console.log("chunk:", chunk);
      body.push(chunk);
    });
    request.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const dataFromRequest = parsedBody.split("=")[1];
      fileSystem.writeFile("message.txt", dataFromRequest, (error) => {
        response.statusCode = 302;
        response.setHeader("Location", "/");
        return response.end();
      });
    });
  }
  response.setHeader("Content-Type", "text/html");
  response.write("<html>");
  response.write("<head><title>HOME PAGE</title></head>");
  response.write("<body><h1>not thing done</h1></body>");
  response.write("</html>");
  response.end();
}

const server = http.createServer(requestListener);

server.listen(3000);
