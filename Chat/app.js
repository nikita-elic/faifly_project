// Подключение всех модулей к программе
const express = require('express');
const app = express();
const io = require("socket.io").listen(server);

// ejs: движок шаблонов для упрощения производства HTML
app.set("view engine", "ejs");

app.use(express.static(__dirname));

// Отслеживание url адреса и отображение нужной HTML страницы
app.get('/', (req, res) => {
    res.render('index')
})

// Отслеживание порта
server = app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));


let connections = [];

// Функция, которая сработает при подключении к странице
io.sockets.on("connection", socket => {
    console.log("User connected");

    // Функция, которая срабатывает при отключении от сервера
    socket.on("disconnect", data => {
        console.log("User disconnected");
    });

    // Функция получающая сообщение от какого-либо пользователя
    socket.on('send message', function (data) {
        // Внутри функции мы передаем событие 'add message',
		// которое будет вызвано у всех пользователей и у них добавиться новое сообщение 
        io.sockets.emit('add message', data);
    });

});