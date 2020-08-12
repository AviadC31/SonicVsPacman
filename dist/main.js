const a = './gifs/pacmanPlayer.gif'
const b = './gifs/sonicPlayer.gif'
const renderer = new Renderer()
const board = new GoldRush()
const socket = io()

loadnewGame = () => location.reload(true)

displayBoard = () => {
    // displayBoard = (players) => {

    let dimension = $("#dimension").val()
    board.loadBoard(Math.floor(dimension / 2), dimension)
    // if(players['sonic'])
    board.alter(Math.floor(dimension / 2) - 1, dimension - 1, b)
    // if(players['pacman'])
    board.alter(0, 0, a)
    renderer.render(board.score, 'score')
    renderer.render(board.matrix, 'board')
    $("#playNow").empty()
    $("body").css("background-image", "url(.)")

}

displayScreen = (screen) => {

    $("body").empty().css({
        "background-image": `url('./${screen}')`,
        "background-repeat": "no-repeat",
        "background-size": "cover",
        "background-position": "center center",
        "background-attachment": "fixed"
    })
}

gameOver = () => {

    if (board.score.player1 >= board.matrix.length * board.matrix[0].length * 1.5) return 'pacman'
    if (board.score.player2 >= board.matrix.length * board.matrix[0].length * 1.5) return 'sonic'
    if (!(JSON.stringify(board.findCoordinate(board.c))))
        return board.score.player1 >= board.score.player2 ? 'pacman' : 'sonic'
}

gameOverScreen = () => {

    displayScreen('pics/sOniCeNd.jpg')

    $("body").append(`
        <div id="tudo">
            <div class="gameover">
                <p> GAME </p>
                <p> OVER </p>
            </div>
                <div class="continue"> 
                    <p> CONTINUE? </p> 
                </div>
                <div class="opcoes">
                    <div class="yes"> 
                        <a href="#" onclick="loadnewGame()"> YES </a> 
                    </div>
                    <div class="no">
                        <a href="#"> NO </a> 
                    </div>
                </div>
        </div>
        `)
}




loadPage = () => {

    $("#playNow").append(`    
    <input type="text" id="dimension"  placeholder=" Insert Board Size 10~40" required>
    <input class="playBt" type="image" src="https://city-car-run.appspot.com/PlayNowButton.png"
    onclick="audio.play()">`)

    $(".playBt").on('click', async () => {

        // await socket.on('Players', players => {

        //     displayBoard(players)

        // })
        displayBoard()

        $(document).keypress(function (e) {

            // socket.emit('movement', e.which)
            // socket.on('move', move => { 
            const winner = gameOver()

            if (winner == 'sonic' || winner == 'pacman') {

                displayScreen('gifs/winner.gif')

                $("body").append(`
                <div id="winnigContainer" onclick="gameOverScreen()">
                    <img class="winning" src="./gifs/prize.gif">
                    <img class="winner" src="./pics/${winner}Winner.png">
                    <div style="font-size: 50px;"> Congratolations ${winner}!\nyou defete your enemy by
                     ${Math.abs(board.score.player1 - board.score.player2)} points!</div>
                </div>
                `)
                return
            }

            // switch (move) {
            switch (e.which) {
                case 119: board.movePlayer(a, "up")
                    break
                case 115: board.movePlayer(a, "down")
                    break
                case 97: board.movePlayer(a, "left")
                    break
                case 100: board.movePlayer(a, "right")
                    break
                case 105: board.movePlayer(b, "up")
                    break
                case 107: board.movePlayer(b, "down")
                    break
                case 106: board.movePlayer(b, "left")
                    break
                case 108: board.movePlayer(b, "right")
                    break
            }

            renderer.render(board.score, 'score')
            renderer.render(board.matrix, 'board')
            // })
        })
    })

}







