// Buttons
const resetButton = document.getElementById('reset-button')
const resetScoresButton = document.getElementById('reset-scores-button')
const resetAchievementsButton = document.getElementById('reset-achievements-button')
const pickaxeImg = document.getElementById('pickaxe-img')
const muteButton = document.getElementById('mute-button')
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
const achievementsDisplay = document.getElementById('achievements-display')
const achievementUnlockedDisplay = document.getElementById('achievement-unlocked-display')
// Inputs
const initialsInput = document.getElementById('initials')

// Data
const blocks = {
    stone: {
        name: 'stone',
        text: 'You got stone!',
        img: 'img/blocks/stone.png',
        weight: 20,
        score: 1
    },
    copper: {
        name: 'copper',
        text: 'You got copper!',
        img: 'img/blocks/copper.png',
        weight: 5,
        score: 5
    },
    tin: {
        name: 'tin',
        text: 'You got tin!',
        img: 'img/blocks/tin.png',
        weight: 3,
        score: 10
    },
    iron: {
        name: 'iron',
        text: 'You got iron!',
        img: 'img/blocks/iron.png',
        weight: 10,
        score: 20
    },
    silver: {
        name: 'silver',
        text: 'You got silver!',
        img: 'img/blocks/silver.png',
        weight: 2,
        score: 40
    },
    gold: {
        name: 'gold',
        text: 'You got gold!',
        img: 'img/blocks/gold.png',
        weight: 1,
        score: 100
    },
    diamond: {
        name: 'diamond',
        text: 'You got diamond!',
        img: 'img/blocks/diamond.png',
        weight: 0,
        score: 1000
    },
    win: {
        name: 'win',
        text: 'You WIN!',
        img: 'img/blocks/win.gif',
        weight: ''
    },
    lose: {
        name: 'lose',
        text: 'You LOSE!',
        img: 'img/blocks/lose.png',
        weight: ''
    },
    start: {
        name: 'start',
        text: 'Click the pickaxe to mine!',
        img: '',
        weight: '0'
    }
}
const achievements = {
    win: {
        name: 'Fireworks!',
        description: 'Win a game.',
        icon: 'img/achievements/win.png',
        unlocked: false
    },
    keepMining: {
        name: 'Till the wheels fall off',
        description: 'Mine 50 times after the game ends.',
        icon: 'img/achievements/keepMining.png',
        unlocked: false,
        minedAfter: 0
    },
    play100: {
        name: 'Veteran Miner',
        description: 'Play 100 games.',
        icon: 'img/achievements/play.png',
        unlocked: false,
        gamesPlayed: 0
    },
    score69: {
        name: 'Noice',
        description: 'Score 69.',
        icon: 'img/achievements/score69.png',
        unlocked: false
    },
    stone: {
        name: 'That\'s all you got?',
        description: 'Win with only stone.',
        icon: 'img/achievements/stone.png',
        unlocked: false
    },
    diamonds: {
        name: 'Diamonds!',
        description: 'Mine a diamond.',
        icon: 'img/achievements/diamond.png',
        unlocked: false
    },
    win100: {
        name: 'Dedication!',
        description: 'Win 100 games.',
        icon: 'img/achievements/win.png',
        unlocked: false,
        gamesWon: 0
    }
}
const maxWeight = 100
const weightUnit = 'kg'

// States
let minedBlocks = []
let currentWeight = 0
let score = 0
let scores = []
let pickActive = true
let currentAchievements = {}
let mute = false

// On load
getLocalStorage()
setupDisplays()
currentAchievements.keepMining.minedAfter = 0

// Functions
function getLocalStorage() {
    if (localStorage.getItem('minecartScores') === null) {
        localStorage.minecartScores = JSON.stringify(scores)
    } else {
        scores = JSON.parse(localStorage.getItem('minecartScores'))
    }
    if (localStorage.getItem('minecartAchievements') === null) localStorage.minecartAchievements = JSON.stringify(achievements)
    currentAchievements = JSON.parse(localStorage.getItem('minecartAchievements'))
    // if (currentAchievements.length !== achievements.length) addNewAchievements()
}

function setupDisplays() {
    if (scores.length != 0) scoresDisplay.innerHTML = scores.map(v => v.element).join('')
    maxWeightDisplay.innerText = maxWeight
    updateAchievementsDisplay()
}

function updateAchievementsDisplay() {
    achievementsDisplay.innerHTML = Object.values(currentAchievements).map(achievement => buildAchievement(achievement)).join('')
}

function buildAchievement(achievement) {
    if (achievement.unlocked) return `<div class="achievement"><img src="${achievement.icon}"><div class="achievement-text-container"><p>${achievement.name}</p><p class="achievement-desc">${achievement.description}</p></div></div>`
    return `<div class="achievement achievement-locked"><img src="${achievement.icon}"><div class="achievement-text-container"><p>${achievement.name}</p><p class="achievement-desc">Locked</p></div></div>`
}

// function addNewAchievements() {

// }

function runPickaxe() {
    pickaxeImg.classList = 'pickaxe1'
    if (!currentAchievements.keepMining.unlocked && !pickActive) runKeepMiningAchievement()
    if (!pickActive) return
    const block = mine()
    playSound('mine')
    updateLootDisplay(block)
    updateMinecart(block)
    updateScore(block)
    checkGameState()
    if (block.name === 'diamond' && !currentAchievements.diamonds.unlocked) runDiamondsAchievement()
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
        const diamondRandom = Math.floor(Math.random() * 100) + 1
        if (diamondRandom === 100) return blocks.diamond
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
    // score = 69
    // runWin()
    // runLose()
}

function runWin() {
    pickActive = false
    updateLootDisplay(blocks.win)
    blockWeightUnitDisplay.innerText = 'PERFECTLY LOADED!'
    saveScore()
    if (!currentAchievements.win.unlocked) runWinAchievement()
    if (!currentAchievements.win100.unlocked) runWin100Achievement()
    if (!currentAchievements.play100.unlocked) runPlay100Achievement()
    if (!currentAchievements.score69.unlocked) runScore69Achievement()
    if (!currentAchievements.stone.unlocked) runStoneAchievement()
}

function runLose() {
    pickActive = false
    updateLootDisplay(blocks.lose)
    blockWeightUnitDisplay.innerText = 'OVERLOADED!'
    if (!currentAchievements.play100.unlocked) runPlay100Achievement()
}

function saveScore() {
    scores.push({ score: score, element: `<li>${initialsInput.value.toUpperCase()}: ${score}</li>` })
    scores.sort((a, b) => b.score - a.score)
    localStorage.minecartScores = JSON.stringify(scores)
    scoresDisplay.innerHTML = scores.map(v => v.element).join('')
}

function updateAchievements() {
    localStorage.minecartAchievements = JSON.stringify(currentAchievements)
    updateAchievementsDisplay()
}

function resetGame() {
    if (score === 0) return
    score = 0
    scoreDisplay.innerText = score
    currentWeight = 0
    currentWeightDisplay.innerText = currentWeight
    blockWeightUnitDisplay.innerText = weightUnit
    minedBlocks = []
    minedBlocksDisplay.innerHTML = minedBlocks.join('')
    updateLootDisplay(blocks.start)
    pickActive = true
    currentAchievements.keepMining.minedAfter = 0
    playSound('resetGame')
}

function resetScores() {
    scores = []
    localStorage.minecartScores = JSON.stringify(scores)
    scoresDisplay.innerHTML = 'No scores yet!'
}

function resetAchievements() {
    localStorage.minecartAchievements = JSON.stringify(achievements)
    currentAchievements = JSON.parse(localStorage.getItem('minecartAchievements'))
    updateAchievementsDisplay()
}

function displayAchievement(achievement) {
    achievementUnlockedDisplay.innerHTML = `<h3>Achievement Unlocked!</h3><span>&times;</span><div class="achievement"><img src="${achievement.icon}"><div class="achievement-text-container"><p>${achievement.name}</p><p class="achievement-desc">${achievement.description}</p></div></div>`
    achievementUnlockedDisplay.classList = ''
}

function playSound(sound) {
    if (mute) return
    const sfx = new Audio(`sfx/${sound}.mp3`)
    sfx.play()
}

function toggleMute() {
    if (mute === false) {
        mute = true
        muteButton.innerText = 'Unmute'
    } else {
        mute = false
        muteButton.innerText = 'Mute'
    }
}

// Achievement Functions
function runWinAchievement() {
    currentAchievements.win.unlocked = true
    displayAchievement(achievements.win)
    updateAchievements()
}

function runWin100Achievement() {
    currentAchievements.win100.gamesWon += 1
    if (currentAchievements.win100.gamesWon === 100) {
        currentAchievements.win100.unlocked = true
        displayAchievement(achievements.win100)
    }
    updateAchievements()
}

function runPlay100Achievement() {
    currentAchievements.play100.gamesPlayed += 1
    if (currentAchievements.play100.gamesPlayed === 100) {
        currentAchievements.play100.unlocked = true
        displayAchievement(achievements.play100)
    }
    updateAchievements()
}

function runKeepMiningAchievement() {
    currentAchievements.keepMining.minedAfter += 1
    if (currentAchievements.keepMining.minedAfter === 50) {
        currentAchievements.keepMining.unlocked = true
        displayAchievement(achievements.keepMining)
    }
    updateAchievements()
}

function runScore69Achievement() {
    if (score === 69) {
        currentAchievements.score69.unlocked = true
        displayAchievement(achievements.score69)
        updateAchievements()
    }
}

function runStoneAchievement() {
    if (score === 5) {
        currentAchievements.stone.unlocked = true
        displayAchievement(achievements.stone)
        updateAchievements()
    }
}

function runDiamondsAchievement() {
    currentAchievements.diamonds.unlocked = true
    displayAchievement(achievements.diamonds)
    updateAchievements()
}

// Event Listeners
pickaxeImg.addEventListener('mousedown', () => {
    pickaxeImg.classList = 'pickaxe2'
})

pickaxeImg.addEventListener('touchstart', () => {
    pickaxeImg.classList = 'pickaxe2'
})

pickaxeImg.addEventListener('mouseup', () => {
    runPickaxe()
})

resetButton.addEventListener('click', () => {
    resetGame()
})

resetScoresButton.addEventListener('click', () => {
    resetScores()
})

resetAchievementsButton.addEventListener('click', () => {
    resetAchievements()
})

achievementUnlockedDisplay.addEventListener('click', () => {
    achievementUnlockedDisplay.classList = 'hidden'
})

muteButton.addEventListener('click', () => {
    toggleMute()
})

document.addEventListener('keydown', (event) => {
    if (event.target.localName === 'input') return
    if (event.key === 't') pickaxeImg.classList = 'pickaxe2'
})

document.addEventListener('keyup', (event) => {
    if (event.target.localName === 'input') return
    if (event.key === 't') {
        runPickaxe()
    }
    if (event.key === 'r') resetGame()
    if (event.key === 'm') toggleMute()
})
