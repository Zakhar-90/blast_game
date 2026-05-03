"use strict";
cc._RF.push(module, '55a4cboYQpG6Y+IGj9lKSod', 'Board');
// scripts/logic/Board.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const Cell_1 = require("./Cell");
class Board {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = [];
        for (let r = 0; r < rows; r++) {
            this.grid[r] = [];
            for (let c = 0; c < cols; c++) {
                this.grid[r][c] = new Cell_1.Cell(r, c);
            }
        }
    }
    getCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            return null;
        }
        return this.grid[row][col];
    }
    fillRandom() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = this.grid[r][c];
                const randomIndex = Math.floor(Math.random() * Cell_1.ALL_COLORS.length);
                cell.color = Cell_1.ALL_COLORS[randomIndex];
            }
        }
    }
    findGroup(row, col) {
        const startCell = this.getCell(row, col);
        if (!startCell || startCell.isEmpty) {
            return [];
        }
        const targetColor = startCell.color;
        const group = [];
        const visited = [];
        for (let r = 0; r < this.rows; r++) {
            visited[r] = new Array(this.cols).fill(false);
        }
        const queue = [startCell];
        visited[row][col] = true;
        while (queue.length > 0) {
            const current = queue.shift();
            group.push(current);
            const neighbors = [
                this.getCell(current.row - 1, current.col),
                this.getCell(current.row + 1, current.col),
                this.getCell(current.row, current.col - 1),
                this.getCell(current.row, current.col + 1),
            ];
            for (const neighbor of neighbors) {
                if (neighbor &&
                    !visited[neighbor.row][neighbor.col] &&
                    neighbor.color === targetColor) {
                    visited[neighbor.row][neighbor.col] = true;
                    queue.push(neighbor);
                }
            }
        }
        return group;
    }
    removeCells(cells) {
        for (const cell of cells) {
            cell.clear();
        }
    }
    applyGravity() {
        for (let c = 0; c < this.cols; c++) {
            let writeRow = this.rows - 1;
            for (let r = this.rows - 1; r >= 0; r--) {
                const cell = this.getCell(r, c);
                if (cell && !cell.isEmpty) {
                    if (r !== writeRow) {
                        const targetCell = this.getCell(writeRow, c);
                        if (targetCell) {
                            targetCell.color = cell.color;
                            targetCell.superType = cell.superType;
                            cell.clear();
                        }
                    }
                    writeRow--;
                }
            }
        }
    }
    fillEmpty() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = this.grid[r][c];
                if (cell.isEmpty) {
                    const randomIndex = Math.floor(Math.random() * Cell_1.ALL_COLORS.length);
                    cell.color = Cell_1.ALL_COLORS[randomIndex];
                }
            }
        }
    }
    getGravityMoves() {
        const moves = [];
        for (let c = 0; c < this.cols; c++) {
            let writeRow = this.rows - 1;
            for (let r = this.rows - 1; r >= 0; r--) {
                const cell = this.getCell(r, c);
                if (cell && !cell.isEmpty) {
                    if (r !== writeRow) {
                        moves.push({
                            fromRow: r,
                            fromCol: c,
                            toRow: writeRow,
                            toCol: c,
                        });
                    }
                    writeRow--;
                }
            }
        }
        return moves;
    }
    getNewTiles() {
        const newTiles = [];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = this.grid[r][c];
                if (cell.isEmpty) {
                    const color = Cell_1.ALL_COLORS[Math.floor(Math.random() * Cell_1.ALL_COLORS.length)];
                    newTiles.push({ row: r, col: c, color: color });
                }
            }
        }
        return newTiles;
    }
    hasValidMoves() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const group = this.findGroup(r, c);
                if (group.length >= 2) {
                    return true;
                }
            }
        }
        return false;
    }
    shuffle() {
        const colors = [];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                colors.push(this.grid[r][c].color);
            }
        }
        for (let i = colors.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [colors[i], colors[j]] = [colors[j], colors[i]];
        }
        let index = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                this.grid[r][c].color = colors[index++];
            }
        }
    }
    getAllCells() {
        const result = [];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                result.push(this.grid[r][c]);
            }
        }
        return result;
    }
    clone() {
        const board = new Board(this.rows, this.cols);
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                board.grid[r][c] = this.grid[r][c].clone();
            }
        }
        return board;
    }
}
exports.Board = Board;

cc._RF.pop();