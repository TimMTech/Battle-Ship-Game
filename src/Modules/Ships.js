const createShips = () => {
    const shipArray = [
        {
            name: 'destroyer',
            directions: [
                [0, 1],
                [0, 10]
            ]
        },
        {
            name: 'submarine',
            directions: [
                [0, 1, 2],
                [0, 10, 20]
            ]
        },
        {
            name: 'cruiser',
            directions: [
                [0, 1, 2],
                [0, 10, 20]
            ]
        },
        {
            name: 'battleship',
            directions: [
                [0, 1, 2, 3],
                [0, 10, 20, 30]
            ]
        },
        {
            name: 'carrier',
            directions: [
                [0, 1, 2, 3, 4],
                [0, 10, 20, 30, 40]
            ]
        }
    ]
    return shipArray
}


export { createShips }