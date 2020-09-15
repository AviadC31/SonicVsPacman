const bodyParser = require('body-parser')
const socketio = require('socket.io')
const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

const players = {}
const player = { status: '' }
let multiBoard = { matrix: [], score: {} }
let readyPlayers = 0
let randomCoin = ``


io.on('connection', function (socket) {
    // console.log('User Connected');
    // create a new player and add it to our players object
    if (players['pacman']) {
        players['sonic'] = socket.id
        console.log('sonic connected');
        player.status = 'guest'
        randomCoin = `./gifs/${Math.floor(10 * Math.random())}.gif`
    }
    else {
        players['pacman'] = socket.id
        console.log('pacman connected');
        player.status = 'host'
    }
    socket.on('player', () => {
        socket.emit('player', player.status)
    })
    socket.on('gameReady', gameReady => {
        readyPlayers++
        if (readyPlayers == 2) {
            io.emit('gameReady', gameReady)
            readyPlayers = 0
        }
    })

    socket.on('board', board => {
        board.matrix.length > 0 ? multiBoard = { ...board } : null
        io.emit('board', multiBoard)
    })

    socket.on('gameOver', gameOver => {
        console.log(gameOver)
        if (multiBoard.score.player1 >= multiBoard.matrix.length * multiBoard.matrix[0].length * 1.5) {
            socket.emit('winnerIs', 'pacman')
        }
        if (multiBoard.score.player2 >= multiBoard.matrix.length * multiBoard.matrix[0].length * 1.5) {
            socket.emit('winnerIs', 'sonic')
        }
        if (gameOver.outOfcoins)
            multiBoard.score.player1 >= multiBoard.score.player2 ? socket.emit('winnerIs', 'pacman') : socket.emit('winnerIs', 'sonic')
    })

    socket.on('ceremony', winner => {
        if (winner == 'sonic') {
            io.emit('ceremony', 'sonic')
        } else io.emit('ceremony', 'pacman')
    })

    socket.on('movement', movement => {
        movement.matrix.length > 0 ? multiBoard = { ...movement } : null
        // console.log(movement.matrix.length > 0 ? movement : multiBoard)
        io.emit('movement', multiBoard)
    })


    // // send the players object to the new player
    // socket.emit('Players', players)
    // // update all other players of the new player
    // // socket.broadcast.emit('newPlayer', players);

    // when a player disconnects, remove them from our players object
    socket.on('disconnect', function () {

        // remove this player from our players object
        if (players['sonic'] == socket.id) {
            delete players['sonic'];
            // emit a message to all players to remove this player
            console.log('sonic disconnected');
            io.emit('disconnect', socket.id);
        } else {
            delete players['pacman'];
            console.log('pacman disconnected');
            io.emit('disconnect', socket.id);
        }
    });
});


app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.get('/api/randomCoin', function (req, res) {
//     res.send(randomCoin)
// })
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Running server on port 8000`))

