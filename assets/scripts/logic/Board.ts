import { Cell, TileColor, ALL_COLORS } from "./Cell";

export class Board {
  readonly rows: number;
  readonly cols: number;

  private grid: Cell[][];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.grid = [];

    for (let r = 0; r < rows; r++) {
      this.grid[r] = [];

      for (let c = 0; c < cols; c++) {
        this.grid[r][c] = new Cell(r, c);
      }
    }
  }

  getCell(row: number, col: number): Cell | null {
    if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
      return null;
    }
    return this.grid[row][col];
  }

  fillRandom(): void {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c];
        let color: TileColor;

        const randomIndex = Math.floor(Math.random() * ALL_COLORS.length);
        color = ALL_COLORS[randomIndex];

        cell.color = color;
      }
    }
  }

  // private wouldCreateGroup(
  //   row: number,
  //   col: number,
  //   color: TileColor,
  // ): boolean {
  //   const neighbors = [
  //     this.getCell(row - 1, col),
  //     this.getCell(row + 1, col),
  //     this.getCell(row, col - 1),
  //     this.getCell(row, col + 1),
  //   ];

  //   return neighbors.some(
  //     (neighbor) => neighbor !== null && neighbor.color === color,
  //   );
  // }

  findGroup(row: number, col: number): Cell[] {
    const startCell = this.getCell(row, col);

    if (!startCell || startCell.isEmpty) {
      return [];
    }

    const targetColor = startCell.color;
    const group: Cell[] = [];

    const visited: boolean[][] = [];
    for (let r = 0; r < this.rows; r++) {
      visited[r] = new Array(this.cols).fill(false);
    }

    const queue: Cell[] = [startCell];
    visited[row][col] = true;

    while (queue.length > 0) {
      const current = queue.shift()!;
      group.push(current);

      const neighbors = [
        this.getCell(current.row - 1, current.col),
        this.getCell(current.row + 1, current.col),
        this.getCell(current.row, current.col - 1),
        this.getCell(current.row, current.col + 1),
      ];

      for (const neighbor of neighbors) {
        if (
          neighbor &&
          !visited[neighbor.row][neighbor.col] &&
          neighbor.color === targetColor
        ) {
          visited[neighbor.row][neighbor.col] = true;
          queue.push(neighbor);
        }
      }
    }

    return group;
  }

  removeCells(cells: Cell[]): void {
    for (const cell of cells) {
      cell.clear();
    }
  }

  applyGravity(): void {
    for (let c = 0; c < this.cols; c++) {
      let writeRow = this.rows - 1;

      for (let r = this.rows - 1; r >= 0; r--) {
        const cell = this.getCell(r, c);

        if (cell && !cell.isEmpty) {
          if (r !== writeRow) {
            const targetCell = this.getCell(writeRow, c);
            if (targetCell) {
              targetCell.color = cell.color;
              cell.clear();
            }
          }
          writeRow--;
        }
      }
    }
  }

  fillEmpty(): void {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c];
        if (cell.isEmpty) {
          const randomIndex = Math.floor(Math.random() * ALL_COLORS.length);
          cell.color = ALL_COLORS[randomIndex];
        }
      }
    }
  }

  getGravityMoves(): Array<{
    fromRow: number;
    fromCol: number;
    toRow: number;
    toCol: number;
  }> {
    const moves: Array<{
      fromRow: number;
      fromCol: number;
      toRow: number;
      toCol: number;
    }> = [];

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

  getNewTiles(): Array<{ row: number; col: number; color: TileColor }> {
    const newTiles: Array<{ row: number; col: number; color: TileColor }> = [];

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = this.grid[r][c];
        if (cell.isEmpty) {
          const color =
            ALL_COLORS[Math.floor(Math.random() * ALL_COLORS.length)];
          newTiles.push({ row: r, col: c, color: color });
        }
      }
    }

    return newTiles;
  }
}
