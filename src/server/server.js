const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ws = require("ws");

const login = require("./login");
const userApi = require("./userApi");

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, "..", "..", "dist")));

app.use("/api/users", userApi);
app.use("/api/profile", login);

// Handle Server
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(
      path.resolve(__dirname, "..", "..", "dist", "index.html")
    );
  }
  next();
});

const wsServer = new ws.Server({ noServer: true });
const sockets = [];
wsServer.on("connection", (socket) => {
  sockets.push(socket);
  socket.on("message", (message) => {
    for (const socket of sockets) {
      socket.send(message);
    }
  });
});

const server = app.listen(3000, () => {
  console.log(`Server started on http://localhost:${server.address().port}`);
  server.on("upgrade", (req, res, head) => {
    wsServer.handleUpgrade(req, res, head, (socket) => {
      wsServer.emit("connection", socket, req);
    });
  });
});
