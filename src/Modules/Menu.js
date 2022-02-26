import { game } from '/src/Modules/Game.js'

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
        game()

    })
}

export { menuOption }