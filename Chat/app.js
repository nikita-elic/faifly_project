const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.render('index')
})

server = app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));

const io = require("socket.io").listen(server);

let connections = [];

io.sockets.on("connection", socket => {
    console.log("User connected");
    connections.push(socket);

    socket.on("disconnect", data => {
        connections.slice(connections.indexOf(socket), 1);
        console.log("User disconnected");
    });

    socket.on('send message', function (data) {
        io.sockets.emit('add message', data);
    });

});