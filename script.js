function createPlayer(name, symbol) {
    return { name, symbol }
}


const gameBoard = (() => {
    let board = [
        [""], [""], [""],
        [""], [""], [""],
        [""], [""], [""]
    ];
    let turn = 0;
    let progress = false;
    const playerList = [];

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
            return mark = [""];
        });
        turn = 0;
        progress = false;
    }

    const checkOccupied = (id, symbol) => {
        const tileInProgress = id.slice(1);
        if (board[tileInProgress][0] === "") {
            return gameBoard.occupy(tileInProgress, symbol);
        }
    }

    const occupy = (id, symbol) => {
        progress = true;
        board[id][0] = symbol;
        ++turn;
        setUpBoard.displayScreen();
    }

    const getBoardArray = () => {
        return board;
    }

    const playerTurn = (id) => {
        if (!gameBoard.checkPlayers()) {
            return alert('Choose your symbol');
        }

        if (turn % 2 === 0 || turn === 0) {
            console.log(id);
            return gameBoard.checkOccupied(id, playerList[0].symbol);
        } else {
            return gameBoard.checkOccupied(id, playerList[1].symbol);
        }
    
    }

    const checkPlayers = () => {
        return playerList.length === 2;
    }

    return { createFirstPlayer, createSecondPlayer, reset, playerTurn, getBoardArray, checkPlayers, checkOccupied, occupy, getCurrentState }
})();

const setUpBoard = (() => {
    const oButton = document.querySelector('.o');
    const xButton = document.querySelector('.x');
    const targetButtons = document.querySelectorAll('.box');

    oButton.addEventListener(('click'), () => {
        if (!gameBoard.getCurrentState()) {
            gameBoard.createFirstPlayer('O');
            gameBoard.createSecondPlayer('X');
        } else {
            alert('Please finish the game');
        }
    });

    xButton.addEventListener(('click'), () => {
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
