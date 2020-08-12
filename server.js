const bodyParser = require('body-parser')
const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// let players = {}

io.on('connection', function (socket) {
    console.log('a user connected');
    // create a new player and add it to our players object
    // if (players['pacman']){
    //     players['sonic'] = socket.id
    //     console.log('sonic connected');
    //     console.log(players)
    // }
    // else{
    //     players['pacman'] = socket.id
    //     console.log('pacman connected');
    //     console.log(players)
    // }
    // // send the players object to the new player
    // socket.emit('Players', players)
    // // update all other players of the new player
    // // socket.broadcast.emit('newPlayer', players);
    // socket.on('movement', step => {
    //     io.emit('move', step)
    // })
    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {
      
        // // remove this player from our players object
        // if(players['sonic'] == socket.id){
        // delete players['sonic'];
        // // emit a message to all players to remove this player
        // console.log('sonic disconnected');
        // io.emit('disconnect', socket.id);
        // }else{ 
        //     delete players['pacman'];
        //     console.log('pacman disconnected');
            io.emit('disconnect', socket.id);
    // }
    });
});


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

server.listen(3000, () => console.log(`Running server on port 3000`))

