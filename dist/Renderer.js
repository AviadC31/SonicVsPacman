const board = new GoldRush()

class Renderer {
    render = (data, str) => {
        const source = $(`#${str}Template`).html()
        const template = Handlebars.compile(source)
        let dataHTML = template({ data })
        $(`.${str}`).empty().append(dataHTML)
    }
    gameOverScreen = () => {

        this.displayScreen('pics/sOniCeNd.jpg')

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

    displayScreen = screen => {

        $("body").empty().css({
            "background-image": `url('./${screen}')`,
            "background-repeat": "no-repeat",
            "background-size": "cover",
            "background-position": "center center",
            "background-attachment": "fixed"
        })
    }
    playNow = () =>{
        $("body").css("background-image","url('./pics/10.png')")
        $("#playNow").append(`    
        <input type="text" id="dimension"  placeholder=" Insert Board Size 10~40" required>
        <input class="playBt" type="image" src="https://city-car-run.appspot.com/PlayNowButton.png"
        onclick="audio.play()">`)
    }
    waitingRoom = () =>{
        $("body").css("background-image","url('https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif')")
    }

    appendBody = winner => {
        $("body").append(`
        <div id="winnigContainer" onclick="renderer.gameOverScreen()">
            <img class="winning" src="./gifs/prize.gif">
            <img class="winner" src="./pics/${winner}Winner.png">
            <div style="font-size: 50px;"> Congratolations ${winner}!\nyou defete your enemy by
             ${Math.abs(board.score.player1 - board.score.player2)} points!</div>
        </div>
        `)
    }
}