// Buttons
const resetButton = document.getElementById('reset-button')
const resetScoresButton = document.getElementById('reset-scores-button')
const pickaxeImg = document.getElementById('pickaxe-img')
// Displays
const lootText = document.getElementById('loot-text')
const blockImg = document.getElementById('block-img')
const blockWeight = document.getElementById('block-weight')
const minecartBlocks = document.getElementById('minecart-blocks')
const currentWeight = document.getElementById('current-weight')
const statusText = document.getElementById('status-text')
const maxWeightDOM = document.getElementById('max-weight')

// Data
const blocks = {
    stone: {
        text: 'You got stone!',
        img: 'img/stone.png',
        weight: '20'
    },
    copper: {
        text: 'You got copper!',
        img: 'img/copper.png',
        weight: '5'
    },
    tin: {
        text: 'You got tin!',
        img: 'img/tin.png',
        weight: '3'
    },
    iron: {
        text: 'You got iron!',
        img: 'img/iron.png',
        weight: '10'
    },
    silver: {
        text: 'You got silver!',
        img: 'img/silver.png',
        weight: '2'
    },
    gold: {
        text: 'You got gold!',
        img: 'img/gold.png',
        weight: '1'
    },
}
const maxWeight = 100
maxWeightDOM.innerText = maxWeight

// States
let minedBlocks = []

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

function updateMinecartDisplay(block) {
    minedBlocks.push(`<img src="${block.img}" style="height: 25px; width: 25px;">`)
    minecartBlocks.innerHTML = minedBlocks
    currentWeight.innerText = parseInt(currentWeight.innerText, 10) + parseInt(block.weight, 10)
}

// Event Listeners
pickaxeImg.addEventListener('mousedown', () => {
    pickaxeImg.src = 'img/pickaxe2.png'
})

pickaxeImg.addEventListener('mouseup', () => {
    const block = mine()
    updateLootDisplay(block)
    updateMinecartDisplay(block)
    pickaxeImg.src = 'img/pickaxe1.png'
})


