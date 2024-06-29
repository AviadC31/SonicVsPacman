class GoldRush extends Matrix {
   constructor() {
      super()
      this.score = { player1: 0, player2: 0 }
      this.coin = `./gifs/${Math.floor(Math.random() * 8)}.gif`
      this.point = '/pics/blank.png'
      this.player1 = './gifs/pacmanPlayer.gif'
      this.wall = './pics/9.jpg'
   }
   // ${Math.floor(10 * Math.random())}
   // axios.get('https://localhost:3000/api/randomCoin')
   generateMatrix = (rows, cols) => {
      for (let r = 0; r < rows; r++) {
         this.matrix.push([])
         for (let c = 0; c < cols; c++) {
            const random = Math.floor(100 * Math.random())
            if (random < 60) this.matrix[r].push(this.point)
            else if (random < 90) this.matrix[r].push(this.coin)
            else this.matrix[r].push(this.wall)
         }
      }
      return this.matrix
   }

   loadBoard = (x, y) => this.generateMatrix(x, y)

   movePlayer = (player, direction) => {
      if (!this.findCoordinate(player)) return
      const { x, y } = this.findCoordinate(player)
      switch (direction) {
         case 'down':
            if (this.movingAndScoring(x + 1, y, player)) return
            break
         case 'up':
            if (this.movingAndScoring(x - 1, y, player)) return
            break
         case 'left':
            if (this.movingAndScoring(x, y - 1, player)) return
            break
         case 'right':
            if (this.movingAndScoring(x, y + 1, player)) return
            break
      }
      this.alter(x, y, this.point)
   }

   movingAndScoring = (x, y, player) => {
      if (!this.matrix[x]) return true
      if (this.matrix[x][y] === this.coin) {
         if (player === this.player1) this.score.player1 += 10
         else this.score.player2 += 10
      } else if (this.matrix[x][y] !== this.point) return true
      this.alter(x, y, player)
   }
}
