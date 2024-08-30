const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const PORT = 4000;


server.listen(PORT,()=>{
    console.log(`App running on PORT : ${PORT}`);
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/grid.html');
});

const events = [];
io.on('connection', (socket)=>{
    socket.on("userDraw", (data)=>{
        events.push(data.msg);
        io.emit('userDraw', data);
    });

    // Emitting a custom event init to show previous state when new user is connected'
    socket.emit('init', { msg: JSON.stringify(events) });

    socket.on('disconnect',()=>{
        io.emit('message',{msg:'User disconnected'});
    });
});