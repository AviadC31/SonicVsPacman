class Matrix {
    constructor(rows, cols) {
        this.matrix = this.generateMatrix(rows, cols)
    }
    generateMatrix = (rows, cols) => {
        let matrix = []
        let num = 1
        for (let r = 0; r < rows; r++) {
            matrix.push([])
            for (let c = 0; c < cols; c++) {
                matrix[r].push(num++)
            }
        }
        return matrix
    }

    findCoordinate = value => {
        for (let r = 0; r < this.matrix.length; r++) {
            for (let c = 0; c < this.matrix[r].length; c++) {
                if( this.matrix[r][c] == value ) return {x: r, y: c}
            }
        }
    } 
    
    alter = (rowNum, colNum, updVal) => this.matrix[rowNum][colNum] = updVal
}



