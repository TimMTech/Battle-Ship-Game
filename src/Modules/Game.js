import { generateAI } from '/src/Modules/AI.js'
import { createBoard } from '/src/Modules/Board.js'
import { createShips } from '/src/Modules/Ships.js'


const game = () => {
    let currentPlayer = 'user'
    let gameOver = false;
    let isHorizontal = true;
    const userSquares = []
    const cpuSquares = []
    const playerGrid = document.getElementById('player-board')
    const computerGrid = document.getElementById('cpu-board')
    const rotateButton = document.getElementById('rotate-ship')
    const destroyer = document.querySelector('.destroyer-container')
    const submarine = document.querySelector('.submarine-container')
    const cruiser = document.querySelector('.cruiser-container')
    const battleship = document.querySelector('.battleship-container')
    const carrier = document.querySelector('.carrier-container')

    const turnDisplay = document.querySelector('.turn-display')
    const gameInfo = document.querySelector('.game-info')

    
    generateBoard()
    playerShip(userSquares)
    

    function generateBoard() {
        createBoard(playerGrid, userSquares)
        createBoard(computerGrid, cpuSquares)
    }
    
    function aiChoice() {
        generateAI(createShips()[0], cpuSquares)
        generateAI(createShips()[1], cpuSquares)
        generateAI(createShips()[2], cpuSquares)
        generateAI(createShips()[3], cpuSquares)
        generateAI(createShips()[4], cpuSquares)
    }

    function playerRotate() {
        if (isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = false;
           
            return;
        }

        if (!isHorizontal) {
            destroyer.classList.toggle('destroyer-container-vertical')
            submarine.classList.toggle('submarine-container-vertical')
            cruiser.classList.toggle('cruiser-container-vertical')
            battleship.classList.toggle('battleship-container-vertical')
            carrier.classList.toggle('carrier-container-vertical')
            isHorizontal = true;
           
            return;
        }
    }
    rotateButton.addEventListener('click', playerRotate) 

    function playerShip(squares){
        let draggedShipNode;
        let selectedShipIndex;
        let draggedShip;
        let draggedShipLength;
        const ships = document.querySelectorAll('.ship')
        const shipDisplay = document.getElementById('ship-display')
        const startRound = document.querySelector('.start-round')
        const gameInfo = document.querySelector('.game-info')

        ships.forEach((ship) => {
            ship.addEventListener('dragstart', dragStart)
        })
        squares.forEach((square) => {
            square.addEventListener('dragover', dragOver)
        })
        squares.forEach((square) => {
            square.addEventListener('dragenter', dragEnter)
        })
        squares.forEach((square) => {
            square.addEventListener('dragleave', dragLeave)
        })
        squares.forEach((square) => {
            square.addEventListener('drop', dragDrop)
        })
        squares.forEach((square) => {
            square.addEventListener('dragend', dragEnd)
        })

        ships.forEach((ship) => {
            ship.addEventListener('mousedown', (e) => {
                selectedShipIndex = e.target.id
            })
        })
        function dragStart(e) {
            draggedShipNode = this.childNodes.item(e.target)
            draggedShip = this;
            draggedShipLength = this.childNodes.length
        }
        
        function dragOver(e) {
            e.preventDefault()
        }
        
        function dragEnter(e) {
            e.preventDefault()
        }
        
        function dragLeave() {
            console.log('dragLeave', this)
        }
        
        function dragDrop() {
            let shipId = draggedShip.firstChild.id
            let shipClass = shipId.slice(0, -2)
            if (selectedShipIndex === draggedShip.firstChild.id) {
                for (let i = 0; i < draggedShipLength; i++) {
                    if (isHorizontal) {
                        squares[parseInt(this.dataset.id) + i].classList.add('taken', shipClass)
                    } else {
                        squares[parseInt(this.dataset.id) + 10 * i].classList.add('taken', shipClass)
                    }
                }
            }
            if (draggedShip.childNodes[1] && selectedShipIndex === draggedShip.childNodes[1].id) {
                for (let i = 0; i < draggedShipLength; i++) {
                    if (isHorizontal) {
                        squares[parseInt(this.dataset.id) - 1 + i].classList.add('taken', shipClass)
                    } else {
                        squares[parseInt(this.dataset.id) - 1 + 10 * i].classList.add('taken', shipClass)
                    }
                }
            }
            if (draggedShip.childNodes[2] && selectedShipIndex === draggedShip.childNodes[2].id) {
                for (let i = 0; i < draggedShipLength; i++) {
                    if (isHorizontal) {
                        squares[parseInt(this.dataset.id) - 2 + i].classList.add('taken', shipClass)
                    } else {
                        squares[parseInt(this.dataset.id) - 2 + 10 * i].classList.add('taken', shipClass)
                    }
                }
            }
            if (draggedShip.childNodes[3] && selectedShipIndex === draggedShip.childNodes[3].id) {
                for (let i = 0; i < draggedShipLength; i++) {
                    if (isHorizontal) {
                        squares[parseInt(this.dataset.id) - 3 + i].classList.add('taken', shipClass)
                    } else {
                        squares[parseInt(this.dataset.id) - 3 + 10 * i].classList.add('taken', shipClass)
                    }
                }
            }
            if (draggedShip.childNodes[4] && selectedShipIndex === draggedShip.childNodes[4].id) {
                for (let i = 0; i < draggedShipLength; i++) {
                    if (isHorizontal) {
                        squares[parseInt(this.dataset.id) - 4 + i].classList.add('taken', shipClass)
                    } else {
                        squares[parseInt(this.dataset.id) - 4 + 10 * i].classList.add('taken', shipClass)
                    }
                }
            }
            shipDisplay.removeChild(draggedShip)
            if (shipDisplay.childElementCount === 0) {
                gameInfo.innerHTML = ''
                aiChoice()
                startRound.classList.add('active')
                console.log(startRound)
            }
        }
    
        function dragEnd() {
            console.log('dragEnd', this)
        }
        
    }
    

    function playGame() {
        if (gameOver) return;
        if (currentPlayer === 'user') {
            turnDisplay.innerHTML = 'Your Go'
            cpuSquares.forEach((square) => {
                square.addEventListener('click', (e) => {
                    revealSquare(square)
                })
            })
        }
        if (currentPlayer === 'computer') {
            turnDisplay.innerHTML = 'Computers Go'
            setTimeout (computerGo, 1000)
        }
    }

    startRound.addEventListener('click', playGame)


    let destroyerCount = 0;
    let submarineCount = 0;
    let cruiserCount = 0;
    let battleshipCount = 0;
    let carrierCount = 0;

    function revealSquare(square) {
        if (!square.classList.contains('boom')) {
            if (!square.classList.contains('boom') && square.classList.contains('destroyer')) destroyerCount++
            if (!square.classList.contains('boom') && square.classList.contains('submarine')) submarineCount++
            if (!square.classList.contains('boom') && square.classList.contains('cruiser')) cruiserCount++
            if (!square.classList.contains('boom') && square.classList.contains('battleship')) battleshipCount++
            if (!square.classList.contains('boom') && square.classList.contains('carrier')) carrierCount++

            if (square.classList.contains('taken')) {
                square.classList.add('boom')
            }
            
            if (!square.classList.contains('taken')) {
                square.classList.add('missed')
            }
        }
        checkForWins()
        currentPlayer = 'computer'
        playGame()
    }

    let cpuDestroyerCount = 0;
    let cpuSubmarineCount = 0;
    let cpuCruiserCount = 0;
    let cpuBattleshipCount = 0;
    let cpuCarrierCount = 0;

    function computerGo() {
        let random = Math.floor(Math.random() * userSquares.length)
        if (!userSquares[random].classList.contains('taken')) {
            userSquares[random].classList.add('missed')
        }
        if (!userSquares[random].classList.contains('boom')) {
            userSquares[random].classList.add('boom')
            if (userSquares[random].classList.contains('destroyer')) cpuDestroyerCount++
            if (userSquares[random].classList.contains('submarine')) cpuSubmarineCount++
            if (userSquares[random].classList.contains('cruiser')) cpuCruiserCount++
            if (userSquares[random].classList.contains('battleship')) cpuBattleshipCount++
            if (userSquares[random].classList.contains('carrier')) cpuCarrierCount++
            checkForWins()
        } else {
            computerGo()
        }

        currentPlayer = 'user'
        turnDisplay.innerHTML = 'Your Go'
    }
    
    function checkForWins() {
        if (destroyerCount === 2) {
            shipStatus('You Sunk The Computers Destroyer')
            destroyerCount = 10
            return;
        }
        if (submarineCount === 3) {
            shipStatus('You Sunk The Computers Submarine')
            submarineCount = 10
            return;
        }
        if (cruiserCount === 3) {
            shipStatus('You Sunk The Computers Cruiser')
            cruiserCount = 10
            return;
        }
        if (battleshipCount === 4) {
            shipStatus('You Sunk The Computers Battleship')
            battleshipCount = 10
            return;
        }
        if (carrierCount === 5) {
            shipStatus('You Sunk The Computers Carrier')
            carrierCount = 10
            return;
        }
        if (cpuDestroyerCount === 2) {
            shipStatus('Computer Sunk Your Destroyer')
            cpuDestroyerCount = 10
            return;
        }
        if (cpuSubmarineCount === 3) {
            shipStatus('Computer Sunk Your Submarine')
            cpuSubmarineCount = 10
            return;
        }
        if (cpuCruiserCount === 3) {
            shipStatus('Computer Sunk Your Cruiser')
            cpuCruiserCount = 10
            return;
        }
        if (cpuBattleshipCount === 4) {
            shipStatus('Computer Sunk Your Battleship')
            cpuBattleshipCount = 10
            return;
        }
        if (cpuCarrierCount === 5) {
            shipStatus('Computer Sunk Your Carrier')
            cpuCarrierCount = 10
            return;
        }

        if ((destroyerCount + submarineCount + cruiserCount + battleshipCount + carrierCount) === 50) {
            gameInfo.innerHTML = 'YOU WIN'
            gameOver = true;
            return;
        }

        if ((cpuDestroyerCount + cpuSubmarineCount + cpuCruiserCount + cpuBattleshipCount + cpuCarrierCount) === 50) {
            gameInfo.innerHTML = 'CPU WINS'
            gameOver = true;
            return;
        }

    }

    function shipStatus(message) {
        gameInfo.innerHTML = message
        setTimeout(() => {
            gameInfo.innerHTML = ''
        }, 2000)
    }
}

export { game }