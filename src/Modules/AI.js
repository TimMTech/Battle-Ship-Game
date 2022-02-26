const generateAI = (ship, squares) => {
    let direction;
    let randomDirection = Math.floor(Math.random() * ship.directions.length)
    let current = ship.directions[randomDirection]

    if (randomDirection === 0) direction = 1
    if (randomDirection === 1) direction = 10

    let randomStart = Math.abs(Math.floor(Math.random() * squares.length - (ship.directions[0].length * direction)))

    const isTaken = current.some(index => squares[randomStart + index].classList.contains('taken'))
    const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1)
    const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0)
    
    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
        current.forEach((index) => {
            squares[randomStart + index].classList.add('taken', ship.name)
        })
    } else {
        generateAI(ship, squares)
    }
    
}

export { generateAI }