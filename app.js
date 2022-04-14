const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container')

const wordleArray = ['BRIGA', 'SALAO', 'PRATO', 'PORCO', 'BORDA', 'MACHO', 'GRUPO', 'FORMA']
const wordle = wordleArray[Math.floor(Math.random() * wordleArray.length)];

console.log(wordle);


const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '<<',
]
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]
let currentRow = 0
let currentTile = 0
let isGameOver = false

//Adiciona o layout dos quadrados das letras
guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement) 
    })
    tileDisplay.append(rowElement)
})


//Adiciona o layout do teclado
keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (key) => {
    console.log('clicked', key)
    if(key === '<<'){
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if(key === 'ENTER'){
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(key)
    console.log('guessRows', guessRows)
}

const addLetter = (key) => {
    if(currentTile < 5 && currentRow < 6){
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = key
        guessRows[currentRow][currentTile] = key
        tile.setAttribute('data', key)
        currentTile++
        console.log('guessRows', guessRows)
    }
}

const deleteLetter = () => {
    if(currentTile > 0){
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('') //join retorna os elementos do array como uma string

    if(currentTile > 4){
        console.log('guess is ' + guess, 'wordle is ' + wordle)
        flipTile()
        if(wordle == guess){
            showMessageWin('Parabéns! Você acertou!')
            isGameOver = true
            return
        } else {
            if(currentRow >= 5){
                isGameOver = false
                showMessageLose('Você perdeu! A Palavra era: ' + wordle)
                return
            }
            if(currentRow < 5){
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessageWin = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageElement.classList.add('win')
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 4000)
}
const showMessageLose = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageElement.classList.add('lose')
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 3000)
}

const addColorToKey = (dataKey, color) => {
    const key = document.getElementById(dataKey)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = [] 
    
    rowTiles.forEach(tile => {
        guess.push({ key: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if(guess.key == wordle[index]){
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.key, '')
        }
    })

    guess.forEach(guess => {
        if(checkWordle.includes(guess.key)){
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.key, '')
        }
    })
    
    rowTiles.forEach((tile, index) => {
        setTimeout (() => {
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].key, guess[index].color)
        }, 500 * index)

    })
}