export enum TileColor {
  Blue = "blue",
  Green = "green",
  Purple = "purple",
  Red = "red",
  Yellow = "yellow",
}

export enum SuperTileType {
  None = "none",
  Row = "row",
  Column = "column",
  Radius = "radius",
  All = "all",
}

export const ALL_COLORS: TileColor[] = [
  TileColor.Blue,
  TileColor.Green,
  TileColor.Purple,
  TileColor.Red,
  TileColor.Yellow,
];

export const ALL_SUPER_TILE_TYPES: SuperTileType[] = [
  SuperTileType.Row,
  SuperTileType.Column,
  SuperTileType.Radius,
];

export class Cell {
  color: TileColor | null = null;

  superType: SuperTileType = SuperTileType.None;

  readonly row: number;
  readonly col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  get isEmpty(): boolean {
    return this.color === null;
  }

  get isSuperTile(): boolean {
    return this.superType !== SuperTileType.None;
  }

  clear(): void {
    this.color = null;
    this.superType = SuperTileType.None;
  }

  clone(): Cell {
    const cell = new Cell(this.row, this.col);
    cell.color = this.color;
    cell.superType = this.superType;
    return cell;
  }
}
