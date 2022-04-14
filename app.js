const tileDisplay = document.querySelector('.tile-container');
const keyboard = document.querySelector('.key-container');
const messageDisplay = document.querySelector('.message-container')

const wordle = 'PORTA';

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
                showMessageLose('Você perdeu!')
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
    setTimeout(() => messageDisplay.removeChild(messageElement), 3000)
}
const showMessageLose = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageElement.classList.add('lose')
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 3000)
}

const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    rowTiles.forEach((tile, index) => {
        const dataKey = tile.getAttribute('data')

        setTimeout (() => {
            tile.classList.add('flip')
            if(dataKey == wordle[index]){
                tile.classList.add('green-overlay')
            } else if (wordle.includes(dataKey)){
                tile.classList.add('yellow-overlay')
            } else {
                tile.classList.add('grey-overlay')
            }
        }, 500 * index)

    })
}