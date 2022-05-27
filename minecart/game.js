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

// Data
const blocks = {
    stone: {
        text: 'You got stone!',
        img: 'img/stone.png',
        weight: 20
    },
    copper: {
        text: 'You got copper!',
        img: 'img/copper.png',
        weight: 5
    },
    tin: {
        text: 'You got tin!',
        img: 'img/tin.png',
        weight: 3
    },
    iron: {
        text: 'You got iron!',
        img: 'img/iron.png',
        weight: 10
    },
    silver: {
        text: 'You got silver!',
        img: 'img/silver.png',
        weight: 2
    },
    gold: {
        text: 'You got gold!',
        img: 'img/gold.png',
        weight: 1
    },
    win: {
        text: 'You WIN!',
        img: 'img/win.png',
        weight: ''
    },
    lose: {
        text: 'You LOSE!',
        img: 'img/lose.png',
        weight: ''
    }
}
const maxWeight = 100

// States
let minedBlocks = []
let currentWeight = 0
maxWeightDisplay.innerText = maxWeight

// Functions
function mine() {
    const random = Math.floor(Math.random() * 100) + 1
    if (random <= 50) {
        return blocks.stone
    } else if (random <= 75) {
        return blocks.copper
    } else if (random <= 75) {
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
    blockImg.innerHTML = `<img src="${block.img}">`
    blockWeight.innerText = block.weight
}

function updateMinecart(block) {
    minedBlocks.push(`<img src="${block.img}" style="height: 25px; width: 25px;">`)
    minedBlocksDisplay.innerHTML = minedBlocks.join('')
    currentWeight += block.weight
    currentWeightDisplay.innerText = currentWeight
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
}

function runLose() {
    updateLootDisplay(blocks.lose)
    blockWeightUnitDisplay.innerText = 'OVERLOADED!'
}

// Event Listeners
pickaxeImg.addEventListener('mousedown', () => {
    pickaxeImg.src = 'img/pickaxe2.png'
})

pickaxeImg.addEventListener('mouseup', () => {
    const block = mine()
    updateLootDisplay(block)
    updateMinecart(block)
    pickaxeImg.src = 'img/pickaxe1.png'
    checkGameState()
})


