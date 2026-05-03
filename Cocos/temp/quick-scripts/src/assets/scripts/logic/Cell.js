"use strict";
cc._RF.push(module, '37b5f4miuNKULuf1CSib2TZ', 'Cell');
// scripts/logic/Cell.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = exports.ALL_SUPER_TILE_TYPES = exports.ALL_COLORS = exports.SuperTileType = exports.TileColor = void 0;
var TileColor;
(function (TileColor) {
    TileColor["Blue"] = "blue";
    TileColor["Green"] = "green";
    TileColor["Purple"] = "purple";
    TileColor["Red"] = "red";
    TileColor["Yellow"] = "yellow";
})(TileColor = exports.TileColor || (exports.TileColor = {}));
var SuperTileType;
(function (SuperTileType) {
    SuperTileType["None"] = "none";
    SuperTileType["Row"] = "row";
    SuperTileType["Column"] = "column";
    SuperTileType["Radius"] = "radius";
    SuperTileType["All"] = "all";
})(SuperTileType = exports.SuperTileType || (exports.SuperTileType = {}));
exports.ALL_COLORS = [
    TileColor.Blue,
    TileColor.Green,
    TileColor.Purple,
    TileColor.Red,
    TileColor.Yellow,
];
exports.ALL_SUPER_TILE_TYPES = [
    SuperTileType.Row,
    SuperTileType.Column,
    SuperTileType.Radius,
];
class Cell {
    constructor(row, col) {
        this.color = null;
        this.superType = SuperTileType.None;
        this.row = row;
        this.col = col;
    }
    get isEmpty() {
        return this.color === null;
    }
    get isSuperTile() {
        return this.superType !== SuperTileType.None;
    }
    clear() {
        this.color = null;
        this.superType = SuperTileType.None;
    }
    clone() {
        const cell = new Cell(this.row, this.col);
        cell.color = this.color;
        cell.superType = this.superType;
        return cell;
    }
}
exports.Cell = Cell;

cc._RF.pop();