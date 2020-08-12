class GoldRush extends Matrix {
    constructor() {
        super()
        this.lastPlayer = 0
        this.score = { player1: 0, player2: 0 }
        this.c = `./gifs/${Math.floor(10 * Math.random())}.gif`
        this.p = 'https://i.stack.imgur.com/Vkq2a.png'
        this.a = './gifs/pacmanPlayer.gif'
        this.w = './pics/10.jpg'
    }

    generateMatrix = (rows, cols) => {
        for (let r = 0; r < rows; r++) {
            this.matrix.push([])
            for (let c = 0; c < cols; c++) {
                const random = Math.floor(100 * Math.random())
                if (random < 60) this.matrix[r].push(this.p)
                else
                if (random < 90) this.matrix[r].push(this.c)
                else this.matrix[r].push(this.w)
            }
        }
        return this.matrix
    }
    
    loadBoard = (x, y) => this.generateMatrix(x, y)

    movePlayer = (player, direction) => {
        if (!this.findCoordinate(player)) return
        const { x, y } = this.findCoordinate(player)
        switch (direction) {
            case 'down': if (this.movingAndScoring(x + 1, y, player)) return
                break
            case 'up': if (this.movingAndScoring(x - 1, y, player)) return
                break
            case 'left': if (this.movingAndScoring(x, y - 1, player)) return
                break
            case 'right': if (this.movingAndScoring(x, y + 1, player)) return
                break
        }
        this.alter(x, y, this.p)
    }

    movingAndScoring = (x, y, player) => {
        if (!this.matrix[x]) return true
        if (this.matrix[x][y] == this.c) {
            if (player == this.a) this.score.player1 += 10
            else this.score.player2 += 10
        } else if (this.matrix[x][y] !== this.p) return true
        this.alter(x, y, player)
    }
}


