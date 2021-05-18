import { Box } from './Box';
import { MineBox } from './MineBox';

import './index.scss';

interface PlayBoard {
    container: HTMLDivElement;
    boxes: MineBox[][];
}

interface Game {
    mines: number;
    rows: number;
    cols: number;
    board: PlayBoard;
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

function createBoard(mines: Box[][]): PlayBoard {
    const container = document.createElement('div');
    container.classList.add('game-board');

    const handlers = {
        onclick: () => {},
        onrclick: () => {},
    };

    const boxes = mines.map(row => {
        return row.map(mine => {
            return new MineBox(mine, handlers, container);
        });
    });

    return { container, boxes };
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
            ].filter(c => (c[0] >= 0 && c[0] < rows) && (c[1] >= 0 && c[1] < cols));
            coords.forEach(c => {
                if (boxes[c[0]][c[1]].mines === -1) {
                    ++numBombs;
                }
            });
            boxes[r][c].mines = numBombs;
        }
    }
    return boxes;
}

function setupGame(rows: number, cols: number, mines: number): Game {

    // come up with #mines set of unique coords
    const coordSet = new Set<string>();
    const coords: [r: number, c: number][] = [];
    let left = mines;
    while (left > 0) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        if (!coordSet.has(`${row},${col}`)) {
            coordSet.add(`${row},${col}`);
            coords.push([row, col]);
            left--;
        }
    }

    const boxes = calculateBoxes(rows, cols, coords);
    const board = createBoard(boxes);

    return {
        board,
        rows,
        cols,
        mines
    };
}

window.onload = () => {
    const game = setupGame(5, 5, 5);

    const root = document.querySelector('#root');
    if (root === null) {
        console.log('WAT');
        return;
    }
    root.appendChild(game.board.container);
}