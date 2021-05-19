import { MineBox } from './MineBox';
function readBoard(payload) {
    // CSV format is each will have # or x; x means a bomb!
    var lines = payload.split("\n");
    return lines.map(function (line, r) {
        return line.split(",").map(function (b, c) {
            var box = {
                row: r,
                col: c,
                mines: b === 'x' ? -1 : parseInt(b),
                flagged: false,
                isShown: false,
            };
            return box;
        });
    });
}
function createBoard(mines) {
    var container = document.createElement('div');
    container.classList.add('game-board');
    var onKill = function () { };
    var boxes = mines.map(function (row) {
        return row.map(function (mine) {
            return new MineBox(mine, onKill);
        });
    });
    return { container: container, boxes: boxes };
}
