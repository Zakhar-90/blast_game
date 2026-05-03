
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/logic/Cell.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbG9naWNcXENlbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsSUFBWSxTQU1YO0FBTkQsV0FBWSxTQUFTO0lBQ25CLDBCQUFhLENBQUE7SUFDYiw0QkFBZSxDQUFBO0lBQ2YsOEJBQWlCLENBQUE7SUFDakIsd0JBQVcsQ0FBQTtJQUNYLDhCQUFpQixDQUFBO0FBQ25CLENBQUMsRUFOVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQUVELElBQVksYUFNWDtBQU5ELFdBQVksYUFBYTtJQUN2Qiw4QkFBYSxDQUFBO0lBQ2IsNEJBQVcsQ0FBQTtJQUNYLGtDQUFpQixDQUFBO0lBQ2pCLGtDQUFpQixDQUFBO0lBQ2pCLDRCQUFXLENBQUE7QUFDYixDQUFDLEVBTlcsYUFBYSxHQUFiLHFCQUFhLEtBQWIscUJBQWEsUUFNeEI7QUFFWSxRQUFBLFVBQVUsR0FBZ0I7SUFDckMsU0FBUyxDQUFDLElBQUk7SUFDZCxTQUFTLENBQUMsS0FBSztJQUNmLFNBQVMsQ0FBQyxNQUFNO0lBQ2hCLFNBQVMsQ0FBQyxHQUFHO0lBQ2IsU0FBUyxDQUFDLE1BQU07Q0FDakIsQ0FBQztBQUVXLFFBQUEsb0JBQW9CLEdBQW9CO0lBQ25ELGFBQWEsQ0FBQyxHQUFHO0lBQ2pCLGFBQWEsQ0FBQyxNQUFNO0lBQ3BCLGFBQWEsQ0FBQyxNQUFNO0NBQ3JCLENBQUM7QUFFRixNQUFhLElBQUk7SUFRZixZQUFZLEdBQVcsRUFBRSxHQUFXO1FBUHBDLFVBQUssR0FBcUIsSUFBSSxDQUFDO1FBRS9CLGNBQVMsR0FBa0IsYUFBYSxDQUFDLElBQUksQ0FBQztRQU01QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDO0lBQzdCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssYUFBYSxDQUFDLElBQUksQ0FBQztJQUMvQyxDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztJQUN0QyxDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDaEMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFoQ0Qsb0JBZ0NDIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gVGlsZUNvbG9yIHtcbiAgQmx1ZSA9IFwiYmx1ZVwiLFxuICBHcmVlbiA9IFwiZ3JlZW5cIixcbiAgUHVycGxlID0gXCJwdXJwbGVcIixcbiAgUmVkID0gXCJyZWRcIixcbiAgWWVsbG93ID0gXCJ5ZWxsb3dcIixcbn1cblxuZXhwb3J0IGVudW0gU3VwZXJUaWxlVHlwZSB7XG4gIE5vbmUgPSBcIm5vbmVcIixcbiAgUm93ID0gXCJyb3dcIixcbiAgQ29sdW1uID0gXCJjb2x1bW5cIixcbiAgUmFkaXVzID0gXCJyYWRpdXNcIixcbiAgQWxsID0gXCJhbGxcIixcbn1cblxuZXhwb3J0IGNvbnN0IEFMTF9DT0xPUlM6IFRpbGVDb2xvcltdID0gW1xuICBUaWxlQ29sb3IuQmx1ZSxcbiAgVGlsZUNvbG9yLkdyZWVuLFxuICBUaWxlQ29sb3IuUHVycGxlLFxuICBUaWxlQ29sb3IuUmVkLFxuICBUaWxlQ29sb3IuWWVsbG93LFxuXTtcblxuZXhwb3J0IGNvbnN0IEFMTF9TVVBFUl9USUxFX1RZUEVTOiBTdXBlclRpbGVUeXBlW10gPSBbXG4gIFN1cGVyVGlsZVR5cGUuUm93LFxuICBTdXBlclRpbGVUeXBlLkNvbHVtbixcbiAgU3VwZXJUaWxlVHlwZS5SYWRpdXMsXG5dO1xuXG5leHBvcnQgY2xhc3MgQ2VsbCB7XG4gIGNvbG9yOiBUaWxlQ29sb3IgfCBudWxsID0gbnVsbDtcblxuICBzdXBlclR5cGU6IFN1cGVyVGlsZVR5cGUgPSBTdXBlclRpbGVUeXBlLk5vbmU7XG5cbiAgcmVhZG9ubHkgcm93OiBudW1iZXI7XG4gIHJlYWRvbmx5IGNvbDogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcikge1xuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuY29sID0gY29sO1xuICB9XG5cbiAgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29sb3IgPT09IG51bGw7XG4gIH1cblxuICBnZXQgaXNTdXBlclRpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3VwZXJUeXBlICE9PSBTdXBlclRpbGVUeXBlLk5vbmU7XG4gIH1cblxuICBjbGVhcigpOiB2b2lkIHtcbiAgICB0aGlzLmNvbG9yID0gbnVsbDtcbiAgICB0aGlzLnN1cGVyVHlwZSA9IFN1cGVyVGlsZVR5cGUuTm9uZTtcbiAgfVxuXG4gIGNsb25lKCk6IENlbGwge1xuICAgIGNvbnN0IGNlbGwgPSBuZXcgQ2VsbCh0aGlzLnJvdywgdGhpcy5jb2wpO1xuICAgIGNlbGwuY29sb3IgPSB0aGlzLmNvbG9yO1xuICAgIGNlbGwuc3VwZXJUeXBlID0gdGhpcy5zdXBlclR5cGU7XG4gICAgcmV0dXJuIGNlbGw7XG4gIH1cbn1cbiJdfQ==