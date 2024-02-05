function createPlayer(name, symbol) {
    return { name, symbol }
}


const gameBoard = (() => {
    let board = [
        [" - "], [" - "], [" - "],
        [" - "], [" - "], [" - "],
        [" - "], [" - "], [" - "]
    ];
    let turn = 0;
    let progress = false;
    let isDisabled = false;
    let playerList = [];

    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 4, 8], [2, 4, 6], [0, 3, 6],
        [1, 4, 7], [2, 5, 8]
    ];

    const getCurrentState = () => {
        return progress;
    }

    const createFirstPlayer = (symbol) => {
        playerList[0] = (createPlayer("Player I", symbol));
    }

    const createSecondPlayer = (symbol) => {
        playerList[1] = (createPlayer("Player II", symbol));
    }

    const reset = () => {
        board = board.map((mark) => {
            return mark = [" - "];
        });
        turn = 0;
        progress = false;
        isDisabled = false;
        setUpBoard.displayScreen();
    }

    const checkOccupied = (id, symbol) => {
        const tileInProgress = id.slice(1);
        if (board[tileInProgress][0] === " - ") {
            return gameBoard.occupy(tileInProgress, symbol);
        }
    }

    const occupy = (id, symbol) => {
        progress = true;
        board[id][0] = symbol;
        ++turn;
        setUpBoard.displayScreen();
        gameBoard.checkMarked(symbol);
    }

    const getBoardArray = () => {
        return board;
    }

    const playerTurn = (id) => {
        if (!gameBoard.checkPlayers()) {
            return alert('Choose your symbol');
        }

        if (isDisabled) {
            return alert(`Please, restart the game!`);
        }

        if (turn % 2 === 0) {
            return gameBoard.checkOccupied(id, playerList[0].symbol);
        } else {
            return gameBoard.checkOccupied(id, playerList[1].symbol);
        }
    
    }

    const checkPlayers = () => {
        return playerList.length === 2;
    }

    const winLose = () => {
        if (turn % 2 !== 0) {
            isDisabled = true;
            alert(`${playerList[0].name} wins!`);
        } else {
            isDisabled = true;
            alert(`${playerList[1].name} wins!`);
        }
    }

    const checkMarked = (symbol) => {
        const checkingArray = gameBoard.getBoardArray().flat(2);
        const symbols = symbol.repeat(3);
        for (let i = 0; i < winConditions.length; i++) {
            const currentRow = winConditions[i];
            if (checkingArray[currentRow[0]] + checkingArray[currentRow[1]] + checkingArray[currentRow[2]] === symbols) {
                return gameBoard.winLose();
            }
        }

        if (turn > 8) {
            alert('it is a tie');
        }
    }

    return { createFirstPlayer, createSecondPlayer, reset, playerTurn, getBoardArray, checkPlayers, checkOccupied, occupy, getCurrentState, checkMarked, winLose }
})();

const setUpBoard = (() => {
    const oButton = document.querySelector('.o');
    const xButton = document.querySelector('.x');
    const targetButtons = document.querySelectorAll('.box');
    const resetBtn = document.querySelector('.reset');

    resetBtn.addEventListener('click', () => {
        gameBoard.reset();
    });

    oButton.addEventListener('click', () => {
        if (!gameBoard.getCurrentState()) {
            gameBoard.createFirstPlayer('O');
            gameBoard.createSecondPlayer('X');
        } else {
            alert('Please finish the game');
        }
    });

    xButton.addEventListener('click', () => {
        if (!gameBoard.getCurrentState()) {
            gameBoard.createFirstPlayer('X');
            gameBoard.createSecondPlayer('O');
        } else {
            alert('Please finish the game');
        }
    });

    targetButtons.forEach((button) => {
        button.addEventListener('click', (event) => {
            gameBoard.playerTurn(event.target.id);
        });
    });

    const displayScreen = () => {
        const array = gameBoard.getBoardArray().flat();
        for (let i = 0; i < array.length; i++) {
            const selectedBox = document.querySelector('#t' + i);
            selectedBox.textContent = `[ ${array[i]} ]`;
        }
    }

    return { displayScreen }
})();
