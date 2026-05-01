export enum TileColor {
  Blue = "blue",
  Green = "green",
  Purple = "purple",
  Red = "red",
  Yellow = "yellow",
}

export const ALL_COLORS: TileColor[] = [
  TileColor.Blue,
  TileColor.Green,
  TileColor.Purple,
  TileColor.Red,
  TileColor.Yellow,
];

export class Cell {
  color: TileColor | null = null;

  readonly row: number;
  readonly col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  get isEmpty(): boolean {
    return this.color === null;
  }

  clear(): void {
    this.color = null;
  }

  clone(): Cell {
    const cell = new Cell(this.row, this.col);
    cell.color = this.color;
    return cell;
  }
}
