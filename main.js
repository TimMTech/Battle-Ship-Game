/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Modules/AI.js":
/*!***************************!*\
  !*** ./src/Modules/AI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateAI": () => (/* binding */ generateAI)
/* harmony export */ });
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



/***/ }),

/***/ "./src/Modules/Board.js":
/*!******************************!*\
  !*** ./src/Modules/Board.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createBoard": () => (/* binding */ createBoard)
/* harmony export */ });
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



/***/ }),

/***/ "./src/Modules/Game.js":
/*!*****************************!*\
  !*** ./src/Modules/Game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _src_Modules_AI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/Modules/AI.js */ "./src/Modules/AI.js");
/* harmony import */ var _src_Modules_Board_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/Modules/Board.js */ "./src/Modules/Board.js");
/* harmony import */ var _src_Modules_Ships_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../src/Modules/Ships.js */ "./src/Modules/Ships.js");





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
        ;(0,_src_Modules_Board_js__WEBPACK_IMPORTED_MODULE_1__.createBoard)(playerGrid, userSquares)
        ;(0,_src_Modules_Board_js__WEBPACK_IMPORTED_MODULE_1__.createBoard)(computerGrid, cpuSquares)
    }
    
    function aiChoice() {
        (0,_src_Modules_AI_js__WEBPACK_IMPORTED_MODULE_0__.generateAI)((0,_src_Modules_Ships_js__WEBPACK_IMPORTED_MODULE_2__.createShips)()[0], cpuSquares)
        ;(0,_src_Modules_AI_js__WEBPACK_IMPORTED_MODULE_0__.generateAI)((0,_src_Modules_Ships_js__WEBPACK_IMPORTED_MODULE_2__.createShips)()[1], cpuSquares)
        ;(0,_src_Modules_AI_js__WEBPACK_IMPORTED_MODULE_0__.generateAI)((0,_src_Modules_Ships_js__WEBPACK_IMPORTED_MODULE_2__.createShips)()[2], cpuSquares)
        ;(0,_src_Modules_AI_js__WEBPACK_IMPORTED_MODULE_0__.generateAI)((0,_src_Modules_Ships_js__WEBPACK_IMPORTED_MODULE_2__.createShips)()[3], cpuSquares)
        ;(0,_src_Modules_AI_js__WEBPACK_IMPORTED_MODULE_0__.generateAI)((0,_src_Modules_Ships_js__WEBPACK_IMPORTED_MODULE_2__.createShips)()[4], cpuSquares)
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



/***/ }),

/***/ "./src/Modules/Menu.js":
/*!*****************************!*\
  !*** ./src/Modules/Menu.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuOption": () => (/* binding */ menuOption)
/* harmony export */ });
/* harmony import */ var _src_Modules_Game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/Modules/Game.js */ "./src/Modules/Game.js");


const menuOption = () => {
    const startButton = document.getElementById('startGame')
    const menuOption = document.querySelector('.menu-option')
    const overLay = document.getElementById('overlay')
    const gameInfo = document.querySelector('.game-info')
    menuOption.classList.add('active')

    startButton.addEventListener('click', () => {

        gameInfo.innerHTML = 'Set Your Ships'
        menuOption.classList.remove('active')
        overLay.remove()
        ;(0,_src_Modules_Game_js__WEBPACK_IMPORTED_MODULE_0__.game)()

    })
}



/***/ }),

/***/ "./src/Modules/Ships.js":
/*!******************************!*\
  !*** ./src/Modules/Ships.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShips": () => (/* binding */ createShips)
/* harmony export */ });
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




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../src/style.css */ "./src/style.css");
/* harmony import */ var _src_Modules_Menu_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../src/Modules/Menu.js */ "./src/Modules/Menu.js");




document.addEventListener('DOMContentLoaded', () => {
    (0,_src_Modules_Menu_js__WEBPACK_IMPORTED_MODULE_1__.menuOption)()
})


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiK0M7QUFDSTtBQUNBOzs7QUFHbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxtRUFBVztBQUNuQixRQUFRLG1FQUFXO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOERBQVUsQ0FBQyxrRUFBVztBQUM5QixRQUFRLCtEQUFVLENBQUMsa0VBQVc7QUFDOUIsUUFBUSwrREFBVSxDQUFDLGtFQUFXO0FBQzlCLFFBQVEsK0RBQVUsQ0FBQyxrRUFBVztBQUM5QixRQUFRLCtEQUFVLENBQUMsa0VBQVc7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsdUJBQXVCO0FBQ3ZEO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyx1QkFBdUI7QUFDdkQ7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLHVCQUF1QjtBQUN2RDtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsdUJBQXVCO0FBQ3ZEO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZVMkM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDJEQUFJOztBQUVaLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7VUN2Q0E7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOdUI7QUFDMEI7OztBQUdqRDtBQUNBLElBQUksZ0VBQVU7QUFDZCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAtZ2FtZS8uL3NyYy9zdHlsZS5jc3M/ZTMyMCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC1nYW1lLy4vc3JjL01vZHVsZXMvQUkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAtZ2FtZS8uL3NyYy9Nb2R1bGVzL0JvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZS1zaGlwLWdhbWUvLi9zcmMvTW9kdWxlcy9HYW1lLmpzIiwid2VicGFjazovL2JhdHRsZS1zaGlwLWdhbWUvLi9zcmMvTW9kdWxlcy9NZW51LmpzIiwid2VicGFjazovL2JhdHRsZS1zaGlwLWdhbWUvLi9zcmMvTW9kdWxlcy9TaGlwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC1nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZS1zaGlwLWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZS1zaGlwLWdhbWUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGUtc2hpcC1nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlLXNoaXAtZ2FtZS8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJjb25zdCBnZW5lcmF0ZUFJID0gKHNoaXAsIHNxdWFyZXMpID0+IHtcbiAgICBsZXQgZGlyZWN0aW9uO1xuICAgIGxldCByYW5kb21EaXJlY3Rpb24gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzaGlwLmRpcmVjdGlvbnMubGVuZ3RoKVxuICAgIGxldCBjdXJyZW50ID0gc2hpcC5kaXJlY3Rpb25zW3JhbmRvbURpcmVjdGlvbl1cblxuICAgIGlmIChyYW5kb21EaXJlY3Rpb24gPT09IDApIGRpcmVjdGlvbiA9IDFcbiAgICBpZiAocmFuZG9tRGlyZWN0aW9uID09PSAxKSBkaXJlY3Rpb24gPSAxMFxuXG4gICAgbGV0IHJhbmRvbVN0YXJ0ID0gTWF0aC5hYnMoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3F1YXJlcy5sZW5ndGggLSAoc2hpcC5kaXJlY3Rpb25zWzBdLmxlbmd0aCAqIGRpcmVjdGlvbikpKVxuXG4gICAgY29uc3QgaXNUYWtlbiA9IGN1cnJlbnQuc29tZShpbmRleCA9PiBzcXVhcmVzW3JhbmRvbVN0YXJ0ICsgaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucygndGFrZW4nKSlcbiAgICBjb25zdCBpc0F0UmlnaHRFZGdlID0gY3VycmVudC5zb21lKGluZGV4ID0+IChyYW5kb21TdGFydCArIGluZGV4KSAlIDEwID09PSAxMCAtIDEpXG4gICAgY29uc3QgaXNBdExlZnRFZGdlID0gY3VycmVudC5zb21lKGluZGV4ID0+IChyYW5kb21TdGFydCArIGluZGV4KSAlIDEwID09PSAwKVxuICAgIFxuICAgIGlmICghaXNUYWtlbiAmJiAhaXNBdFJpZ2h0RWRnZSAmJiAhaXNBdExlZnRFZGdlKSB7XG4gICAgICAgIGN1cnJlbnQuZm9yRWFjaCgoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHNxdWFyZXNbcmFuZG9tU3RhcnQgKyBpbmRleF0uY2xhc3NMaXN0LmFkZCgndGFrZW4nLCBzaGlwLm5hbWUpXG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgZ2VuZXJhdGVBSShzaGlwLCBzcXVhcmVzKVxuICAgIH1cbiAgICBcbn1cblxuZXhwb3J0IHsgZ2VuZXJhdGVBSSB9IiwiY29uc3QgY3JlYXRlQm9hcmQgPSAoZ3JpZCwgc3F1YXJlcykgPT4ge1xuICAgIGxldCBST1dTID0gMTA7XG4gICAgbGV0IENPTFMgPSAxMDtcbiAgICBcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IFJPV1MgKiBDT0xTOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgc3F1YXJlLmRhdGFzZXQuaWQgPSBpXG4gICAgICAgIGdyaWQuYXBwZW5kQ2hpbGQoc3F1YXJlKVxuICAgICAgICBzcXVhcmVzLnB1c2goc3F1YXJlKVxuXG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IHsgY3JlYXRlQm9hcmQgfSIsImltcG9ydCB7IGdlbmVyYXRlQUkgfSBmcm9tICcvc3JjL01vZHVsZXMvQUkuanMnXG5pbXBvcnQgeyBjcmVhdGVCb2FyZCB9IGZyb20gJy9zcmMvTW9kdWxlcy9Cb2FyZC5qcydcbmltcG9ydCB7IGNyZWF0ZVNoaXBzIH0gZnJvbSAnL3NyYy9Nb2R1bGVzL1NoaXBzLmpzJ1xuXG5cbmNvbnN0IGdhbWUgPSAoKSA9PiB7XG4gICAgbGV0IGN1cnJlbnRQbGF5ZXIgPSAndXNlcidcbiAgICBsZXQgZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICBsZXQgaXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICBjb25zdCB1c2VyU3F1YXJlcyA9IFtdXG4gICAgY29uc3QgY3B1U3F1YXJlcyA9IFtdXG4gICAgY29uc3QgcGxheWVyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKVxuICAgIGNvbnN0IGNvbXB1dGVyR3JpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcHUtYm9hcmQnKVxuICAgIGNvbnN0IHJvdGF0ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb3RhdGUtc2hpcCcpXG4gICAgY29uc3QgZGVzdHJveWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlc3Ryb3llci1jb250YWluZXInKVxuICAgIGNvbnN0IHN1Ym1hcmluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdWJtYXJpbmUtY29udGFpbmVyJylcbiAgICBjb25zdCBjcnVpc2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNydWlzZXItY29udGFpbmVyJylcbiAgICBjb25zdCBiYXR0bGVzaGlwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJhdHRsZXNoaXAtY29udGFpbmVyJylcbiAgICBjb25zdCBjYXJyaWVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcnJpZXItY29udGFpbmVyJylcblxuICAgIGNvbnN0IHR1cm5EaXNwbGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnR1cm4tZGlzcGxheScpXG4gICAgY29uc3QgZ2FtZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1pbmZvJylcblxuICAgIFxuICAgIGdlbmVyYXRlQm9hcmQoKVxuICAgIHBsYXllclNoaXAodXNlclNxdWFyZXMpXG4gICAgXG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUJvYXJkKCkge1xuICAgICAgICBjcmVhdGVCb2FyZChwbGF5ZXJHcmlkLCB1c2VyU3F1YXJlcylcbiAgICAgICAgY3JlYXRlQm9hcmQoY29tcHV0ZXJHcmlkLCBjcHVTcXVhcmVzKVxuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBhaUNob2ljZSgpIHtcbiAgICAgICAgZ2VuZXJhdGVBSShjcmVhdGVTaGlwcygpWzBdLCBjcHVTcXVhcmVzKVxuICAgICAgICBnZW5lcmF0ZUFJKGNyZWF0ZVNoaXBzKClbMV0sIGNwdVNxdWFyZXMpXG4gICAgICAgIGdlbmVyYXRlQUkoY3JlYXRlU2hpcHMoKVsyXSwgY3B1U3F1YXJlcylcbiAgICAgICAgZ2VuZXJhdGVBSShjcmVhdGVTaGlwcygpWzNdLCBjcHVTcXVhcmVzKVxuICAgICAgICBnZW5lcmF0ZUFJKGNyZWF0ZVNoaXBzKClbNF0sIGNwdVNxdWFyZXMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxheWVyUm90YXRlKCkge1xuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICBkZXN0cm95ZXIuY2xhc3NMaXN0LnRvZ2dsZSgnZGVzdHJveWVyLWNvbnRhaW5lci12ZXJ0aWNhbCcpXG4gICAgICAgICAgICBzdWJtYXJpbmUuY2xhc3NMaXN0LnRvZ2dsZSgnc3VibWFyaW5lLWNvbnRhaW5lci12ZXJ0aWNhbCcpXG4gICAgICAgICAgICBjcnVpc2VyLmNsYXNzTGlzdC50b2dnbGUoJ2NydWlzZXItY29udGFpbmVyLXZlcnRpY2FsJylcbiAgICAgICAgICAgIGJhdHRsZXNoaXAuY2xhc3NMaXN0LnRvZ2dsZSgnYmF0dGxlc2hpcC1jb250YWluZXItdmVydGljYWwnKVxuICAgICAgICAgICAgY2Fycmllci5jbGFzc0xpc3QudG9nZ2xlKCdjYXJyaWVyLWNvbnRhaW5lci12ZXJ0aWNhbCcpXG4gICAgICAgICAgICBpc0hvcml6b250YWwgPSBmYWxzZTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgZGVzdHJveWVyLmNsYXNzTGlzdC50b2dnbGUoJ2Rlc3Ryb3llci1jb250YWluZXItdmVydGljYWwnKVxuICAgICAgICAgICAgc3VibWFyaW5lLmNsYXNzTGlzdC50b2dnbGUoJ3N1Ym1hcmluZS1jb250YWluZXItdmVydGljYWwnKVxuICAgICAgICAgICAgY3J1aXNlci5jbGFzc0xpc3QudG9nZ2xlKCdjcnVpc2VyLWNvbnRhaW5lci12ZXJ0aWNhbCcpXG4gICAgICAgICAgICBiYXR0bGVzaGlwLmNsYXNzTGlzdC50b2dnbGUoJ2JhdHRsZXNoaXAtY29udGFpbmVyLXZlcnRpY2FsJylcbiAgICAgICAgICAgIGNhcnJpZXIuY2xhc3NMaXN0LnRvZ2dsZSgnY2Fycmllci1jb250YWluZXItdmVydGljYWwnKVxuICAgICAgICAgICAgaXNIb3Jpem9udGFsID0gdHJ1ZTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgcm90YXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheWVyUm90YXRlKSBcblxuICAgIGZ1bmN0aW9uIHBsYXllclNoaXAoc3F1YXJlcyl7XG4gICAgICAgIGxldCBkcmFnZ2VkU2hpcE5vZGU7XG4gICAgICAgIGxldCBzZWxlY3RlZFNoaXBJbmRleDtcbiAgICAgICAgbGV0IGRyYWdnZWRTaGlwO1xuICAgICAgICBsZXQgZHJhZ2dlZFNoaXBMZW5ndGg7XG4gICAgICAgIGNvbnN0IHNoaXBzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNoaXAnKVxuICAgICAgICBjb25zdCBzaGlwRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGlwLWRpc3BsYXknKVxuICAgICAgICBjb25zdCBzdGFydFJvdW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LXJvdW5kJylcbiAgICAgICAgY29uc3QgZ2FtZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1pbmZvJylcblxuICAgICAgICBzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICAgICAgICBzaGlwLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIGRyYWdTdGFydClcbiAgICAgICAgfSlcbiAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnb3ZlcicsIGRyYWdPdmVyKVxuICAgICAgICB9KVxuICAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbnRlcicsIGRyYWdFbnRlcilcbiAgICAgICAgfSlcbiAgICAgICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgICAgICAgIHNxdWFyZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCBkcmFnTGVhdmUpXG4gICAgICAgIH0pXG4gICAgICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICBzcXVhcmUuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIGRyYWdEcm9wKVxuICAgICAgICB9KVxuICAgICAgICBzcXVhcmVzLmZvckVhY2goKHNxdWFyZSkgPT4ge1xuICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCBkcmFnRW5kKVxuICAgICAgICB9KVxuXG4gICAgICAgIHNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgICAgICAgIHNoaXAuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFNoaXBJbmRleCA9IGUudGFyZ2V0LmlkXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgICBmdW5jdGlvbiBkcmFnU3RhcnQoZSkge1xuICAgICAgICAgICAgZHJhZ2dlZFNoaXBOb2RlID0gdGhpcy5jaGlsZE5vZGVzLml0ZW0oZS50YXJnZXQpXG4gICAgICAgICAgICBkcmFnZ2VkU2hpcCA9IHRoaXM7XG4gICAgICAgICAgICBkcmFnZ2VkU2hpcExlbmd0aCA9IHRoaXMuY2hpbGROb2Rlcy5sZW5ndGhcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gZHJhZ092ZXIoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdFbnRlcihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gZHJhZ0xlYXZlKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2RyYWdMZWF2ZScsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdEcm9wKCkge1xuICAgICAgICAgICAgbGV0IHNoaXBJZCA9IGRyYWdnZWRTaGlwLmZpcnN0Q2hpbGQuaWRcbiAgICAgICAgICAgIGxldCBzaGlwQ2xhc3MgPSBzaGlwSWQuc2xpY2UoMCwgLTIpXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRTaGlwSW5kZXggPT09IGRyYWdnZWRTaGlwLmZpcnN0Q2hpbGQuaWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlc1twYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpICsgaV0uY2xhc3NMaXN0LmFkZCgndGFrZW4nLCBzaGlwQ2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVzW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgKyAxMCAqIGldLmNsYXNzTGlzdC5hZGQoJ3Rha2VuJywgc2hpcENsYXNzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRyYWdnZWRTaGlwLmNoaWxkTm9kZXNbMV0gJiYgc2VsZWN0ZWRTaGlwSW5kZXggPT09IGRyYWdnZWRTaGlwLmNoaWxkTm9kZXNbMV0uaWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlc1twYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gMSArIGldLmNsYXNzTGlzdC5hZGQoJ3Rha2VuJywgc2hpcENsYXNzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlc1twYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gMSArIDEwICogaV0uY2xhc3NMaXN0LmFkZCgndGFrZW4nLCBzaGlwQ2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZHJhZ2dlZFNoaXAuY2hpbGROb2Rlc1syXSAmJiBzZWxlY3RlZFNoaXBJbmRleCA9PT0gZHJhZ2dlZFNoaXAuY2hpbGROb2Rlc1syXS5pZCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJhZ2dlZFNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVzW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSAyICsgaV0uY2xhc3NMaXN0LmFkZCgndGFrZW4nLCBzaGlwQ2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcXVhcmVzW3BhcnNlSW50KHRoaXMuZGF0YXNldC5pZCkgLSAyICsgMTAgKiBpXS5jbGFzc0xpc3QuYWRkKCd0YWtlbicsIHNoaXBDbGFzcylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkcmFnZ2VkU2hpcC5jaGlsZE5vZGVzWzNdICYmIHNlbGVjdGVkU2hpcEluZGV4ID09PSBkcmFnZ2VkU2hpcC5jaGlsZE5vZGVzWzNdLmlkKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkcmFnZ2VkU2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZXNbcGFyc2VJbnQodGhpcy5kYXRhc2V0LmlkKSAtIDMgKyBpXS5jbGFzc0xpc3QuYWRkKCd0YWtlbicsIHNoaXBDbGFzcylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNxdWFyZXNbcGFyc2VJbnQodGhpcy5kYXRhc2V0LmlkKSAtIDMgKyAxMCAqIGldLmNsYXNzTGlzdC5hZGQoJ3Rha2VuJywgc2hpcENsYXNzKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRyYWdnZWRTaGlwLmNoaWxkTm9kZXNbNF0gJiYgc2VsZWN0ZWRTaGlwSW5kZXggPT09IGRyYWdnZWRTaGlwLmNoaWxkTm9kZXNbNF0uaWQpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyYWdnZWRTaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlc1twYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gNCArIGldLmNsYXNzTGlzdC5hZGQoJ3Rha2VuJywgc2hpcENsYXNzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3F1YXJlc1twYXJzZUludCh0aGlzLmRhdGFzZXQuaWQpIC0gNCArIDEwICogaV0uY2xhc3NMaXN0LmFkZCgndGFrZW4nLCBzaGlwQ2xhc3MpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzaGlwRGlzcGxheS5yZW1vdmVDaGlsZChkcmFnZ2VkU2hpcClcbiAgICAgICAgICAgIGlmIChzaGlwRGlzcGxheS5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGdhbWVJbmZvLmlubmVySFRNTCA9ICcnXG4gICAgICAgICAgICAgICAgYWlDaG9pY2UoKVxuICAgICAgICAgICAgICAgIHN0YXJ0Um91bmQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzdGFydFJvdW5kKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgXG4gICAgICAgIGZ1bmN0aW9uIGRyYWdFbmQoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZHJhZ0VuZCcsIHRoaXMpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIFxuXG4gICAgZnVuY3Rpb24gcGxheUdhbWUoKSB7XG4gICAgICAgIGlmIChnYW1lT3ZlcikgcmV0dXJuO1xuICAgICAgICBpZiAoY3VycmVudFBsYXllciA9PT0gJ3VzZXInKSB7XG4gICAgICAgICAgICB0dXJuRGlzcGxheS5pbm5lckhUTUwgPSAnWW91ciBHbydcbiAgICAgICAgICAgIGNwdVNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV2ZWFsU3F1YXJlKHNxdWFyZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFBsYXllciA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgICAgICAgdHVybkRpc3BsYXkuaW5uZXJIVE1MID0gJ0NvbXB1dGVycyBHbydcbiAgICAgICAgICAgIHNldFRpbWVvdXQgKGNvbXB1dGVyR28sIDEwMDApXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydFJvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGxheUdhbWUpXG5cblxuICAgIGxldCBkZXN0cm95ZXJDb3VudCA9IDA7XG4gICAgbGV0IHN1Ym1hcmluZUNvdW50ID0gMDtcbiAgICBsZXQgY3J1aXNlckNvdW50ID0gMDtcbiAgICBsZXQgYmF0dGxlc2hpcENvdW50ID0gMDtcbiAgICBsZXQgY2FycmllckNvdW50ID0gMDtcblxuICAgIGZ1bmN0aW9uIHJldmVhbFNxdWFyZShzcXVhcmUpIHtcbiAgICAgICAgaWYgKCFzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdib29tJykpIHtcbiAgICAgICAgICAgIGlmICghc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnYm9vbScpICYmIHNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rlc3Ryb3llcicpKSBkZXN0cm95ZXJDb3VudCsrXG4gICAgICAgICAgICBpZiAoIXNxdWFyZS5jbGFzc0xpc3QuY29udGFpbnMoJ2Jvb20nKSAmJiBzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdzdWJtYXJpbmUnKSkgc3VibWFyaW5lQ291bnQrK1xuICAgICAgICAgICAgaWYgKCFzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdib29tJykgJiYgc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnY3J1aXNlcicpKSBjcnVpc2VyQ291bnQrK1xuICAgICAgICAgICAgaWYgKCFzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdib29tJykgJiYgc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlc2hpcCcpKSBiYXR0bGVzaGlwQ291bnQrK1xuICAgICAgICAgICAgaWYgKCFzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCdib29tJykgJiYgc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygnY2FycmllcicpKSBjYXJyaWVyQ291bnQrK1xuXG4gICAgICAgICAgICBpZiAoc3F1YXJlLmNsYXNzTGlzdC5jb250YWlucygndGFrZW4nKSkge1xuICAgICAgICAgICAgICAgIHNxdWFyZS5jbGFzc0xpc3QuYWRkKCdib29tJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzcXVhcmUuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YWtlbicpKSB7XG4gICAgICAgICAgICAgICAgc3F1YXJlLmNsYXNzTGlzdC5hZGQoJ21pc3NlZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tGb3JXaW5zKClcbiAgICAgICAgY3VycmVudFBsYXllciA9ICdjb21wdXRlcidcbiAgICAgICAgcGxheUdhbWUoKVxuICAgIH1cblxuICAgIGxldCBjcHVEZXN0cm95ZXJDb3VudCA9IDA7XG4gICAgbGV0IGNwdVN1Ym1hcmluZUNvdW50ID0gMDtcbiAgICBsZXQgY3B1Q3J1aXNlckNvdW50ID0gMDtcbiAgICBsZXQgY3B1QmF0dGxlc2hpcENvdW50ID0gMDtcbiAgICBsZXQgY3B1Q2FycmllckNvdW50ID0gMDtcblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVyR28oKSB7XG4gICAgICAgIGxldCByYW5kb20gPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB1c2VyU3F1YXJlcy5sZW5ndGgpXG4gICAgICAgIGlmICghdXNlclNxdWFyZXNbcmFuZG9tXS5jbGFzc0xpc3QuY29udGFpbnMoJ3Rha2VuJykpIHtcbiAgICAgICAgICAgIHVzZXJTcXVhcmVzW3JhbmRvbV0uY2xhc3NMaXN0LmFkZCgnbWlzc2VkJylcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXVzZXJTcXVhcmVzW3JhbmRvbV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdib29tJykpIHtcbiAgICAgICAgICAgIHVzZXJTcXVhcmVzW3JhbmRvbV0uY2xhc3NMaXN0LmFkZCgnYm9vbScpXG4gICAgICAgICAgICBpZiAodXNlclNxdWFyZXNbcmFuZG9tXS5jbGFzc0xpc3QuY29udGFpbnMoJ2Rlc3Ryb3llcicpKSBjcHVEZXN0cm95ZXJDb3VudCsrXG4gICAgICAgICAgICBpZiAodXNlclNxdWFyZXNbcmFuZG9tXS5jbGFzc0xpc3QuY29udGFpbnMoJ3N1Ym1hcmluZScpKSBjcHVTdWJtYXJpbmVDb3VudCsrXG4gICAgICAgICAgICBpZiAodXNlclNxdWFyZXNbcmFuZG9tXS5jbGFzc0xpc3QuY29udGFpbnMoJ2NydWlzZXInKSkgY3B1Q3J1aXNlckNvdW50KytcbiAgICAgICAgICAgIGlmICh1c2VyU3F1YXJlc1tyYW5kb21dLmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlc2hpcCcpKSBjcHVCYXR0bGVzaGlwQ291bnQrK1xuICAgICAgICAgICAgaWYgKHVzZXJTcXVhcmVzW3JhbmRvbV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdjYXJyaWVyJykpIGNwdUNhcnJpZXJDb3VudCsrXG4gICAgICAgICAgICBjaGVja0ZvcldpbnMoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29tcHV0ZXJHbygpXG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50UGxheWVyID0gJ3VzZXInXG4gICAgICAgIHR1cm5EaXNwbGF5LmlubmVySFRNTCA9ICdZb3VyIEdvJ1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBjaGVja0ZvcldpbnMoKSB7XG4gICAgICAgIGlmIChkZXN0cm95ZXJDb3VudCA9PT0gMikge1xuICAgICAgICAgICAgc2hpcFN0YXR1cygnWW91IFN1bmsgVGhlIENvbXB1dGVycyBEZXN0cm95ZXInKVxuICAgICAgICAgICAgZGVzdHJveWVyQ291bnQgPSAxMFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdWJtYXJpbmVDb3VudCA9PT0gMykge1xuICAgICAgICAgICAgc2hpcFN0YXR1cygnWW91IFN1bmsgVGhlIENvbXB1dGVycyBTdWJtYXJpbmUnKVxuICAgICAgICAgICAgc3VibWFyaW5lQ291bnQgPSAxMFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjcnVpc2VyQ291bnQgPT09IDMpIHtcbiAgICAgICAgICAgIHNoaXBTdGF0dXMoJ1lvdSBTdW5rIFRoZSBDb21wdXRlcnMgQ3J1aXNlcicpXG4gICAgICAgICAgICBjcnVpc2VyQ291bnQgPSAxMFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChiYXR0bGVzaGlwQ291bnQgPT09IDQpIHtcbiAgICAgICAgICAgIHNoaXBTdGF0dXMoJ1lvdSBTdW5rIFRoZSBDb21wdXRlcnMgQmF0dGxlc2hpcCcpXG4gICAgICAgICAgICBiYXR0bGVzaGlwQ291bnQgPSAxMFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYXJyaWVyQ291bnQgPT09IDUpIHtcbiAgICAgICAgICAgIHNoaXBTdGF0dXMoJ1lvdSBTdW5rIFRoZSBDb21wdXRlcnMgQ2FycmllcicpXG4gICAgICAgICAgICBjYXJyaWVyQ291bnQgPSAxMFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjcHVEZXN0cm95ZXJDb3VudCA9PT0gMikge1xuICAgICAgICAgICAgc2hpcFN0YXR1cygnQ29tcHV0ZXIgU3VuayBZb3VyIERlc3Ryb3llcicpXG4gICAgICAgICAgICBjcHVEZXN0cm95ZXJDb3VudCA9IDEwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNwdVN1Ym1hcmluZUNvdW50ID09PSAzKSB7XG4gICAgICAgICAgICBzaGlwU3RhdHVzKCdDb21wdXRlciBTdW5rIFlvdXIgU3VibWFyaW5lJylcbiAgICAgICAgICAgIGNwdVN1Ym1hcmluZUNvdW50ID0gMTBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3B1Q3J1aXNlckNvdW50ID09PSAzKSB7XG4gICAgICAgICAgICBzaGlwU3RhdHVzKCdDb21wdXRlciBTdW5rIFlvdXIgQ3J1aXNlcicpXG4gICAgICAgICAgICBjcHVDcnVpc2VyQ291bnQgPSAxMFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjcHVCYXR0bGVzaGlwQ291bnQgPT09IDQpIHtcbiAgICAgICAgICAgIHNoaXBTdGF0dXMoJ0NvbXB1dGVyIFN1bmsgWW91ciBCYXR0bGVzaGlwJylcbiAgICAgICAgICAgIGNwdUJhdHRsZXNoaXBDb3VudCA9IDEwXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNwdUNhcnJpZXJDb3VudCA9PT0gNSkge1xuICAgICAgICAgICAgc2hpcFN0YXR1cygnQ29tcHV0ZXIgU3VuayBZb3VyIENhcnJpZXInKVxuICAgICAgICAgICAgY3B1Q2FycmllckNvdW50ID0gMTBcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoZGVzdHJveWVyQ291bnQgKyBzdWJtYXJpbmVDb3VudCArIGNydWlzZXJDb3VudCArIGJhdHRsZXNoaXBDb3VudCArIGNhcnJpZXJDb3VudCkgPT09IDUwKSB7XG4gICAgICAgICAgICBnYW1lSW5mby5pbm5lckhUTUwgPSAnWU9VIFdJTidcbiAgICAgICAgICAgIGdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoY3B1RGVzdHJveWVyQ291bnQgKyBjcHVTdWJtYXJpbmVDb3VudCArIGNwdUNydWlzZXJDb3VudCArIGNwdUJhdHRsZXNoaXBDb3VudCArIGNwdUNhcnJpZXJDb3VudCkgPT09IDUwKSB7XG4gICAgICAgICAgICBnYW1lSW5mby5pbm5lckhUTUwgPSAnQ1BVIFdJTlMnXG4gICAgICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNoaXBTdGF0dXMobWVzc2FnZSkge1xuICAgICAgICBnYW1lSW5mby5pbm5lckhUTUwgPSBtZXNzYWdlXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZ2FtZUluZm8uaW5uZXJIVE1MID0gJydcbiAgICAgICAgfSwgMjAwMClcbiAgICB9XG59XG5cbmV4cG9ydCB7IGdhbWUgfSIsImltcG9ydCB7IGdhbWUgfSBmcm9tICcvc3JjL01vZHVsZXMvR2FtZS5qcydcblxuY29uc3QgbWVudU9wdGlvbiA9ICgpID0+IHtcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydEdhbWUnKVxuICAgIGNvbnN0IG1lbnVPcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudS1vcHRpb24nKVxuICAgIGNvbnN0IG92ZXJMYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3ZlcmxheScpXG4gICAgY29uc3QgZ2FtZUluZm8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1pbmZvJylcbiAgICBtZW51T3B0aW9uLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXG5cbiAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICBnYW1lSW5mby5pbm5lckhUTUwgPSAnU2V0IFlvdXIgU2hpcHMnXG4gICAgICAgIG1lbnVPcHRpb24uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcbiAgICAgICAgb3ZlckxheS5yZW1vdmUoKVxuICAgICAgICBnYW1lKClcblxuICAgIH0pXG59XG5cbmV4cG9ydCB7IG1lbnVPcHRpb24gfSIsImNvbnN0IGNyZWF0ZVNoaXBzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNoaXBBcnJheSA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2Rlc3Ryb3llcicsXG4gICAgICAgICAgICBkaXJlY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgWzAsIDFdLFxuICAgICAgICAgICAgICAgIFswLCAxMF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ3N1Ym1hcmluZScsXG4gICAgICAgICAgICBkaXJlY3Rpb25zOiBbXG4gICAgICAgICAgICAgICAgWzAsIDEsIDJdLFxuICAgICAgICAgICAgICAgIFswLCAxMCwgMjBdXG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjcnVpc2VyJyxcbiAgICAgICAgICAgIGRpcmVjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICBbMCwgMSwgMl0sXG4gICAgICAgICAgICAgICAgWzAsIDEwLCAyMF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2JhdHRsZXNoaXAnLFxuICAgICAgICAgICAgZGlyZWN0aW9uczogW1xuICAgICAgICAgICAgICAgIFswLCAxLCAyLCAzXSxcbiAgICAgICAgICAgICAgICBbMCwgMTAsIDIwLCAzMF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2NhcnJpZXInLFxuICAgICAgICAgICAgZGlyZWN0aW9uczogW1xuICAgICAgICAgICAgICAgIFswLCAxLCAyLCAzLCA0XSxcbiAgICAgICAgICAgICAgICBbMCwgMTAsIDIwLCAzMCwgNDBdXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdXG4gICAgcmV0dXJuIHNoaXBBcnJheVxufVxuXG5cbmV4cG9ydCB7IGNyZWF0ZVNoaXBzIH0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnL3NyYy9zdHlsZS5jc3MnXG5pbXBvcnQgeyBtZW51T3B0aW9uIH0gZnJvbSAnL3NyYy9Nb2R1bGVzL01lbnUuanMnXG5cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBtZW51T3B0aW9uKClcbn0pXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==