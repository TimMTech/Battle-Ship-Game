const createBoard = (grid, squares) => {
    let ROWS = 10;
    let COLS = 10;
    
    
    for (let i = 0; i < ROWS * COLS; i++) {
        const square = document.createElement('div')
        square.dataset.id = i
        grid.appendChild(square)
        squares.push(square)

        
    }
}

export { createBoard }