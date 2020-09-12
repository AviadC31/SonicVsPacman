const playerA = './gifs/pacmanPlayer.gif'
const playerB = './gifs/sonicPlayer.gif'
const renderer = new Renderer()
const socket = io()

loadnewGame = () => location.reload(true)

displayBoard = () => {

    let dimension = $("#dimension").val()
    board.loadBoard(Math.floor(dimension / 2), dimension)
    board.alter(Math.floor(dimension / 2) - 1, dimension - 1, playerB)
    board.alter(0, 0, playerA)
    renderer.render(board.score, 'score')
    renderer.render(board.matrix, 'board')
    $("#playNow").empty()
    $("body").css("background-image", "url(.)")

}

displayMultiBoard = () => {

    let dimension = $("#dimension").val()
    board.loadBoard(Math.floor(dimension / 2), dimension)
    board.alter(Math.floor(dimension / 2) - 1, dimension - 1, playerB)
    board.alter(0, 0, playerA)
    socket.emit('board', { matrix: board.matrix, score: board.score })
}

gameOver = () => {

    if (board.score.player1 >= board.matrix.length * board.matrix[0].length * 1.5) return 'pacman'
    if (board.score.player2 >= board.matrix.length * board.matrix[0].length * 1.5) return 'sonic'
    if (!(JSON.stringify(board.findCoordinate(board.coin))))
        return board.score.player1 >= board.score.player2 ? 'pacman' : 'sonic'
}

multiGameOver = (player) => {
    let winneris = ''
    socket.emit('gameOver', {
        player: player,
        outOfcoins: (!(JSON.stringify(board.findCoordinate(board.coin))))
    })
}

loadPage = () => {

    socket.emit('player', 'player')
    socket.on('player', player => {

        $("#multiplayer").on('click', () => {
            $("span").empty()

            renderer.waitingRoom()

            socket.emit('gameReady', 'gameReady')
            socket.on('gameReady', gameReady => {
                if (player === 'host') renderer.playNow()

                $(".playBt").on('click', () => {
                    displayMultiBoard()
                })
            })

            socket.on('board', multiBoard => {
                if (player === 'guest') {
                    board.matrix = [ ...multiBoard.matrix ]
                    board.score = {...multiBoard.score}
                }
                $("#playNow").empty()
                $("body").css("background-image", "url(.)")
                renderer.render(multiBoard.score, 'score')
                renderer.render(multiBoard.matrix, 'board')
            })

            $(document).keypress(function (e) {
               multiGameOver(player)
                socket.on('winnerIs', winnerIs => {
                    // console.log(winnerIs)
                //     if (winnerIs === 'host') winneris = 'pacman'
                //     if (winnerIs === 'guest') winneris = 'sonic'
                // })
                // if (winner === 'sonic' || winner === 'pacman') {
                //     socket.emit('ceremony', winner)
                //     socket.on('ceremony', ceremony => {
                        renderer.displayScreen('gifs/winner.gif')
                        renderer.appendBody(winnerIs)
                        return
                    })
                // }
                switch (e.which) {
                    case 119: board.movePlayer(player === 'host' ? playerA : playerB, "up")
                        break
                    case 115: board.movePlayer(player === 'host' ? playerA : playerB, "down")
                        break
                    case 97: board.movePlayer(player === 'host' ? playerA : playerB, "left")
                        break
                    case 100: board.movePlayer(player === 'host' ? playerA : playerB, "right")
                        break
                }

                socket.emit('movement', { matrix: board.matrix, score: board.score })
                socket.on('movement', movement => {
                    board.matrix = [...movement.matrix]
                    board.score.player1 = movement.score.player1
                    board.score.player2 = movement.score.player2
                    renderer.render(board.score, 'score')
                    renderer.render(board.matrix, 'board')
                })
            })

        })
    })
    $("#singleplayer").on('click', async () => {
        $("span").empty()
        renderer.playNow()

        $(".playBt").on('click', async () => {

            displayBoard()

            $(document).keypress(function (e) {

                const winner = gameOver()

                if (winner == 'sonic' || winner == 'pacman') {

                    renderer.displayScreen('gifs/winner.gif')
                    renderer.appendBody(winner)
                    return
                }
                switch (e.which) {
                    case 119: board.movePlayer(playerA, "up")
                        break
                    case 115: board.movePlayer(playerA, "down")
                        break
                    case 97: board.movePlayer(playerA, "left")
                        break
                    case 100: board.movePlayer(playerA, "right")
                        break
                    case 105: board.movePlayer(playerB, "up")
                        break
                    case 107: board.movePlayer(playerB, "down")
                        break
                    case 106: board.movePlayer(playerB, "left")
                        break
                    case 108: board.movePlayer(playerB, "right")
                        break
                }

                renderer.render(board.score, 'score')
                renderer.render(board.matrix, 'board')
            })
        })

    })

}






