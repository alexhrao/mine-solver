import { Box } from './Box';
import { MineBox, Handlers } from './MineBox';
import { Confetti } from './Confetti';

import './index.scss';

const script = document.createElement('script');
script.src = 'https://kit.fontawesome.com/a927215a8a.js';
script.crossOrigin = 'anonymous';
document.head.appendChild(script);

interface GameSeed {
    rows: number;
    cols: number;
    mines: number;
    indicator: HTMLDivElement;
    bombCounter: HTMLParagraphElement;
    undo: HTMLButtonElement;
}

interface PlayBoard {
    container: HTMLDivElement;
    boxes: MineBox[][];
}

interface Stats {
    start: Date;
    undos: number;
}

interface Game {
    seed: GameSeed;
    board: PlayBoard;
    stats: Stats;
}

interface NewGameControls {
    numRows: HTMLInputElement;
    numCols: HTMLInputElement;
    numMines: HTMLInputElement;
    gameBtn: HTMLButtonElement;
    errorMsg: HTMLParagraphElement;
    container: HTMLDivElement;
}

interface Timespan {
    days: number;
    hours: number;
    mins: number;
    secs: number;
}

function readBoard(payload: string): Box[][] {
    // CSV format is each will have # or x; x means a bomb!
    const lines = payload.split("\n");
    return lines.map((line, r) => {
        return line.split(",").map((b, c) => {
            const box: Box = {
                row: r,
                col: c,
                mines: b === 'x' ? -1 : parseInt(b),
                flagged: false,
                isShown: false,
            };
            return box;
        })
    });
}



let exploded: MineBox|undefined;
let finished: boolean = false;
let gameFinisher: () => void = () => {};
let timer: number = 0;

function timeDiff(d1: Date, d2: Date): Timespan {
    const span: Timespan = {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
    }
    let diff = d2.getTime() - d1.getTime();

    span.days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= span.days * (1000 * 60 * 60 * 24);

    span.hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= span.hours * (1000 * 60 * 60);

    span.mins = Math.floor(diff / (1000 * 60));
    diff -= span.mins * (1000 * 60);

    span.secs = Math.floor(diff / (1000));
    diff -= span.secs * (1000);
    return span;
}

function timeDiffString(tDiff: Timespan): string {
    let tDiffString: string = '';
    const days = tDiff.days === 1 ? 'day' : 'days';
    const hours = tDiff.hours === 1 ? 'hour' : 'hours';
    const mins = tDiff.mins === 1 ? 'minute' : 'minutes';
    const secs = tDiff.secs === 1 ? 'second' : 'seconds';
    if (tDiff.days > 0) {
        tDiffString = `${tDiff.days} ${days}, ${tDiff.hours} ${hours}, ${tDiff.mins} ${mins}, and ${tDiff.secs} ${secs}`;
    } else if (tDiff.hours > 0) {
        tDiffString = `${tDiff.hours} ${hours}, ${tDiff.mins} ${mins}, and ${tDiff.secs} ${secs}`;
    } else if (tDiff.mins > 0) {
        tDiffString = `${tDiff.mins} ${mins} and ${tDiff.secs} ${secs}`;
    } else {
        tDiffString = `${tDiff.secs} ${secs}`;
    }
    return tDiffString;
}

function createUndo(): HTMLButtonElement {
    const button = document.createElement('button');
    button.id = "undo";
    button.disabled = true;
    
    const icon = document.createElement('i');
    icon.classList.add('fal', 'fa-undo');
    button.appendChild(icon);

    return button;
}

function createIndicator(): HTMLDivElement {
    const indicator = document.createElement('div');
    indicator.id = 'indicator';
    const container = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fad', 'fa-smile');
    container.appendChild(icon);
    indicator.appendChild(container);
    scaredFace(indicator);
    smileFace(indicator);
    return indicator;
}

function scaredFace(indicator: HTMLDivElement): void {
    indicator.firstChild?.remove();
    const container = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fal', 'fa-surprise');
    container.appendChild(icon);
    indicator.appendChild(container);
}

function smileFace(indicator: HTMLDivElement): void {
    indicator.firstChild?.remove();
    const container = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fal', 'fa-smile');
    container.appendChild(icon);
    indicator.appendChild(container);
}

function deadFace(indicator: HTMLDivElement): void {
    indicator.firstChild?.remove();
    const container = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fal', 'fa-dizzy');
    container.appendChild(icon);
    indicator.appendChild(container);
}

function happyFace(indicator: HTMLDivElement): void {
    indicator.firstChild?.remove();
    const container = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fal', 'fa-grin-beam');
    container.appendChild(icon);
    indicator.appendChild(container);
}

function createBombCounter(mines: number): HTMLParagraphElement {
    const counter = document.createElement('p');
    counter.id = 'bombCounter';
    if (mines === 1) {
        counter.textContent = '1 Flag left (Shift+Click to flag)';
    } else {
        counter.textContent = `${mines} Flags left (Shift+Click to flag)`;
    }
    counter.title = 'Shift+Click to Flag';
    return counter;
}

function explode(seed: GameSeed, board: PlayBoard): void {
    seed.undo.disabled = false;
    board.boxes.flat().forEach(mb => mb.disable());
    board.container.classList.add('disabled');
    // we blew up!
}

function finish(seed: GameSeed): void {
    happyFace(seed.indicator);
    seed.bombCounter.textContent = 'No Flags Left!';
    finished = true;
    gameFinisher();
}

function isWinner(boxes: MineBox[][]): boolean {
    return boxes.flat().every(mb => mb.box.mines !== -1 || mb.box.flagged);
}

function checkTooMany(seed: GameSeed, boxes: MineBox[][], target: MineBox): void {
    const { row: r, col: c } = target.box;
    const coords = [
        [r - 1, c - 1],
        [r - 1, c],
        [r - 1, c + 1],
        [r, c - 1],
        [r, c + 1],
        [r + 1, c - 1],
        [r + 1, c],
        [r + 1, c + 1],
    ].filter(c => (c[0] >= 0 && c[0] < seed.rows) && (c[1] >= 0 && c[1] < seed.cols));

    for (const [r, c] of coords) {
        // look at number of flags around it... if it is > our #, get nae-nae'd
        if (!boxes[r][c].box.isShown || boxes[r][c].box.mines <= 0) {
            continue;
        }
        const coords = [
            [r - 1, c - 1],
            [r - 1, c],
            [r - 1, c + 1],
            [r, c - 1],
            [r, c + 1],
            [r + 1, c - 1],
            [r + 1, c],
            [r + 1, c + 1],
        ].filter(c => (c[0] >= 0 && c[0] < seed.rows) && (c[1] >= 0 && c[1] < seed.cols));
        // count num flags around... if > ours, nae nae
        let numBombs = 0;
        for (const [r, c] of coords) {
            if (boxes[r][c].box.flagged) {
                numBombs++;
            }
        }
        if (numBombs > boxes[r][c].box.mines) {
            boxes[r][c].tooMany();
        } else {
            boxes[r][c].tooMany(false);
        }

    }
}

function createBoard(seed: GameSeed, mines: Box[][]): PlayBoard;
function createBoard(seed: GameSeed, mines: Box[][], onclick: (box: MineBox) => boolean): PlayBoard;
function createBoard(seed: GameSeed, mines: Box[][], onclick?: (box: MineBox) => boolean): PlayBoard {
    const container = document.createElement('div');
    const boxes: MineBox[][] = [];
    const play: PlayBoard = {
        container,
        boxes
    }
    let numFlags = 0;
    container.classList.add('game-board');

    const handlers: Handlers = {
        onclickdown: (box: MineBox) => {
            if (onclick === undefined) {
                // scared face
                scaredFace(seed.indicator);
            }
        },
        onclickup: (box: MineBox) => {
            if (onclick?.(box)) {
                return;
            }
            smileFace(seed.indicator);
            // if it's a bomb, die
            // if it's a number, just show
            // otherwise, if it's 0, then iteratively clear around us, until we hit numbers
            if (box.box.mines === -1) {
                explode(seed, play);
                deadFace(seed.indicator);
                exploded = box;
                box.uncover();
                return;
            }
            box.uncover();
            if (box.box.mines === 0) {
                // clear around!
                const boxClearer = (box: MineBox): void => {
                    const { row: r, col: c } = box.box;
                    const coords = [
                        [r - 1, c - 1],
                        [r - 1, c],
                        [r - 1, c + 1],
                        [r, c - 1],
                        [r, c + 1],
                        [r + 1, c - 1],
                        [r + 1, c],
                        [r + 1, c + 1],
                    ].filter(c => (c[0] >= 0 && c[0] < seed.rows) && (c[1] >= 0 && c[1] < seed.cols));
                    for (const [ r, c ] of coords) {
                        if (boxes[r][c].box.isShown) {
                            continue;
                        }
                        if (boxes[r][c].box.flagged) {
                            numFlags--;
                            boxes[r][c].unflag();
                            checkTooMany(seed, boxes, boxes[r][c]);
                        }
                        boxes[r][c].uncover();
                        if (boxes[r][c].box.mines === 0) {
                            boxClearer(boxes[r][c]);
                        } else if (boxes[r][c].box.mines === -1) {
                            // we shouldn't be here...?
                            throw new Error("Found mine next to 0 box");
                        }
                    }
                }

                boxClearer(box);
            }
        },
        onrclick: (box: MineBox) => {
            if (onclick !== undefined) {
                return;
            }
            if (box.box.flagged) {
                box.unflag();
                numFlags--;
            } else {
                box.flag();
                numFlags++;
            }
            checkTooMany(seed, boxes, box);
            if (seed.mines === numFlags) {
                // check if we've won?
                if (isWinner(boxes)) {
                    boxes.flat().forEach(mb => mb.uncover());
                    finish(seed);
                } else {
                    seed.bombCounter.textContent = "No more flags left to place, but at least one isn't right...";
                }
            } else if (seed.mines < numFlags) {
                seed.bombCounter.textContent = `${seed.mines - numFlags} Flags left (what have you done...?)`;
            } else {
                if (seed.mines - numFlags === 1) {
                    seed.bombCounter.textContent = '1 Flag left';
                } else {
                    seed.bombCounter.textContent = `${seed.mines - numFlags} Flags left`;
                }
            }
        },
    };

    mines.forEach(row => {
        boxes.push(row.map(mine => {
            return new MineBox(mine, handlers, container);
        }));
    });

    return play;
}

function calculateBoxes(rows: number, cols: number, mines: [r: number, c: number][]): Box[][] {
    // Step 1: Set up "blank boxes"
    const boxes: Box[][] = [];
    for (let r = 0; r < rows; ++r) {
        const row: Box[] = [];
        for (let c = 0; c < cols; ++c) {
            const box: Box = {
                row: r,
                col: c,
                mines: 0,
                flagged: false,
                isShown: false,
            };
            row.push(box);
        }
        boxes.push(row);
    }
    // Step 2: Fill in mines
    for (let mine of mines) {
        const [r, c] = mine
        boxes[r][c].mines = -1;
    }
    // Step 3: For all others, just see how many are around it
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            if (boxes[r][c].mines === -1) {
                continue;
            }
            let numBombs = 0;
            const coords = [
                [r - 1, c - 1],
                [r - 1, c],
                [r - 1, c + 1],
                [r, c - 1],
                [r, c + 1],
                [r + 1, c - 1],
                [r + 1, c],
                [r + 1, c + 1],
            ].filter(coord => (coord[0] >= 0 && coord[0] < rows) && (coord[1] >= 0 && coord[1] < cols));
            coords.forEach(coord => {
                if (boxes[coord[0]][coord[1]].mines === -1) {
                    ++numBombs;
                }
            });
            boxes[r][c].mines = numBombs;
        }
    }
    return boxes;
}

function setupGame(seed: GameSeed, startClick: [r: number, c: number]): Game {

    // come up with #mines set of unique coords
    const coordSet = new Set<string>();
    const coords: [r: number, c: number][] = [];
    const { rows, cols, mines } = seed;
    let left = mines;
    // calculate 10% to left, right
    const rowTol = Math.min(7, Math.round(0.2*seed.rows));
    const colTol = Math.min(7, Math.round(0.2*seed.cols));
    const rowBounds = [
        startClick[0] - rowTol,
        startClick[0] + rowTol,
    ];
    const colBounds = [
        startClick[1] - colTol,
        startClick[1] + colTol,
    ];
    const numPoss = (rows * cols) - ((rowTol + 1) * (colTol + 1)) - mines;
    if (numPoss < 0) {
        throw new Error("Not enough free boxes for requested number of mines");
    }

    while (left > 0) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (
            (row > rowBounds[0] && row < rowBounds[1])
            &&
            (col > colBounds[0] && col < colBounds[1])
        ) {
            continue;
        }
        if (!coordSet.has(`${row},${col}`)) {
            coordSet.add(`${row},${col}`);
            coords.push([row, col]);
            left--;
        }
    }

    const boxes = calculateBoxes(rows, cols, coords);
    const board = createBoard(seed, boxes);

    return {
        board,
        seed,
        stats: {
            start: new Date(),
            undos: 0,
        },
    };
}

function newGameMenu(rows: number, cols: number, mines: number): NewGameControls {

    const numRowsLabel = document.createElement('label');
    numRowsLabel.textContent = '# Rows:';
    const numRows = document.createElement('input');
    numRows.type = 'number'
    numRows.min = '6';
    numRows.step = '1';
    numRows.value = `${rows}`;
    numRowsLabel.appendChild(numRows);

    const numColsLabel = document.createElement('label');
    numColsLabel.textContent = '# Cols:';
    const numCols = document.createElement('input');
    numCols.type = 'number'
    numCols.min = '6';
    numCols.step = '1';
    numCols.value = `${cols}`;
    numColsLabel.appendChild(numCols);

    const numMinesLabel = document.createElement('label');
    numMinesLabel.textContent = '# Mines:';
    const numMines = document.createElement('input');
    numMines.type = 'number'
    numMines.min = '1';
    numMines.step = '1';
    numMines.value = `${mines}`;
    numMinesLabel.appendChild(numMines);

    const gameBtn = document.createElement('button');
    gameBtn.id = 'newGame';
    gameBtn.textContent = 'Start New Game';

    const newGameMenu = document.createElement('div');
    newGameMenu.classList.add('menubar');

    const title = document.createElement('h2');
    title.textContent = 'New Game';

    const errorMsg = document.createElement('p');
    errorMsg.id = 'errMsg';

    const container = document.createElement('div');
    container.id = 'newGameMenu'
    container.appendChild(title);
    container.appendChild(newGameMenu);
    container.appendChild(errorMsg);

    newGameMenu.appendChild(numRowsLabel);
    newGameMenu.appendChild(numColsLabel);
    newGameMenu.appendChild(numMinesLabel);
    newGameMenu.appendChild(gameBtn);

    return { numRows, numCols, numMines, gameBtn, errorMsg, container };
}

function makeNewGame(rows: number = 20, cols: number = 20, mines: number = 75) {
    if (document.querySelector('h1') === null) {
        const title = document.createElement('h1');
        title.textContent = 'Minesweeper Online';
        title.title = 'Click to get started. Each square contains either a bomb or a number; the number tells you how many adjacent squares have a bomb. If you think a square has a bomb, flag it (Shift+Click); otherwise, click it to reveal. Your goal is to clear the entire board, leaving only flags behind';
        document.body.appendChild(title);
    }
    const confetti: Confetti = new Confetti();
    if (timer !== 0) {
        window.clearInterval(timer);
    }
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
    exploded = undefined;
    finished = false;
    const seed: GameSeed = {
        rows,
        cols,
        mines,
        indicator: createIndicator(),
        bombCounter: createBombCounter(mines),
        undo: createUndo(),
    }
    const menubar = document.createElement('div');
    menubar.classList.add('menubar');
    menubar.appendChild(seed.bombCounter);
    menubar.appendChild(seed.undo);
    const startBoxes = calculateBoxes(seed.rows, seed.cols, []);
    const statShower = document.createElement('p');
    statShower.id = 'statShower';
    statShower.textContent = `Ready to Start`;

    const board = createBoard(seed, startBoxes, (box: MineBox) => {
        const game = setupGame(seed, [box.box.row, box.box.col]);
        board.container.replaceWith(game.board.container);
        game.board.boxes[box.box.row][box.box.col].click();

        seed.undo.onclick = () => {
            if (exploded === undefined) {
                return;
            }
            game.stats.undos++;
            smileFace(seed.indicator);
            exploded.cover();
            seed.undo.disabled = true;
            game.board.boxes.flat().forEach(mb => mb.enable());
            game.board.container.classList.remove('disabled');
            exploded = undefined;
        }
        timer = window.setInterval(() => {
            statShower.textContent = timeDiffString(timeDiff(game.stats.start, new Date()));
        }, 1000);
        gameFinisher = () => {
            const timeString = timeDiffString(timeDiff(game.stats.start, new Date()));
            const finish = `Congratulations! You flagged ${seed.mines} ${seed.mines === 1 ? 'mine' : 'mines'} using ${game.stats.undos} undos in ${timeString}!`;
            statShower.textContent = finish;
            window.clearInterval(timer);
            confetti.start();
        }
        return true;
    });
    root.appendChild(seed.indicator);
    root.appendChild(menubar);
    root.appendChild(board.container);
    root.appendChild(statShower);

    const newGame = newGameMenu(rows, cols, mines);
    newGame.gameBtn.onclick = () => {
        // validate # mines
        const rows = parseInt(newGame.numRows.value);
        const cols = parseInt(newGame.numCols.value);
        const mines = parseInt(newGame.numMines.value);
        if (isNaN(rows) || rows <= 6) {
            // Throw up error!
            newGame.errorMsg.textContent = 'Number of rows must be at least 6';
            return;
        }
        if (isNaN(cols) || cols <= 0) {
            // throw
            newGame.errorMsg.textContent = 'Number of columns must be at least 6';
            return;
        }
        if (isNaN(mines) || mines <= 0) {
            newGame.errorMsg.textContent = 'There must be at least 1 mine';
            return;
        }
        const rowTol = Math.min(7, Math.round(0.2*rows));
        const colTol = Math.min(7, Math.round(0.2*cols));
        const numPoss = (rows * cols) - ((rowTol + 1) * (colTol + 1)) - mines;
        if (numPoss < 0) {
            // Throw up error!
            newGame.errorMsg.textContent = `Too many mines; for a ${rows}x${cols} board, you cannot have more than ${(rows * cols) - ((rowTol + 1) * (colTol + 1))} mines`;
            return;
        }
        // we're good to go! kick off
        // Clean up!
        root.remove();
        if (confetti.isConfettiRunning()) {
            confetti.stop();
        }
        makeNewGame(rows, cols, mines);
    }
    root.appendChild(newGame.container);

    window.onmouseup = () => {
        if (finished) {
            happyFace(seed.indicator);
        }
        else if (exploded === undefined) {
            smileFace(seed.indicator);
        } else {
            deadFace(seed.indicator);
        }
    };
}

window.onload = () => makeNewGame()