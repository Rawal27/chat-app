const express = require("express");
const app = express();
const http = require("http").createServer(app);
const PORT = process.env.PORT || 3000;

/* App listening on default port 3000 */
http.listen(PORT, () => {
  console.log(`App Listening on port ${PORT}`);
});

/* Removes MIMG Type error */
app.use("/public", express.static("public"));

/* Root route */
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

/* Socket.io initialisation */
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("Socket Connection Established.");
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});
