// Buttons
const resetButton = document.getElementById('reset-button')
const resetScoresButton = document.getElementById('reset-scores-button')
const pickaxeImg = document.getElementById('pickaxe-img')
// Displays
const lootText = document.getElementById('loot-text')
const blockImg = document.getElementById('block-img')
const blockWeight = document.getElementById('block-weight')
const blockWeightUnitDisplay = document.getElementById('block-weight-unit-display')
const minedBlocksDisplay = document.getElementById('mined-blocks-display')
const currentWeightDisplay = document.getElementById('current-weight-display')
const maxWeightDisplay = document.getElementById('max-weight-display')
const scoreDisplay = document.getElementById('score-display')
const scoresDisplay = document.getElementById('scores-display')
// Inputs
const initialsInput = document.getElementById('initials')

// Data
const blocks = {
    stone: {
        name: 'stone',
        text: 'You got stone!',
        img: 'img/stone.png',
        weight: 20,
        score: 1
    },
    copper: {
        name: 'copper',
        text: 'You got copper!',
        img: 'img/copper.png',
        weight: 5,
        score: 5
    },
    tin: {
        name: 'tin',
        text: 'You got tin!',
        img: 'img/tin.png',
        weight: 3,
        score: 10
    },
    iron: {
        name: 'iron',
        text: 'You got iron!',
        img: 'img/iron.png',
        weight: 10,
        score: 20
    },
    silver: {
        name: 'silver',
        text: 'You got silver!',
        img: 'img/silver.png',
        weight: 2,
        score: 40
    },
    gold: {
        name: 'gold',
        text: 'You got gold!',
        img: 'img/gold.png',
        weight: 1,
        score: 100
    },
    win: {
        name: 'win',
        text: 'You WIN!',
        img: 'img/win.gif',
        weight: ''
    },
    lose: {
        name: 'lose',
        text: 'You LOSE!',
        img: 'img/lose.png',
        weight: ''
    },
    start: {
        name: 'start',
        text: 'Click the pickaxe to mine!',
        img: '',
        weight: '0'
    }
}
const maxWeight = 100
const weightUnit = 'kg'

// States
let minedBlocks = []
let currentWeight = 0
let score = 0
let scores = []

// On load
getLocalStorage()
setupDisplays()

// Functions
function getLocalStorage() {
    if (localStorage.getItem('minecartScores') === null) {
        localStorage.minecartScores = JSON.stringify(scores)
    } else {
        scores = JSON.parse(localStorage.getItem('minecartScores'))
    }
}

function setupDisplays() {
    if (scores.length != 0) scoresDisplay.innerHTML = scores.map(v => v.element).join('')
    maxWeightDisplay.innerText = maxWeight
}

function mine() {
    const random = Math.floor(Math.random() * 100) + 1
    if (random <= 30) {
        return blocks.stone
    } else if (random <= 50) {
        return blocks.copper
    } else if (random <= 70) {
        return blocks.tin
    } else if (random <= 85) {
        return blocks.iron
    } else if (random <= 95) {
        return blocks.silver
    } else {
        return blocks.gold
    }
}

function updateLootDisplay(block) {
    lootText.innerText = block.text
    blockImg.innerHTML = `<img id="block-${block.name}" src="${block.img}">`
    blockWeight.innerText = block.weight
}

function updateMinecart(block) {
    minedBlocks.push(`<img src="${block.img}" style="height: 25px; width: 25px;">`)
    minedBlocksDisplay.innerHTML = minedBlocks.join('')
    currentWeight += block.weight
    currentWeightDisplay.innerText = currentWeight
}

function updateScore(block) {
    score += block.score
    scoreDisplay.innerText = score
}

function checkGameState() {
    if (currentWeight === maxWeight) runWin()
    if (currentWeight > maxWeight) runLose()
    // for testing
    // runWin()
    // runLose()
}

function runWin() {
    updateLootDisplay(blocks.win)
    blockWeightUnitDisplay.innerText = 'PERFECTLY LOADED!'
    saveScore()
}

function runLose() {
    updateLootDisplay(blocks.lose)
    blockWeightUnitDisplay.innerText = 'OVERLOADED!'
}

function saveScore() {
    scores.push({ score: score, element: `<li>${initialsInput.value.toUpperCase()}: ${score}</li>` })
    scores.sort((a, b) => b.score - a.score)
    localStorage.minecartScores = JSON.stringify(scores)
    scoresDisplay.innerHTML = scores.map(v => v.element).join('')
}

function resetGame() {
    score = 0
    scoreDisplay.innerText = score
    currentWeight = 0
    currentWeightDisplay.innerText = currentWeight
    blockWeightUnitDisplay.innerText = weightUnit
    minedBlocks = []
    minedBlocksDisplay.innerHTML = minedBlocks.join('')
    updateLootDisplay(blocks.start)
}

function resetScores() {
    scores = []
    localStorage.minecartScores = JSON.stringify(scores)
    scoresDisplay.innerHTML = 'No scores yet!'
}

// Event Listeners
pickaxeImg.addEventListener('mousedown', () => {
    pickaxeImg.src = 'img/pickaxe2.png'
})

pickaxeImg.addEventListener('mouseup', () => {
    const block = mine()
    updateLootDisplay(block)
    updateMinecart(block)
    updateScore(block)
    pickaxeImg.src = 'img/pickaxe1.png'
    checkGameState()
})

resetButton.addEventListener('click', () => {
    resetGame()
})

resetScoresButton.addEventListener('click', () => {
    resetScores()
})


