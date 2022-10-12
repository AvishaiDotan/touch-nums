'use strict'
// global const

const CELLS = [16, 25, 36] // Defaults


//global var
var gNums
var gCounter = 0
var gInterval = 0
var level = 0
var currTime
var soundIdx = 0
var currSound

function init(){ 
    gNums = createShuffledNums(CELLS[level])
    renderBoard(gNums)
}

function setLevel(newLevel) {
    // Handle Sound
    currSound.pause();
    soundIdx = 0

    // Update Model
    gCounter = 0
    level = newLevel

    if (gInterval) {
        clearInterval(gInterval)
        gInterval = 0
    }

    //Update DOM
    document.querySelector('.timer').innerText = ''
    document.querySelector('p').innerText = `Target Number: ${gCounter}`
    document.querySelector('h2').style.display = 'none'

    init()
}

// Model functions
function createShuffledNums(amount) {
    var nums = []

    for (var i = 0; i < amount; i++) {
        nums.push(i)
    }
    // Shuffle
    nums.sort(() => {return 0.5 - Math.random()})
    return nums
}

// DOM functions
function renderBoard(gNums) {

    var gNumsCopy = gNums.slice()
    var elTable = document.querySelector('tbody')
    
    var strHTML = ''
    for (var i = 0; i < (gNums.length ** 0.5); i++) {
        strHTML += `<tr>`
        for (var j = 0; j < (gNums.length ** 0.5); j++) {
            var cellNum = gNumsCopy.pop()
            strHTML += `<td onclick="cellClicked(this)">${cellNum}</td>`
        }
        strHTML += `</tr>`
    }
    elTable.innerHTML = strHTML
}

function cellClicked(elCell) {

    

    var cellNum = +elCell.innerText

    if (cellNum === gCounter) {
        // Handle Sounds
        if (soundIdx > 15) soundIdx = 0
        currSound = new Audio('sounds/' + soundIdx + '.mp3')
        soundIdx++
        currSound.play()

        // Handel Model
        gCounter++

        // Handle DOM
        document.querySelector('p').innerText = `Target Number: ${gCounter}`
        elCell.classList.toggle('checked-cell');

         // Handle Interval
        if (!gInterval) {
            currTime = Date.now()
            gInterval = setInterval(renderTimer, 100, currTime)
        } else if (cellNum === CELLS[level] - 1) { // Game End
            // Handle elTimer 
            clearInterval(gInterval)
            gInterval = 0

            // Handle Sound
            currSound = new Audio('sounds/fullsound.mp3')
            currSound.play()

            // Handle Winning msg
            document.querySelector('h2').style.display = 'block'
        }
    }
}


function renderTimer(currTime){
    document.querySelector('.timer').innerText = (Date.now() - currTime) / 1000
}



