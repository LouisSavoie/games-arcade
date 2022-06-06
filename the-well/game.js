// Displays
const actionMenuDisplay = document.getElementById('action-menu-display')

// Buttons
const wellButton = document.getElementById('well-button')
const forestButton = document.getElementById('forest-button')
const fieldButton = document.getElementById('field-button')
const lakeButton = document.getElementById('lake-button')
const mountainButton = document.getElementById('mountain-button')
const surveyButton = document.getElementById('survey-button')
const craftButton = document.getElementById('craft-button')
const equipButton = document.getElementById('equip-button')
const combatButton = document.getElementById('combat-button')

// Data
const zones = {
    well: {
        name: 'The Well',
        inventory: {},
        imgs: {
            spring: '',
            summer: '',
            fall: '',
            winter: ''
        }
    },
    forest: {
        name: 'Forest',
        inventory: {},
        imgs: {
            spring: '',
            summer: '',
            fall: '',
            winter: ''
        }
    },
    field: {
        name: 'Field',
        inventory: {},
        imgs: {
            spring: '',
            summer: '',
            fall: '',
            winter: ''
        }
    },
    lake: {
        name: 'Lake',
        inventory: {},
        imgs: {
            spring: '',
            summer: '',
            fall: '',
            winter: ''
        }
    },
    mountain: {
        name: 'Mountain',
        inventory: {},
        imgs: {
            spring: '',
            summer: '',
            fall: '',
            winter: ''
        }
    }
}

const tools = {
    stoneAxe: {
        name: 'Stone Axe',
        type: 'axe',
        dur: 100,
        atk: 3,
        img: ''
    }
}

const mats = {
    stone: {
        name: 'Stone',
        qty: 1,
        img: ''
    }
}

const recipes = {
    stoneAxe: {
        name: 'Stone Axe',
        mats: {
            stone: 1,
            fiber: 1,
            stick: 1
        },
        tools: {
            list: [],
            req: 'all'
        },
        zone: '',
        img: tools.stoneAxe.img
    }
}

const monsters = {
    monster: {
        name: 'Monster',
        hp: 8,
        atk: 1,
        img: ''
    }
}

const player = {
    hp: 100,
    hunger: 0,
    thirst: 0,
    temp: 50,
    tools: [],
    mats: {},
    location: 'well'
}

const gameData = {
    zones,
    player,
    monsters: [],
    day: 1,
    season: 'Spring'
}

// States
let gameState = {}

// On Load
loadSave()

// Save Functions
function loadSave() {
    if (!localStorage.theWellSave) localStorage.theWellSave = JSON.stringify(gameData)
    gameState = JSON.parse(localStorage.theWellSave)
    render()
}

function save() {
    localStorage.theWellSave = JSON.stringify(gameState)
}

// Game Functions
function turn() { // called after specific things happen like combat or crafting or harvesting
    //doturnstuff that happens every turn like adjust hunger spawn monsters or grow trees
    save()
    render()
}

function render() {
    //update displays
}

// Events
