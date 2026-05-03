
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/__qc_index__.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}
require('./assets/scripts/BoardView');
require('./assets/scripts/GameController');
require('./assets/scripts/TileView');
require('./assets/scripts/logic/Board');
require('./assets/scripts/logic/Cell');

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
//------QC-SOURCE-SPLIT------

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
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/TileView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '384ef5AGM1GC7lVTOJBBf4O', 'TileView');
// scripts/TileView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let TileView = class TileView extends cc.Component {
    constructor() {
        super(...arguments);
        this.sprite = null;
        this.blueSprite = null;
        this.greenSprite = null;
        this.purpleSprite = null;
        this.redSprite = null;
        this.yellowSprite = null;
        this.superRowSprite = null;
        this.superColumnSprite = null;
        this.superRadiusSprite = null;
        this.row = -1;
        this.col = -1;
        this.currentColor = null;
        this.currentSuperType = null;
    }
    setColor(color) {
        if (!this.sprite)
            return;
        this.currentColor = color;
        this.currentSuperType = null;
        switch (color) {
            case "blue":
                this.sprite.spriteFrame = this.blueSprite;
                break;
            case "green":
                this.sprite.spriteFrame = this.greenSprite;
                break;
            case "purple":
                this.sprite.spriteFrame = this.purpleSprite;
                break;
            case "red":
                this.sprite.spriteFrame = this.redSprite;
                break;
            case "yellow":
                this.sprite.spriteFrame = this.yellowSprite;
                break;
            default:
                cc.warn(`Неизвестный цвет тайла: ${color}`);
                break;
        }
    }
    setSuperTile(superType) {
        if (!this.sprite)
            return;
        this.currentColor = null;
        this.currentSuperType = superType;
        switch (superType) {
            case "row":
                this.sprite.spriteFrame = this.superRowSprite;
                break;
            case "column":
                this.sprite.spriteFrame = this.superColumnSprite;
                break;
            case "radius":
                this.sprite.spriteFrame = this.superRadiusSprite;
                break;
            default:
                cc.warn(`Неизвестный тип супер-тайла: ${superType}`);
                break;
        }
    }
    playRemoveAnimation() {
        return new Promise((resolve) => {
            cc.tween(this.node)
                .to(0.3, { scale: 0, opacity: 0 })
                .call(() => resolve())
                .start();
        });
    }
    playSpawnAnimation() {
        this.node.scale = 0;
        this.node.opacity = 255;
        return new Promise((resolve) => {
            cc.tween(this.node)
                .to(0.3, { scale: 1 }, { easing: "backOut" })
                .call(() => resolve())
                .start();
        });
    }
};
__decorate([
    property(cc.Sprite)
], TileView.prototype, "sprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "blueSprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "greenSprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "purpleSprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "redSprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "yellowSprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "superRowSprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "superColumnSprite", void 0);
__decorate([
    property(cc.SpriteFrame)
], TileView.prototype, "superRadiusSprite", void 0);
TileView = __decorate([
    ccclass
], TileView);
exports.default = TileView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVGlsZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsRUFBRSxDQUFDLFNBQVM7SUFBbEQ7O1FBRUUsV0FBTSxHQUFxQixJQUFJLENBQUM7UUFHaEMsZUFBVSxHQUEwQixJQUFJLENBQUM7UUFHekMsZ0JBQVcsR0FBMEIsSUFBSSxDQUFDO1FBRzFDLGlCQUFZLEdBQTBCLElBQUksQ0FBQztRQUczQyxjQUFTLEdBQTBCLElBQUksQ0FBQztRQUd4QyxpQkFBWSxHQUEwQixJQUFJLENBQUM7UUFHM0MsbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1FBRzdDLHNCQUFpQixHQUEwQixJQUFJLENBQUM7UUFHaEQsc0JBQWlCLEdBQTBCLElBQUksQ0FBQztRQUVoRCxRQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakIsUUFBRyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRWpCLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUVuQyxxQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO0lBd0V6QyxDQUFDO0lBdEVDLFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU3QixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVyxDQUFDO2dCQUMzQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUks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QVcsQ0FBQzs4Q0FDa0I7QUFHM0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnREFDb0I7QUFHN0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDdUI7QUFHaEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDdUI7QUExQjdCLFFBQVE7SUFENUIsT0FBTztHQUNhLFFBQVEsQ0F5RzVCO2tCQXpHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gIHNwcml0ZTogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICBibHVlU3ByaXRlOiBjYy5TcHJpdGVGcmFtZSB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgZ3JlZW5TcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICBwdXJwbGVTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICByZWRTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICB5ZWxsb3dTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICBzdXBlclJvd1Nwcml0ZTogY2MuU3ByaXRlRnJhbWUgfCBudWxsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gIHN1cGVyQ29sdW1uU3ByaXRlOiBjYy5TcHJpdGVGcmFtZSB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgc3VwZXJSYWRpdXNTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgcm93OiBudW1iZXIgPSAtMTtcbiAgY29sOiBudW1iZXIgPSAtMTtcblxuICBjdXJyZW50Q29sb3I6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGN1cnJlbnRTdXBlclR5cGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHNldENvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSByZXR1cm47XG5cbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuY3VycmVudFN1cGVyVHlwZSA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKGNvbG9yKSB7XG4gICAgICBjYXNlIFwiYmx1ZVwiOlxuICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuYmx1ZVNwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImdyZWVuXCI6XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5ncmVlblNwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInB1cnBsZVwiOlxuICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucHVycGxlU3ByaXRlITtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmVkXCI6XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5yZWRTcHJpdGUhO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ5ZWxsb3dcIjpcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnllbGxvd1Nwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY2Mud2Fybihg0J3QtdC40LfQstC10YHRgtC90YvQuSDRhtCy0LXRgiDRgtCw0LnQu9CwOiAke2NvbG9yfWApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXRTdXBlclRpbGUoc3VwZXJUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSByZXR1cm47XG5cbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50U3VwZXJUeXBlID0gc3VwZXJUeXBlO1xuXG4gICAgc3dpdGNoIChzdXBlclR5cGUpIHtcbiAgICAgIGNhc2UgXCJyb3dcIjpcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnN1cGVyUm93U3ByaXRlITtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY29sdW1uXCI6XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zdXBlckNvbHVtblNwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJhZGl1c1wiOlxuICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3VwZXJSYWRpdXNTcHJpdGUhO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNjLndhcm4oYNCd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0YLQuNC/INGB0YPQv9C10YAt0YLQsNC50LvQsDogJHtzdXBlclR5cGV9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHBsYXlSZW1vdmVBbmltYXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgIC50bygwLjMsIHsgc2NhbGU6IDAsIG9wYWNpdHk6IDAgfSlcbiAgICAgICAgLmNhbGwoKCkgPT4gcmVzb2x2ZSgpKVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYXlTcGF3bkFuaW1hdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLm5vZGUuc2NhbGUgPSAwO1xuICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgIC50bygwLjMsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwiYmFja091dFwiIH0pXG4gICAgICAgIC5jYWxsKCgpID0+IHJlc29sdmUoKSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/BoardView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '434a2cOWJNIK7nEUSp5bXJD', 'BoardView');
// scripts/BoardView.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
const Cell_1 = require("./logic/Cell");
const TileView_1 = require("./TileView");
let BoardView = class BoardView extends cc.Component {
    constructor() {
        super(...arguments);
        this.tilePrefab = null;
        this.tileSizeWidth = 100;
        this.tileSizeHeight = 112;
        this.rows = 9;
        this.cols = 9;
        this.tileViews = new Map();
        this.board = null;
        this.gameController = null;
    }
    init(board, gameController) {
        this.board = board;
        this.gameController = gameController;
        this.rows = board.rows;
        this.cols = board.cols;
        const totalWidth = this.cols * this.tileSizeWidth;
        const totalHeight = this.rows * this.tileSizeHeight;
        this.node.setPosition(-totalWidth / 2 + this.tileSizeWidth / 2, totalHeight / 2 - this.tileSizeHeight / 2 + 64);
        this.initialBuild(board);
    }
    initialBuild(board) {
        this.tileViews.forEach((tileView) => {
            tileView.node.destroy();
        });
        this.tileViews.clear();
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = board.getCell(r, c);
                if (!cell || cell.isEmpty)
                    continue;
                this.createTile(cell, r, c);
            }
        }
    }
    fullRebuild(board, gravityMoves) {
        this.tileViews.forEach((tileView) => {
            tileView.node.destroy();
        });
        this.tileViews.clear();
        const moveMap = new Map();
        for (const move of gravityMoves) {
            const key = `${move.toRow}_${move.toCol}`;
            moveMap.set(key, { fromRow: move.fromRow, fromCol: move.fromCol });
        }
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const cell = board.getCell(r, c);
                if (!cell || cell.isEmpty)
                    continue;
                const moveKey = `${r}_${c}`;
                const moveInfo = moveMap.get(moveKey);
                let displayRow = r;
                let displayCol = c;
                if (moveInfo) {
                    displayRow = moveInfo.fromRow;
                    displayCol = moveInfo.fromCol;
                }
                this.createTile(cell, displayRow, displayCol, r, c);
            }
        }
    }
    createTile(cell, visualRow, visualCol, logicalRow, logicalCol) {
        if (!this.tilePrefab) {
            cc.error("tilePrefab не назначен в BoardView!");
            return;
        }
        const node = cc.instantiate(this.tilePrefab);
        node.parent = this.node;
        const tileView = node.getComponent(TileView_1.default);
        if (!tileView) {
            cc.error("TileView не найден на префабе!");
            node.destroy();
            return;
        }
        if (cell.isSuperTile && cell.superType !== Cell_1.SuperTileType.None) {
            tileView.setSuperTile(cell.superType);
        }
        else if (cell.color) {
            tileView.setColor(cell.color);
        }
        const actualRow = logicalRow !== undefined ? logicalRow : visualRow;
        const actualCol = logicalCol !== undefined ? logicalCol : visualCol;
        tileView.row = actualRow;
        tileView.col = actualCol;
        const x = visualCol * this.tileSizeWidth;
        const y = -visualRow * this.tileSizeHeight;
        node.setPosition(x, y);
        node.on(cc.Node.EventType.TOUCH_END, (event) => {
            event.stopPropagation();
            if (this.gameController) {
                this.gameController.onTileClick(actualRow, actualCol);
            }
        });
        const key = this.makeKey(actualRow, actualCol);
        this.tileViews.set(key, tileView);
    }
    makeKey(row, col) {
        return `${row}_${col}`;
    }
    animateRemoval(cells) {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            for (const cell of cells) {
                const key = this.makeKey(cell.row, cell.col);
                const tileView = this.tileViews.get(key);
                if (tileView) {
                    promises.push(tileView.playRemoveAnimation());
                }
            }
            yield Promise.all(promises);
        });
    }
    animateGravity() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            this.tileViews.forEach((tileView) => {
                const targetX = tileView.col * this.tileSizeWidth;
                const targetY = -tileView.row * this.tileSizeHeight;
                const promise = new Promise((resolve) => {
                    cc.tween(tileView.node)
                        .to(0.4, { y: targetY, x: targetX }, { easing: "bounceOut" })
                        .call(() => resolve())
                        .start();
                });
                promises.push(promise);
            });
            yield Promise.all(promises);
        });
    }
    animateSpawn() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = [];
            this.tileViews.forEach((tileView) => {
                promises.push(tileView.playSpawnAnimation());
            });
            yield Promise.all(promises);
        });
    }
};
__decorate([
    property(cc.Prefab)
], BoardView.prototype, "tilePrefab", void 0);
__decorate([
    property
], BoardView.prototype, "tileSizeWidth", void 0);
__decorate([
    property
], BoardView.prototype, "tileSizeHeight", void 0);
BoardView = __decorate([
    ccclass
], BoardView);
exports.default = BoardView;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcQm9hcmRWaWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDO0FBRzVDLHVDQUFtRDtBQUNuRCx5Q0FBa0M7QUFHbEMsSUFBcUIsU0FBUyxHQUE5QixNQUFxQixTQUFVLFNBQVEsRUFBRSxDQUFDLFNBQVM7SUFBbkQ7O1FBRUUsZUFBVSxHQUFxQixJQUFJLENBQUM7UUFHcEMsa0JBQWEsR0FBVyxHQUFHLENBQUM7UUFHNUIsbUJBQWMsR0FBVyxHQUFHLENBQUM7UUFFckIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUVqQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBRWpCLGNBQVMsR0FBMEIsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUU3QyxVQUFLLEdBQWlCLElBQUksQ0FBQztRQUUzQixtQkFBYyxHQUFRLElBQUksQ0FBQztJQTJLckMsQ0FBQztJQXpLQyxJQUFJLENBQUMsS0FBWSxFQUFFLGNBQW1CO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFFdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ2xELE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FDbkIsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxF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Q0FBQyxDQUFDO1lBRUgsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzlCLENBQUM7S0FBQTtDQUNGLENBQUE7QUEzTEM7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQzs2Q0FDZ0I7QUFHcEM7SUFEQyxRQUFRO2dEQUNtQjtBQUc1QjtJQURDLFFBQVE7aURBQ29CO0FBUlYsU0FBUztJQUQ3QixPQUFPO0dBQ2EsU0FBUyxDQTZMN0I7a0JBN0xvQixTQUFTIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9sb2dpYy9Cb2FyZFwiO1xuaW1wb3J0IHsgQ2VsbCwgU3VwZXJUaWxlVHlwZSB9IGZyb20gXCIuL2xvZ2ljL0NlbGxcIjtcbmltcG9ydCBUaWxlVmlldyBmcm9tIFwiLi9UaWxlVmlld1wiO1xuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9hcmRWaWV3IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcbiAgQHByb3BlcnR5KGNjLlByZWZhYilcbiAgdGlsZVByZWZhYjogY2MuUHJlZmFiIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5XG4gIHRpbGVTaXplV2lkdGg6IG51bWJlciA9IDEwMDtcblxuICBAcHJvcGVydHlcbiAgdGlsZVNpemVIZWlnaHQ6IG51bWJlciA9IDExMjtcblxuICBwcml2YXRlIHJvd3M6IG51bWJlciA9IDk7XG5cbiAgcHJpdmF0ZSBjb2xzOiBudW1iZXIgPSA5O1xuXG4gIHByaXZhdGUgdGlsZVZpZXdzOiBNYXA8c3RyaW5nLCBUaWxlVmlldz4gPSBuZXcgTWFwKCk7XG5cbiAgcHJpdmF0ZSBib2FyZDogQm9hcmQgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGdhbWVDb250cm9sbGVyOiBhbnkgPSBudWxsO1xuXG4gIGluaXQoYm9hcmQ6IEJvYXJkLCBnYW1lQ29udHJvbGxlcjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgIHRoaXMuZ2FtZUNvbnRyb2xsZXIgPSBnYW1lQ29udHJvbGxlcjtcbiAgICB0aGlzLnJvd3MgPSBib2FyZC5yb3dzO1xuICAgIHRoaXMuY29scyA9IGJvYXJkLmNvbHM7XG5cbiAgICBjb25zdCB0b3RhbFdpZHRoID0gdGhpcy5jb2xzICogdGhpcy50aWxlU2l6ZVdpZHRoO1xuICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gdGhpcy5yb3dzICogdGhpcy50aWxlU2l6ZUhlaWdodDtcbiAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24oXG4gICAgICAtdG90YWxXaWR0aCAvIDIgKyB0aGlzLnRpbGVTaXplV2lkdGggLyAyLFxuICAgICAgdG90YWxIZWlnaHQgLyAyIC0gdGhpcy50aWxlU2l6ZUhlaWdodCAvIDIgKyA2NCxcbiAgICApO1xuXG4gICAgdGhpcy5pbml0aWFsQnVpbGQoYm9hcmQpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsQnVpbGQoYm9hcmQ6IEJvYXJkKTogdm9pZCB7XG4gICAgdGhpcy50aWxlVmlld3MuZm9yRWFjaCgodGlsZVZpZXcpID0+IHtcbiAgICAgIHRpbGVWaWV3Lm5vZGUuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIHRoaXMudGlsZVZpZXdzLmNsZWFyKCk7XG5cbiAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMucm93czsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sczsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBib2FyZC5nZXRDZWxsKHIsIGMpO1xuICAgICAgICBpZiAoIWNlbGwgfHwgY2VsbC5pc0VtcHR5KSBjb250aW51ZTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVRpbGUoY2VsbCwgciwgYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVsbFJlYnVpbGQoXG4gICAgYm9hcmQ6IEJvYXJkLFxuICAgIGdyYXZpdHlNb3ZlczogQXJyYXk8e1xuICAgICAgZnJvbVJvdzogbnVtYmVyO1xuICAgICAgZnJvbUNvbDogbnVtYmVyO1xuICAgICAgdG9Sb3c6IG51bWJlcjtcbiAgICAgIHRvQ29sOiBudW1iZXI7XG4gICAgfT4sXG4gICk6IHZvaWQge1xuICAgIHRoaXMudGlsZVZpZXdzLmZvckVhY2goKHRpbGVWaWV3KSA9PiB7XG4gICAgICB0aWxlVmlldy5ub2RlLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgICB0aGlzLnRpbGVWaWV3cy5jbGVhcigpO1xuXG4gICAgY29uc3QgbW92ZU1hcCA9IG5ldyBNYXA8c3RyaW5nLCB7IGZyb21Sb3c6IG51bWJlcjsgZnJvbUNvbDogbnVtYmVyIH0+KCk7XG4gICAgZm9yIChjb25zdCBtb3ZlIG9mIGdyYXZpdHlNb3Zlcykge1xuICAgICAgY29uc3Qga2V5ID0gYCR7bW92ZS50b1Jvd31fJHttb3ZlLnRvQ29sfWA7XG4gICAgICBtb3ZlTWFwLnNldChrZXksIHsgZnJvbVJvdzogbW92ZS5mcm9tUm93LCBmcm9tQ29sOiBtb3ZlLmZyb21Db2wgfSk7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLnJvd3M7IHIrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbHM7IGMrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gYm9hcmQuZ2V0Q2VsbChyLCBjKTtcbiAgICAgICAgaWYgKCFjZWxsIHx8IGNlbGwuaXNFbXB0eSkgY29udGludWU7XG5cbiAgICAgICAgY29uc3QgbW92ZUtleSA9IGAke3J9XyR7Y31gO1xuICAgICAgICBjb25zdCBtb3ZlSW5mbyA9IG1vdmVNYXAuZ2V0KG1vdmVLZXkpO1xuXG4gICAgICAgIGxldCBkaXNwbGF5Um93ID0gcjtcbiAgICAgICAgbGV0IGRpc3BsYXlDb2wgPSBjO1xuXG4gICAgICAgIGlmIChtb3ZlSW5mbykge1xuICAgICAgICAgIGRpc3BsYXlSb3cgPSBtb3ZlSW5mby5mcm9tUm93O1xuICAgICAgICAgIGRpc3BsYXlDb2wgPSBtb3ZlSW5mby5mcm9tQ29sO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jcmVhdGVUaWxlKGNlbGwsIGRpc3BsYXlSb3csIGRpc3BsYXlDb2wsIHIsIGMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVGlsZShcbiAgICBjZWxsOiBDZWxsLFxuICAgIHZpc3VhbFJvdzogbnVtYmVyLFxuICAgIHZpc3VhbENvbDogbnVtYmVyLFxuICAgIGxvZ2ljYWxSb3c/OiBudW1iZXIsXG4gICAgbG9naWNhbENvbD86IG51bWJlcixcbiAgKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnRpbGVQcmVmYWIpIHtcbiAgICAgIGNjLmVycm9yKFwidGlsZVByZWZhYiDQvdC1INC90LDQt9C90LDRh9C10L0g0LIgQm9hcmRWaWV3IVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBub2RlID0gY2MuaW5zdGFudGlhdGUodGhpcy50aWxlUHJlZmFiKTtcbiAgICBub2RlLnBhcmVudCA9IHRoaXMubm9kZTtcblxuICAgIGNvbnN0IHRpbGVWaWV3ID0gbm9kZS5nZXRDb21wb25lbnQoVGlsZVZpZXcpO1xuICAgIGlmICghdGlsZVZpZXcpIHtcbiAgICAgIGNjLmVycm9yKFwiVGlsZVZpZXcg0L3QtSDQvdCw0LnQtNC10L0g0L3QsCDQv9GA0LXRhNCw0LHQtSFcIik7XG4gICAgICBub2RlLmRlc3Ryb3koKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2VsbC5pc1N1cGVyVGlsZSAmJiBjZWxsLnN1cGVyVHlwZSAhPT0gU3VwZXJUaWxlVHlwZS5Ob25lKSB7XG4gICAgICB0aWxlVmlldy5zZXRTdXBlclRpbGUoY2VsbC5zdXBlclR5cGUpO1xuICAgIH0gZWxzZSBpZiAoY2VsbC5jb2xvcikge1xuICAgICAgdGlsZVZpZXcuc2V0Q29sb3IoY2VsbC5jb2xvcik7XG4gICAgfVxuXG4gICAgY29uc3QgYWN0dWFsUm93ID0gbG9naWNhbFJvdyAhPT0gdW5kZWZpbmVkID8gbG9naWNhbFJvdyA6IHZpc3VhbFJvdztcbiAgICBjb25zdCBhY3R1YWxDb2wgPSBsb2dpY2FsQ29sICE9PSB1bmRlZmluZWQgPyBsb2dpY2FsQ29sIDogdmlzdWFsQ29sO1xuXG4gICAgdGlsZVZpZXcucm93ID0gYWN0dWFsUm93O1xuICAgIHRpbGVWaWV3LmNvbCA9IGFjdHVhbENvbDtcblxuICAgIGNvbnN0IHggPSB2aXN1YWxDb2wgKiB0aGlzLnRpbGVTaXplV2lkdGg7XG4gICAgY29uc3QgeSA9IC12aXN1YWxSb3cgKiB0aGlzLnRpbGVTaXplSGVpZ2h0O1xuICAgIG5vZGUuc2V0UG9zaXRpb24oeCwgeSk7XG5cbiAgICBub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKSA9PiB7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGlmICh0aGlzLmdhbWVDb250cm9sbGVyKSB7XG4gICAgICAgIHRoaXMuZ2FtZUNvbnRyb2xsZXIub25UaWxlQ2xpY2soYWN0dWFsUm93LCBhY3R1YWxDb2wpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc3Qga2V5ID0gdGhpcy5tYWtlS2V5KGFjdHVhbFJvdywgYWN0dWFsQ29sKTtcbiAgICB0aGlzLnRpbGVWaWV3cy5zZXQoa2V5LCB0aWxlVmlldyk7XG4gIH1cblxuICBwcml2YXRlIG1ha2VLZXkocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7cm93fV8ke2NvbH1gO1xuICB9XG5cbiAgYXN5bmMgYW5pbWF0ZVJlbW92YWwoY2VsbHM6IENlbGxbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcblxuICAgIGZvciAoY29uc3QgY2VsbCBvZiBjZWxscykge1xuICAgICAgY29uc3Qga2V5ID0gdGhpcy5tYWtlS2V5KGNlbGwucm93LCBjZWxsLmNvbCk7XG4gICAgICBjb25zdCB0aWxlVmlldyA9IHRoaXMudGlsZVZpZXdzLmdldChrZXkpO1xuXG4gICAgICBpZiAodGlsZVZpZXcpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aWxlVmlldy5wbGF5UmVtb3ZlQW5pbWF0aW9uKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgfVxuXG4gIGFzeW5jIGFuaW1hdGVHcmF2aXR5KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcblxuICAgIHRoaXMudGlsZVZpZXdzLmZvckVhY2goKHRpbGVWaWV3KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRYID0gdGlsZVZpZXcuY29sICogdGhpcy50aWxlU2l6ZVdpZHRoO1xuICAgICAgY29uc3QgdGFyZ2V0WSA9IC10aWxlVmlldy5yb3cgKiB0aGlzLnRpbGVTaXplSGVpZ2h0O1xuXG4gICAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUpID0+IHtcbiAgICAgICAgY2MudHdlZW4odGlsZVZpZXcubm9kZSlcbiAgICAgICAgICAudG8oMC40LCB7IHk6IHRhcmdldFksIHg6IHRhcmdldFggfSwgeyBlYXNpbmc6IFwiYm91bmNlT3V0XCIgfSlcbiAgICAgICAgICAuY2FsbCgoKSA9PiByZXNvbHZlKCkpXG4gICAgICAgICAgLnN0YXJ0KCk7XG4gICAgICB9KTtcbiAgICAgIHByb21pc2VzLnB1c2gocHJvbWlzZSk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gIH1cblxuICBhc3luYyBhbmltYXRlU3Bhd24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJvbWlzZXM6IFByb21pc2U8dm9pZD5bXSA9IFtdO1xuXG4gICAgdGhpcy50aWxlVmlld3MuZm9yRWFjaCgodGlsZVZpZXcpID0+IHtcbiAgICAgIHByb21pc2VzLnB1c2godGlsZVZpZXcucGxheVNwYXduQW5pbWF0aW9uKCkpO1xuICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/GameController.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '556c9z0mZtPFqdEQ4M89viL', 'GameController');
// scripts/GameController.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
const Board_1 = require("./logic/Board");
const Cell_1 = require("./logic/Cell");
const BoardView_1 = require("./BoardView");
var BoosterType;
(function (BoosterType) {
    BoosterType["None"] = "none";
    BoosterType["Teleport"] = "teleport";
    BoosterType["Bomb"] = "bomb";
})(BoosterType || (BoosterType = {}));
let GameController = class GameController extends cc.Component {
    constructor() {
        super(...arguments);
        this.boardView = null;
        this.scoreLabel = null;
        this.movesLabel = null;
        this.resultPopup = null;
        this.resultTitleLabel = null;
        this.resultMessageLabel = null;
        this.resultScoreLabel = null;
        this.teleportButton = null;
        this.teleportCountLabel = null;
        this.bombButton = null;
        this.bombCountLabel = null;
        this.isProcessing = false;
        this.score = 0;
        this.movesLeft = 20;
        this.targetScore = 500;
        this.isGameOver = false;
        this.activeBooster = BoosterType.None;
        this.teleportCount = 3;
        this.bombCount = 3;
        this.bombRadius = 1;
        this.teleportFirstSelected = false;
        this.teleportFirstRow = -1;
        this.teleportFirstCol = -1;
        this.superTileThreshold = 5;
    }
    onLoad() {
        this.board = new Board_1.Board(8, 8);
        this.board.fillRandom();
        if (this.boardView) {
            this.boardView.init(this.board, this);
        }
        else {
            cc.error("boardView не назначен!");
        }
        this.isGameOver = false;
        this.activeBooster = BoosterType.None;
        this.teleportFirstSelected = false;
        this.updateUI();
        this.updateBoosterUI();
        this.hideResultPopup();
        this.resetBoosterHighlights();
    }
    onTileClick(row, col) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isGameOver)
                return;
            if (this.isProcessing)
                return;
            const cell = this.board.getCell(row, col);
            if (cell && cell.isSuperTile) {
                yield this.handleSuperTileClick(row, col);
                return;
            }
            if (this.activeBooster !== BoosterType.None) {
                yield this.handleBoosterClick(row, col);
                return;
            }
            yield this.handleNormalMove(row, col);
        });
    }
    handleSuperTileClick(row, col) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = this.board.getCell(row, col);
            if (!cell || !cell.isSuperTile)
                return;
            this.isProcessing = true;
            cc.log(`Активирован супер-тайл типа "${cell.superType}" на (${row}, ${col})`);
            let cellsToRemove = [];
            switch (cell.superType) {
                case Cell_1.SuperTileType.Row:
                    for (let c = 0; c < this.board.cols; c++) {
                        const targetCell = this.board.getCell(row, c);
                        if (targetCell && !targetCell.isEmpty) {
                            cellsToRemove.push(targetCell);
                        }
                    }
                    cc.log(`Супер-тайл (строка): удалено ${cellsToRemove.length} тайлов`);
                    break;
                case Cell_1.SuperTileType.Column:
                    for (let r = 0; r < this.board.rows; r++) {
                        const targetCell = this.board.getCell(r, col);
                        if (targetCell && !targetCell.isEmpty) {
                            cellsToRemove.push(targetCell);
                        }
                    }
                    cc.log(`Супер-тайл (столбец): удалено ${cellsToRemove.length} тайлов`);
                    break;
                case Cell_1.SuperTileType.Radius:
                    const radius = 2;
                    for (let r = row - radius; r <= row + radius; r++) {
                        for (let c = col - radius; c <= col + radius; c++) {
                            const targetCell = this.board.getCell(r, c);
                            if (targetCell && !targetCell.isEmpty) {
                                cellsToRemove.push(targetCell);
                            }
                        }
                    }
                    cc.log(`Супер-тайл (радиус): удалено ${cellsToRemove.length} тайлов`);
                    break;
                case Cell_1.SuperTileType.All:
                    for (let r = 0; r < this.board.rows; r++) {
                        for (let c = 0; c < this.board.cols; c++) {
                            const targetCell = this.board.getCell(r, c);
                            if (targetCell && !targetCell.isEmpty) {
                                cellsToRemove.push(targetCell);
                            }
                        }
                    }
                    cc.log(`Супер-тайл (всё поле): удалено ${cellsToRemove.length} тайлов`);
                    break;
            }
            const points = cellsToRemove.length * 10 * 2;
            this.score += points;
            if (this.boardView) {
                yield this.boardView.animateRemoval(cellsToRemove);
            }
            const gravityMoves = this.board.getGravityMoves();
            this.board.removeCells(cellsToRemove);
            this.board.applyGravity();
            this.board.fillEmpty();
            if (this.boardView) {
                this.boardView.fullRebuild(this.board, gravityMoves);
                yield this.boardView.animateGravity();
            }
            this.updateUI();
            this.checkWinLose();
            if (!this.isGameOver) {
                this.isProcessing = false;
            }
            cc.log(`Супер-тайл: +${points} очков`);
        });
    }
    handleBoosterClick(row, col) {
        return __awaiter(this, void 0, void 0, function* () {
            const cell = this.board.getCell(row, col);
            if (!cell || cell.isEmpty)
                return;
            switch (this.activeBooster) {
                case BoosterType.Teleport:
                    yield this.selectTeleportTarget(row, col);
                    break;
                case BoosterType.Bomb:
                    yield this.useBomb(row, col);
                    break;
            }
        });
    }
    selectTeleportTarget(row, col) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.teleportFirstSelected) {
                this.teleportFirstSelected = true;
                this.teleportFirstRow = row;
                this.teleportFirstCol = col;
                cc.log(`Телепорт: выбран первый тайл (${row}, ${col})`);
            }
            else {
                cc.log(`Телепорт: меняем (${this.teleportFirstRow}, ${this.teleportFirstCol}) ` +
                    `и (${row}, ${col})`);
                this.isProcessing = true;
                const cell1 = this.board.getCell(this.teleportFirstRow, this.teleportFirstCol);
                const cell2 = this.board.getCell(row, col);
                if (cell1 && cell2) {
                    const tempColor = cell1.color;
                    const tempSuper = cell1.superType;
                    cell1.color = cell2.color;
                    cell1.superType = cell2.superType;
                    cell2.color = tempColor;
                    cell2.superType = tempSuper;
                }
                this.movesLeft--;
                this.teleportCount--;
                if (this.boardView) {
                    this.boardView.fullRebuild(this.board, []);
                }
                this.teleportFirstSelected = false;
                this.activeBooster = BoosterType.None;
                this.resetBoosterHighlights();
                this.updateUI();
                this.updateBoosterUI();
                this.checkWinLose();
                if (!this.isGameOver) {
                    this.isProcessing = false;
                }
                cc.log("Телепорт завершён");
            }
        });
    }
    useBomb(row, col) {
        return __awaiter(this, void 0, void 0, function* () {
            cc.log(`Используем БОМБУ на (${row}, ${col}), радиус: ${this.bombRadius}`);
            const cellsToRemove = [];
            for (let r = row - this.bombRadius; r <= row + this.bombRadius; r++) {
                for (let c = col - this.bombRadius; c <= col + this.bombRadius; c++) {
                    const cell = this.board.getCell(r, c);
                    if (cell && !cell.isEmpty) {
                        cellsToRemove.push(cell);
                    }
                }
            }
            if (cellsToRemove.length === 0) {
                cc.log("Бомба: нет тайлов для удаления");
                return;
            }
            this.isProcessing = true;
            cc.log(`Бомба уничтожает ${cellsToRemove.length} тайлов`);
            const points = cellsToRemove.length * 5;
            this.score += points;
            this.movesLeft--;
            this.bombCount--;
            if (this.boardView) {
                yield this.boardView.animateRemoval(cellsToRemove);
            }
            const gravityMoves = this.board.getGravityMoves();
            this.board.removeCells(cellsToRemove);
            this.board.applyGravity();
            this.board.fillEmpty();
            if (this.boardView) {
                this.boardView.fullRebuild(this.board, gravityMoves);
                yield this.boardView.animateGravity();
            }
            this.activeBooster = BoosterType.None;
            this.resetBoosterHighlights();
            this.updateUI();
            this.updateBoosterUI();
            this.checkWinLose();
            if (!this.isGameOver) {
                this.isProcessing = false;
            }
            cc.log(`Бомба: +${points} очков, осталось бомб: ${this.bombCount}`);
        });
    }
    handleNormalMove(row, col) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = this.board.findGroup(row, col);
            if (group.length < 2) {
                cc.log(`Группа из ${group.length} тайлов — недостаточно`);
                return;
            }
            this.isProcessing = true;
            cc.log(`Удаляем группу из ${group.length} тайлов`);
            const points = group.length * 10;
            this.score += points;
            this.movesLeft--;
            let createSuperTile = false;
            let superRow = row;
            let superCol = col;
            if (group.length >= this.superTileThreshold) {
                createSuperTile = true;
                cc.log(`Группа из ${group.length} тайлов — создаём СУПЕР-ТАЙЛ!`);
            }
            if (this.boardView) {
                yield this.boardView.animateRemoval(group);
            }
            const gravityMoves = this.board.getGravityMoves();
            this.board.removeCells(group);
            this.board.applyGravity();
            this.board.fillEmpty();
            4;
            if (createSuperTile) {
                const cell = this.board.getCell(row, col);
                if (cell) {
                    cell.color = Cell_1.ALL_SUPER_TILE_TYPES[Math.floor(Math.random() * Cell_1.ALL_SUPER_TILE_TYPES.length)];
                    cell.superType =
                        Cell_1.ALL_SUPER_TILE_TYPES[Math.floor(Math.random() * Cell_1.ALL_SUPER_TILE_TYPES.length)];
                    cc.log(`Супер-тайл создан на (${row}, ${col}), тип: ${cell.superType}`);
                }
            }
            if (this.boardView) {
                this.boardView.fullRebuild(this.board, gravityMoves);
                yield this.boardView.animateGravity();
            }
            this.updateUI();
            this.checkWinLose();
            if (!this.isGameOver) {
                this.isProcessing = false;
            }
            cc.log(`Обычный ход: +${points} очков`);
        });
    }
    onTeleportButtonClick() {
        if (this.isGameOver || this.isProcessing)
            return;
        if (this.teleportCount <= 0) {
            cc.log("Телепорты закончились!");
            return;
        }
        if (this.activeBooster === BoosterType.Teleport) {
            this.activeBooster = BoosterType.None;
            this.teleportFirstSelected = false;
        }
        else {
            this.activeBooster = BoosterType.Teleport;
            this.teleportFirstSelected = false;
        }
        this.resetBoosterHighlights();
        this.highlightActiveBooster();
        cc.log(`Бустер: ${this.activeBooster}`);
    }
    onBombButtonClick() {
        if (this.isGameOver || this.isProcessing)
            return;
        if (this.bombCount <= 0) {
            cc.log("Бомбы закончились!");
            return;
        }
        if (this.activeBooster === BoosterType.Bomb) {
            this.activeBooster = BoosterType.None;
        }
        else {
            this.activeBooster = BoosterType.Bomb;
        }
        this.resetBoosterHighlights();
        this.highlightActiveBooster();
        cc.log(`Бустер: ${this.activeBooster}`);
    }
    resetBoosterHighlights() {
        if (this.teleportButton)
            this.teleportButton.opacity = 255;
        if (this.bombButton)
            this.bombButton.opacity = 255;
    }
    highlightActiveBooster() {
        switch (this.activeBooster) {
            case BoosterType.Teleport:
                if (this.teleportButton)
                    this.teleportButton.opacity = 150;
                break;
            case BoosterType.Bomb:
                if (this.bombButton)
                    this.bombButton.opacity = 150;
                break;
        }
    }
    updateBoosterUI() {
        if (this.teleportCountLabel) {
            this.teleportCountLabel.string = `${this.teleportCount}`;
        }
        if (this.bombCountLabel) {
            this.bombCountLabel.string = `${this.bombCount}`;
        }
    }
    updateUI() {
        if (this.movesLabel) {
            this.movesLabel.string = `${this.movesLeft}`;
        }
        if (this.scoreLabel) {
            this.scoreLabel.string = `${this.score}/${this.targetScore}`;
        }
    }
    hideResultPopup() {
        if (this.resultPopup)
            this.resultPopup.active = false;
    }
    showResultPopup(isWin) {
        if (!this.resultPopup)
            return;
        if (isWin) {
            if (this.resultTitleLabel) {
                this.resultTitleLabel.string = "ПОБЕДА!";
                this.resultTitleLabel.node.color = new cc.Color(255, 215, 0);
            }
            if (this.resultMessageLabel) {
                this.resultMessageLabel.string = "Отличная игра!";
            }
        }
        else {
            if (this.resultTitleLabel) {
                this.resultTitleLabel.string = "ПОРАЖЕНИЕ!";
                this.resultTitleLabel.node.color = new cc.Color(255, 50, 50);
            }
            if (this.resultMessageLabel) {
                this.resultMessageLabel.string = "Закончились ходы";
            }
        }
        if (this.resultScoreLabel) {
            this.resultScoreLabel.string = `Счёт: ${this.score}/${this.targetScore}`;
        }
        this.resultPopup.active = true;
        this.resultPopup.scale = 0;
        cc.tween(this.resultPopup)
            .to(0.3, { scale: 1 }, { easing: "backOut" })
            .start();
    }
    checkWinLose() {
        if (this.score >= this.targetScore) {
            this.isGameOver = true;
            this.showResultPopup(true);
            return;
        }
        if (this.movesLeft <= 0) {
            this.isGameOver = true;
            this.showResultPopup(false);
            return;
        }
    }
    onRestartButtonClick() {
        this.hideResultPopup();
        this.score = 0;
        this.movesLeft = 20;
        this.isGameOver = false;
        this.isProcessing = false;
        this.activeBooster = BoosterType.None;
        this.teleportFirstSelected = false;
        this.teleportCount = 3;
        this.bombCount = 3;
        this.board = new Board_1.Board(8, 8);
        this.board.fillRandom();
        if (this.boardView) {
            this.boardView.init(this.board, this);
        }
        this.updateUI();
        this.updateBoosterUI();
        this.resetBoosterHighlights();
    }
};
__decorate([
    property(BoardView_1.default)
], GameController.prototype, "boardView", void 0);
__decorate([
    property(cc.Label)
], GameController.prototype, "scoreLabel", void 0);
__decorate([
    property(cc.Label)
], GameController.prototype, "movesLabel", void 0);
__decorate([
    property(cc.Node)
], GameController.prototype, "resultPopup", void 0);
__decorate([
    property(cc.Label)
], GameController.prototype, "resultTitleLabel", void 0);
__decorate([
    property(cc.Label)
], GameController.prototype, "resultMessageLabel", void 0);
__decorate([
    property(cc.Label)
], GameController.prototype, "resultScoreLabel", void 0);
__decorate([
    property(cc.Node)
], GameController.prototype, "teleportButton", void 0);
__decorate([
    property(cc.Label)
], GameController.prototype, "teleportCountLabel", void 0);
__decorate([
    property(cc.Node)
], GameController.prototype, "bombButton", void 0);
__decorate([
    property(cc.Label)
], GameController.prototype, "bombCountLabel", void 0);
GameController = __decorate([
    ccclass
], GameController);
exports.default = GameController;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMseUNBQXNDO0FBQ3RDLHVDQUtzQjtBQUN0QiwyQ0FBb0M7QUFHcEMsSUFBSyxXQUlKO0FBSkQsV0FBSyxXQUFXO0lBQ2QsNEJBQWEsQ0FBQTtJQUNiLG9DQUFxQixDQUFBO0lBQ3JCLDRCQUFhLENBQUE7QUFDZixDQUFDLEVBSkksV0FBVyxLQUFYLFdBQVcsUUFJZjtBQUdELElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXhEOztRQUdFLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBR25DLGVBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGVBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGdCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxxQkFBZ0IsR0FBb0IsSUFBSSxDQUFDO1FBR3pDLHVCQUFrQixHQUFvQixJQUFJLENBQUM7UUFHM0MscUJBQWdCLEdBQW9CLElBQUksQ0FBQztRQUd6QyxtQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsdUJBQWtCLEdBQW9CLElBQUksQ0FBQztRQUczQyxlQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxtQkFBYyxHQUFvQixJQUFJLENBQUM7UUFHL0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBQzFCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsa0JBQWEsR0FBZ0IsV0FBVyxDQUFDLElBQUksQ0FBQztRQUU5QyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUx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QURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNpQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNzQjtBQUd6QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUN3QjtBQUczQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNzQjtBQUd6QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNvQjtBQUd0QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUN3QjtBQUczQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNnQjtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNvQjtBQWpDcEIsY0FBYztJQURsQyxPQUFPO0dBQ2EsY0FBYyxDQThmbEM7a0JBOWZvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9sb2dpYy9Cb2FyZFwiO1xuaW1wb3J0IHtcbiAgQ2VsbCxcbiAgU3VwZXJUaWxlVHlwZSxcbiAgQUxMX1NVUEVSX1RJTEVfVFlQRVMsXG4gIFRpbGVDb2xvcixcbn0gZnJvbSBcIi4vbG9naWMvQ2VsbFwiO1xuaW1wb3J0IEJvYXJkVmlldyBmcm9tIFwiLi9Cb2FyZFZpZXdcIjtcblxuXG5lbnVtIEJvb3N0ZXJUeXBlIHtcbiAgTm9uZSA9IFwibm9uZVwiLFxuICBUZWxlcG9ydCA9IFwidGVsZXBvcnRcIixcbiAgQm9tYiA9IFwiYm9tYlwiLFxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gIEBwcm9wZXJ0eShCb2FyZFZpZXcpXG4gIGJvYXJkVmlldzogQm9hcmRWaWV3IHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBzY29yZUxhYmVsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgbW92ZXNMYWJlbDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgcmVzdWx0UG9wdXA6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIHJlc3VsdFRpdGxlTGFiZWw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICByZXN1bHRNZXNzYWdlTGFiZWw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICByZXN1bHRTY29yZUxhYmVsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICB0ZWxlcG9ydEJ1dHRvbjogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgdGVsZXBvcnRDb3VudExhYmVsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBib21iQnV0dG9uOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBib21iQ291bnRMYWJlbDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGJvYXJkITogQm9hcmQ7XG4gIHByaXZhdGUgaXNQcm9jZXNzaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2NvcmU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbW92ZXNMZWZ0OiBudW1iZXIgPSAyMDtcbiAgcHJpdmF0ZSB0YXJnZXRTY29yZTogbnVtYmVyID0gNTAwO1xuICBwcml2YXRlIGlzR2FtZU92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGFjdGl2ZUJvb3N0ZXI6IEJvb3N0ZXJUeXBlID0gQm9vc3RlclR5cGUuTm9uZTtcblxuICBwcml2YXRlIHRlbGVwb3J0Q291bnQ6IG51bWJlciA9IDM7XG5cbiAgcHJpdmF0ZSBib21iQ291bnQ6IG51bWJlciA9IDM7XG5cbiAgcHJpdmF0ZSBib21iUmFkaXVzOiBudW1iZXIgPSAxO1xuXG4gIHByaXZhdGUgdGVsZXBvcnRGaXJzdFNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB0ZWxlcG9ydEZpcnN0Um93OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSB0ZWxlcG9ydEZpcnN0Q29sOiBudW1iZXIgPSAtMTtcblxuICBwcml2YXRlIHN1cGVyVGlsZVRocmVzaG9sZDogbnVtYmVyID0gNTtcblxuICBvbkxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCg4LCA4KTtcbiAgICB0aGlzLmJvYXJkLmZpbGxSYW5kb20oKTtcblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgdGhpcy5ib2FyZFZpZXcuaW5pdCh0aGlzLmJvYXJkLCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2MuZXJyb3IoXCJib2FyZFZpZXcg0L3QtSDQvdCw0LfQvdCw0YfQtdC9IVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgIHRoaXMudGVsZXBvcnRGaXJzdFNlbGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgdGhpcy5oaWRlUmVzdWx0UG9wdXAoKTtcbiAgICB0aGlzLnJlc2V0Qm9vc3RlckhpZ2hsaWdodHMoKTtcbiAgfVxuXG4gIGFzeW5jIG9uVGlsZUNsaWNrKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmlzR2FtZU92ZXIpIHJldHVybjtcbiAgICBpZiAodGhpcy5pc1Byb2Nlc3NpbmcpIHJldHVybjtcblxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwocm93LCBjb2wpO1xuICAgIGlmIChjZWxsICYmIGNlbGwuaXNTdXBlclRpbGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU3VwZXJUaWxlQ2xpY2socm93LCBjb2wpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZUJvb3N0ZXIgIT09IEJvb3N0ZXJUeXBlLk5vbmUpIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQm9vc3RlckNsaWNrKHJvdywgY29sKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmhhbmRsZU5vcm1hbE1vdmUocm93LCBjb2wpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTdXBlclRpbGVDbGljayhyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZC5nZXRDZWxsKHJvdywgY29sKTtcbiAgICBpZiAoIWNlbGwgfHwgIWNlbGwuaXNTdXBlclRpbGUpIHJldHVybjtcblxuICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gdHJ1ZTtcblxuICAgIGNjLmxvZyhcbiAgICAgIGDQkNC60YLQuNCy0LjRgNC+0LLQsNC9INGB0YPQv9C10YAt0YLQsNC50Lsg0YLQuNC/0LAgXCIke2NlbGwuc3VwZXJUeXBlfVwiINC90LAgKCR7cm93fSwgJHtjb2x9KWAsXG4gICAgKTtcblxuICAgIGxldCBjZWxsc1RvUmVtb3ZlOiBDZWxsW10gPSBbXTtcblxuICAgIHN3aXRjaCAoY2VsbC5zdXBlclR5cGUpIHtcbiAgICAgIGNhc2UgU3VwZXJUaWxlVHlwZS5Sb3c6XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgdGhpcy5ib2FyZC5jb2xzOyBjKyspIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXRDZWxsID0gdGhpcy5ib2FyZC5nZXRDZWxsKHJvdywgYyk7XG4gICAgICAgICAgaWYgKHRhcmdldENlbGwgJiYgIXRhcmdldENlbGwuaXNFbXB0eSkge1xuICAgICAgICAgICAgY2VsbHNUb1JlbW92ZS5wdXNoKHRhcmdldENlbGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50LsgKNGB0YLRgNC+0LrQsCk6INGD0LTQsNC70LXQvdC+ICR7Y2VsbHNUb1JlbW92ZS5sZW5ndGh9INGC0LDQudC70L7QsmApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBTdXBlclRpbGVUeXBlLkNvbHVtbjpcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLmJvYXJkLnJvd3M7IHIrKykge1xuICAgICAgICAgIGNvbnN0IHRhcmdldENlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwociwgY29sKTtcbiAgICAgICAgICBpZiAodGFyZ2V0Q2VsbCAmJiAhdGFyZ2V0Q2VsbC5pc0VtcHR5KSB7XG4gICAgICAgICAgICBjZWxsc1RvUmVtb3ZlLnB1c2godGFyZ2V0Q2VsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhg0KHRg9C/0LXRgC3RgtCw0LnQuyAo0YHRgtC+0LvQsdC10YYpOiDRg9C00LDQu9C10L3QviAke2NlbGxzVG9SZW1vdmUubGVuZ3RofSDRgtCw0LnQu9C+0LJgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgU3VwZXJUaWxlVHlwZS5SYWRpdXM6XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IDI7XG4gICAgICAgIGZvciAobGV0IHIgPSByb3cgLSByYWRpdXM7IHIgPD0gcm93ICsgcmFkaXVzOyByKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBjID0gY29sIC0gcmFkaXVzOyBjIDw9IGNvbCArIHJhZGl1czsgYysrKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDZWxsID0gdGhpcy5ib2FyZC5nZXRDZWxsKHIsIGMpO1xuICAgICAgICAgICAgaWYgKHRhcmdldENlbGwgJiYgIXRhcmdldENlbGwuaXNFbXB0eSkge1xuICAgICAgICAgICAgICBjZWxsc1RvUmVtb3ZlLnB1c2godGFyZ2V0Q2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhg0KHRg9C/0LXRgC3RgtCw0LnQuyAo0YDQsNC00LjRg9GBKTog0YPQtNCw0LvQtdC90L4gJHtjZWxsc1RvUmVtb3ZlLmxlbmd0aH0g0YLQsNC50LvQvtCyYCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFN1cGVyVGlsZVR5cGUuQWxsOlxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMuYm9hcmQucm93czsgcisrKSB7XG4gICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmJvYXJkLmNvbHM7IGMrKykge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IHRoaXMuYm9hcmQuZ2V0Q2VsbChyLCBjKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsICYmICF0YXJnZXRDZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgY2VsbHNUb1JlbW92ZS5wdXNoKHRhcmdldENlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50LsgKNCy0YHRkSDQv9C+0LvQtSk6INGD0LTQsNC70LXQvdC+ICR7Y2VsbHNUb1JlbW92ZS5sZW5ndGh9INGC0LDQudC70L7QsmApO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBwb2ludHMgPSBjZWxsc1RvUmVtb3ZlLmxlbmd0aCAqIDEwICogMjtcbiAgICB0aGlzLnNjb3JlICs9IHBvaW50cztcblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYW5pbWF0ZVJlbW92YWwoY2VsbHNUb1JlbW92ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3Jhdml0eU1vdmVzID0gdGhpcy5ib2FyZC5nZXRHcmF2aXR5TW92ZXMoKTtcbiAgICB0aGlzLmJvYXJkLnJlbW92ZUNlbGxzKGNlbGxzVG9SZW1vdmUpO1xuICAgIHRoaXMuYm9hcmQuYXBwbHlHcmF2aXR5KCk7XG4gICAgdGhpcy5ib2FyZC5maWxsRW1wdHkoKTtcblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgdGhpcy5ib2FyZFZpZXcuZnVsbFJlYnVpbGQodGhpcy5ib2FyZCwgZ3Jhdml0eU1vdmVzKTtcbiAgICAgIGF3YWl0IHRoaXMuYm9hcmRWaWV3LmFuaW1hdGVHcmF2aXR5KCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMuY2hlY2tXaW5Mb3NlKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50Ls6ICske3BvaW50c30g0L7Rh9C60L7QsmApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVCb29zdGVyQ2xpY2socm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmQuZ2V0Q2VsbChyb3csIGNvbCk7XG4gICAgaWYgKCFjZWxsIHx8IGNlbGwuaXNFbXB0eSkgcmV0dXJuO1xuXG4gICAgc3dpdGNoICh0aGlzLmFjdGl2ZUJvb3N0ZXIpIHtcbiAgICAgIGNhc2UgQm9vc3RlclR5cGUuVGVsZXBvcnQ6XG4gICAgICAgIGF3YWl0IHRoaXMuc2VsZWN0VGVsZXBvcnRUYXJnZXQocm93LCBjb2wpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBCb29zdGVyVHlwZS5Cb21iOlxuICAgICAgICBhd2FpdCB0aGlzLnVzZUJvbWIocm93LCBjb2wpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNlbGVjdFRlbGVwb3J0VGFyZ2V0KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy50ZWxlcG9ydEZpcnN0U2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMudGVsZXBvcnRGaXJzdFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudGVsZXBvcnRGaXJzdFJvdyA9IHJvdztcbiAgICAgIHRoaXMudGVsZXBvcnRGaXJzdENvbCA9IGNvbDtcbiAgICAgIGNjLmxvZyhg0KLQtdC70LXQv9C+0YDRgjog0LLRi9Cx0YDQsNC9INC/0LXRgNCy0YvQuSDRgtCw0LnQuyAoJHtyb3d9LCAke2NvbH0pYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNjLmxvZyhcbiAgICAgICAgYNCi0LXQu9C10L/QvtGA0YI6INC80LXQvdGP0LXQvCAoJHt0aGlzLnRlbGVwb3J0Rmlyc3RSb3d9LCAke3RoaXMudGVsZXBvcnRGaXJzdENvbH0pIGAgK1xuICAgICAgICAgIGDQuCAoJHtyb3d9LCAke2NvbH0pYCxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gdHJ1ZTtcblxuICAgICAgY29uc3QgY2VsbDEgPSB0aGlzLmJvYXJkLmdldENlbGwoXG4gICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdFJvdyxcbiAgICAgICAgdGhpcy50ZWxlcG9ydEZpcnN0Q29sLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNlbGwyID0gdGhpcy5ib2FyZC5nZXRDZWxsKHJvdywgY29sKTtcblxuICAgICAgaWYgKGNlbGwxICYmIGNlbGwyKSB7XG4gICAgICAgIGNvbnN0IHRlbXBDb2xvciA9IGNlbGwxLmNvbG9yO1xuICAgICAgICBjb25zdCB0ZW1wU3VwZXIgPSBjZWxsMS5zdXBlclR5cGU7XG4gICAgICAgIGNlbGwxLmNvbG9yID0gY2VsbDIuY29sb3I7XG4gICAgICAgIGNlbGwxLnN1cGVyVHlwZSA9IGNlbGwyLnN1cGVyVHlwZTtcbiAgICAgICAgY2VsbDIuY29sb3IgPSB0ZW1wQ29sb3I7XG4gICAgICAgIGNlbGwyLnN1cGVyVHlwZSA9IHRlbXBTdXBlcjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3Zlc0xlZnQtLTtcbiAgICAgIHRoaXMudGVsZXBvcnRDb3VudC0tO1xuXG4gICAgICBpZiAodGhpcy5ib2FyZFZpZXcpIHtcbiAgICAgICAgdGhpcy5ib2FyZFZpZXcuZnVsbFJlYnVpbGQodGhpcy5ib2FyZCwgW10pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRlbGVwb3J0Rmlyc3RTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5hY3RpdmVCb29zdGVyID0gQm9vc3RlclR5cGUuTm9uZTtcbiAgICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgdGhpcy5jaGVja1dpbkxvc2UoKTtcblxuICAgICAgaWYgKCF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY2MubG9nKFwi0KLQtdC70LXQv9C+0YDRgiDQt9Cw0LLQtdGA0YjRkdC9XCIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXNlQm9tYihyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjYy5sb2coYNCY0YHQv9C+0LvRjNC30YPQtdC8INCR0J7QnNCR0KMg0L3QsCAoJHtyb3d9LCAke2NvbH0pLCDRgNCw0LTQuNGD0YE6ICR7dGhpcy5ib21iUmFkaXVzfWApO1xuXG4gICAgY29uc3QgY2VsbHNUb1JlbW92ZTogQ2VsbFtdID0gW107XG5cbiAgICBmb3IgKGxldCByID0gcm93IC0gdGhpcy5ib21iUmFkaXVzOyByIDw9IHJvdyArIHRoaXMuYm9tYlJhZGl1czsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gY29sIC0gdGhpcy5ib21iUmFkaXVzOyBjIDw9IGNvbCArIHRoaXMuYm9tYlJhZGl1czsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwociwgYyk7XG4gICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgICBjZWxsc1RvUmVtb3ZlLnB1c2goY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2VsbHNUb1JlbW92ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIGNjLmxvZyhcItCR0L7QvNCx0LA6INC90LXRgiDRgtCw0LnQu9C+0LIg0LTQu9GPINGD0LTQsNC70LXQvdC40Y9cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSB0cnVlO1xuXG4gICAgY2MubG9nKGDQkdC+0LzQsdCwINGD0L3QuNGH0YLQvtC20LDQtdGCICR7Y2VsbHNUb1JlbW92ZS5sZW5ndGh9INGC0LDQudC70L7QsmApO1xuXG4gICAgY29uc3QgcG9pbnRzID0gY2VsbHNUb1JlbW92ZS5sZW5ndGggKiA1O1xuICAgIHRoaXMuc2NvcmUgKz0gcG9pbnRzO1xuICAgIHRoaXMubW92ZXNMZWZ0LS07XG4gICAgdGhpcy5ib21iQ291bnQtLTtcbiAgICBpZiAodGhpcy5ib2FyZFZpZXcpIHtcbiAgICAgIGF3YWl0IHRoaXMuYm9hcmRWaWV3LmFuaW1hdGVSZW1vdmFsKGNlbGxzVG9SZW1vdmUpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyYXZpdHlNb3ZlcyA9IHRoaXMuYm9hcmQuZ2V0R3Jhdml0eU1vdmVzKCk7XG4gICAgdGhpcy5ib2FyZC5yZW1vdmVDZWxscyhjZWxsc1RvUmVtb3ZlKTtcbiAgICB0aGlzLmJvYXJkLmFwcGx5R3Jhdml0eSgpO1xuICAgIHRoaXMuYm9hcmQuZmlsbEVtcHR5KCk7XG4gICAgaWYgKHRoaXMuYm9hcmRWaWV3KSB7XG4gICAgICB0aGlzLmJvYXJkVmlldy5mdWxsUmVidWlsZCh0aGlzLmJvYXJkLCBncmF2aXR5TW92ZXMpO1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYW5pbWF0ZUdyYXZpdHkoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgdGhpcy5jaGVja1dpbkxvc2UoKTtcblxuICAgIGlmICghdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICB0aGlzLmlzUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNjLmxvZyhg0JHQvtC80LHQsDogKyR7cG9pbnRzfSDQvtGH0LrQvtCyLCDQvtGB0YLQsNC70L7RgdGMINCx0L7QvNCxOiAke3RoaXMuYm9tYkNvdW50fWApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVOb3JtYWxNb3ZlKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5ib2FyZC5maW5kR3JvdXAocm93LCBjb2wpO1xuXG4gICAgaWYgKGdyb3VwLmxlbmd0aCA8IDIpIHtcbiAgICAgIGNjLmxvZyhg0JPRgNGD0L/Qv9CwINC40LcgJHtncm91cC5sZW5ndGh9INGC0LDQudC70L7QsiDigJQg0L3QtdC00L7RgdGC0LDRgtC+0YfQvdC+YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSB0cnVlO1xuXG4gICAgY2MubG9nKGDQo9C00LDQu9GP0LXQvCDQs9GA0YPQv9C/0YMg0LjQtyAke2dyb3VwLmxlbmd0aH0g0YLQsNC50LvQvtCyYCk7XG5cbiAgICBjb25zdCBwb2ludHMgPSBncm91cC5sZW5ndGggKiAxMDtcbiAgICB0aGlzLnNjb3JlICs9IHBvaW50cztcbiAgICB0aGlzLm1vdmVzTGVmdC0tO1xuXG4gICAgbGV0IGNyZWF0ZVN1cGVyVGlsZSA9IGZhbHNlO1xuICAgIGxldCBzdXBlclJvdyA9IHJvdztcbiAgICBsZXQgc3VwZXJDb2wgPSBjb2w7XG5cbiAgICBpZiAoZ3JvdXAubGVuZ3RoID49IHRoaXMuc3VwZXJUaWxlVGhyZXNob2xkKSB7XG4gICAgICBjcmVhdGVTdXBlclRpbGUgPSB0cnVlO1xuICAgICAgY2MubG9nKGDQk9GA0YPQv9C/0LAg0LjQtyAke2dyb3VwLmxlbmd0aH0g0YLQsNC50LvQvtCyIOKAlCDRgdC+0LfQtNCw0ZHQvCDQodCj0J/QldCgLdCi0JDQmdCbIWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYW5pbWF0ZVJlbW92YWwoZ3JvdXApO1xuICAgIH1cblxuICAgIGNvbnN0IGdyYXZpdHlNb3ZlcyA9IHRoaXMuYm9hcmQuZ2V0R3Jhdml0eU1vdmVzKCk7XG4gICAgdGhpcy5ib2FyZC5yZW1vdmVDZWxscyhncm91cCk7XG4gICAgdGhpcy5ib2FyZC5hcHBseUdyYXZpdHkoKTtcbiAgICB0aGlzLmJvYXJkLmZpbGxFbXB0eSgpO1xuNFxuICAgIGlmIChjcmVhdGVTdXBlclRpbGUpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwocm93LCBjb2wpO1xuICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgY2VsbC5jb2xvciA9IEFMTF9TVVBFUl9USUxFX1RZUEVTW1xuICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEFMTF9TVVBFUl9USUxFX1RZUEVTLmxlbmd0aClcbiAgICAgICAgXSBhcyBhbnk7XG4gICAgICAgIGNlbGwuc3VwZXJUeXBlID1cbiAgICAgICAgICBBTExfU1VQRVJfVElMRV9UWVBFU1tcbiAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEFMTF9TVVBFUl9USUxFX1RZUEVTLmxlbmd0aClcbiAgICAgICAgICBdO1xuICAgICAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50Lsg0YHQvtC30LTQsNC9INC90LAgKCR7cm93fSwgJHtjb2x9KSwg0YLQuNC/OiAke2NlbGwuc3VwZXJUeXBlfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgdGhpcy5ib2FyZFZpZXcuZnVsbFJlYnVpbGQodGhpcy5ib2FyZCwgZ3Jhdml0eU1vdmVzKTtcbiAgICAgIGF3YWl0IHRoaXMuYm9hcmRWaWV3LmFuaW1hdGVHcmF2aXR5KCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMuY2hlY2tXaW5Mb3NlKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjYy5sb2coYNCe0LHRi9GH0L3Ri9C5INGF0L7QtDogKyR7cG9pbnRzfSDQvtGH0LrQvtCyYCk7XG4gIH1cblxuICBvblRlbGVwb3J0QnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNHYW1lT3ZlciB8fCB0aGlzLmlzUHJvY2Vzc2luZykgcmV0dXJuO1xuICAgIGlmICh0aGlzLnRlbGVwb3J0Q291bnQgPD0gMCkge1xuICAgICAgY2MubG9nKFwi0KLQtdC70LXQv9C+0YDRgtGLINC30LDQutC+0L3Rh9C40LvQuNGB0YwhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZUJvb3N0ZXIgPT09IEJvb3N0ZXJUeXBlLlRlbGVwb3J0KSB7XG4gICAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgICAgdGhpcy50ZWxlcG9ydEZpcnN0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVCb29zdGVyID0gQm9vc3RlclR5cGUuVGVsZXBvcnQ7XG4gICAgICB0aGlzLnRlbGVwb3J0Rmlyc3RTZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuICAgIHRoaXMuaGlnaGxpZ2h0QWN0aXZlQm9vc3RlcigpO1xuICAgIGNjLmxvZyhg0JHRg9GB0YLQtdGAOiAke3RoaXMuYWN0aXZlQm9vc3Rlcn1gKTtcbiAgfVxuXG4gIG9uQm9tYkJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzR2FtZU92ZXIgfHwgdGhpcy5pc1Byb2Nlc3NpbmcpIHJldHVybjtcbiAgICBpZiAodGhpcy5ib21iQ291bnQgPD0gMCkge1xuICAgICAgY2MubG9nKFwi0JHQvtC80LHRiyDQt9Cw0LrQvtC90YfQuNC70LjRgdGMIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmVCb29zdGVyID09PSBCb29zdGVyVHlwZS5Cb21iKSB7XG4gICAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Cb21iO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuICAgIHRoaXMuaGlnaGxpZ2h0QWN0aXZlQm9vc3RlcigpO1xuICAgIGNjLmxvZyhg0JHRg9GB0YLQtdGAOiAke3RoaXMuYWN0aXZlQm9vc3Rlcn1gKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRCb29zdGVySGlnaGxpZ2h0cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50ZWxlcG9ydEJ1dHRvbikgdGhpcy50ZWxlcG9ydEJ1dHRvbi5vcGFjaXR5ID0gMjU1O1xuICAgIGlmICh0aGlzLmJvbWJCdXR0b24pIHRoaXMuYm9tYkJ1dHRvbi5vcGFjaXR5ID0gMjU1O1xuICB9XG5cbiAgcHJpdmF0ZSBoaWdobGlnaHRBY3RpdmVCb29zdGVyKCk6IHZvaWQge1xuICAgIHN3aXRjaCAodGhpcy5hY3RpdmVCb29zdGVyKSB7XG4gICAgICBjYXNlIEJvb3N0ZXJUeXBlLlRlbGVwb3J0OlxuICAgICAgICBpZiAodGhpcy50ZWxlcG9ydEJ1dHRvbikgdGhpcy50ZWxlcG9ydEJ1dHRvbi5vcGFjaXR5ID0gMTUwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQm9vc3RlclR5cGUuQm9tYjpcbiAgICAgICAgaWYgKHRoaXMuYm9tYkJ1dHRvbikgdGhpcy5ib21iQnV0dG9uLm9wYWNpdHkgPSAxNTA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG5wcml2YXRlIHVwZGF0ZUJvb3N0ZXJVSSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50ZWxlcG9ydENvdW50TGFiZWwpIHtcbiAgICAgIHRoaXMudGVsZXBvcnRDb3VudExhYmVsLnN0cmluZyA9IGAke3RoaXMudGVsZXBvcnRDb3VudH1gO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib21iQ291bnRMYWJlbCkge1xuICAgICAgdGhpcy5ib21iQ291bnRMYWJlbC5zdHJpbmcgPSBgJHt0aGlzLmJvbWJDb3VudH1gO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVUkoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW92ZXNMYWJlbCkge1xuICAgICAgdGhpcy5tb3Zlc0xhYmVsLnN0cmluZyA9IGAke3RoaXMubW92ZXNMZWZ0fWA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNjb3JlTGFiZWwpIHtcbiAgICAgIHRoaXMuc2NvcmVMYWJlbC5zdHJpbmcgPSBgJHt0aGlzLnNjb3JlfS8ke3RoaXMudGFyZ2V0U2NvcmV9YDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGVSZXN1bHRQb3B1cCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZXN1bHRQb3B1cCkgdGhpcy5yZXN1bHRQb3B1cC5hY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd1Jlc3VsdFBvcHVwKGlzV2luOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlc3VsdFBvcHVwKSByZXR1cm47XG5cbiAgICBpZiAoaXNXaW4pIHtcbiAgICAgIGlmICh0aGlzLnJlc3VsdFRpdGxlTGFiZWwpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRUaXRsZUxhYmVsLnN0cmluZyA9IFwi0J/QntCR0JXQlNCQIVwiO1xuICAgICAgICB0aGlzLnJlc3VsdFRpdGxlTGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDIxNSwgMCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5yZXN1bHRNZXNzYWdlTGFiZWwpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRNZXNzYWdlTGFiZWwuc3RyaW5nID0gXCLQntGC0LvQuNGH0L3QsNGPINC40LPRgNCwIVwiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5yZXN1bHRUaXRsZUxhYmVsKSB7XG4gICAgICAgIHRoaXMucmVzdWx0VGl0bGVMYWJlbC5zdHJpbmcgPSBcItCf0J7QoNCQ0JbQldCd0JjQlSFcIjtcbiAgICAgICAgdGhpcy5yZXN1bHRUaXRsZUxhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCA1MCwgNTApO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucmVzdWx0TWVzc2FnZUxhYmVsKSB7XG4gICAgICAgIHRoaXMucmVzdWx0TWVzc2FnZUxhYmVsLnN0cmluZyA9IFwi0JfQsNC60L7QvdGH0LjQu9C40YHRjCDRhdC+0LTRi1wiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnJlc3VsdFNjb3JlTGFiZWwpIHtcbiAgICAgIHRoaXMucmVzdWx0U2NvcmVMYWJlbC5zdHJpbmcgPSBg0KHRh9GR0YI6ICR7dGhpcy5zY29yZX0vJHt0aGlzLnRhcmdldFNjb3JlfWA7XG4gICAgfVxuXG4gICAgdGhpcy5yZXN1bHRQb3B1cC5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucmVzdWx0UG9wdXAuc2NhbGUgPSAwO1xuICAgIGNjLnR3ZWVuKHRoaXMucmVzdWx0UG9wdXApXG4gICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImJhY2tPdXRcIiB9KVxuICAgICAgLnN0YXJ0KCk7XG4gIH1cblxuXG4gIHByaXZhdGUgY2hlY2tXaW5Mb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjb3JlID49IHRoaXMudGFyZ2V0U2NvcmUpIHtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICB0aGlzLnNob3dSZXN1bHRQb3B1cCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tb3Zlc0xlZnQgPD0gMCkge1xuICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2hvd1Jlc3VsdFBvcHVwKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBvblJlc3RhcnRCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGVSZXN1bHRQb3B1cCgpO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5tb3Zlc0xlZnQgPSAyMDtcbiAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmlzUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuYWN0aXZlQm9vc3RlciA9IEJvb3N0ZXJUeXBlLk5vbmU7XG4gICAgdGhpcy50ZWxlcG9ydEZpcnN0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRlbGVwb3J0Q291bnQgPSAzO1xuICAgIHRoaXMuYm9tYkNvdW50ID0gMztcblxuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoOCwgOCk7XG4gICAgdGhpcy5ib2FyZC5maWxsUmFuZG9tKCk7XG5cbiAgICBpZiAodGhpcy5ib2FyZFZpZXcpIHtcbiAgICAgIHRoaXMuYm9hcmRWaWV3LmluaXQodGhpcy5ib2FyZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgdGhpcy5yZXNldEJvb3N0ZXJIaWdobGlnaHRzKCk7XG4gIH1cbn1cbiJdfQ==
//------QC-SOURCE-SPLIT------

                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/logic/Board.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcbG9naWNcXEJvYXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFxRDtBQUVyRCxNQUFhLEtBQUs7SUFPaEIsWUFBWSxJQUFZLEVBQUUsSUFBWTtRQUNwQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVmLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFdBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDbEM7U0FDRjtJQUNILENBQUM7SUFFRCxPQUFPLENBQUMsR0FBVyxFQUFFLEdBQVc7UUFDOUIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDOUQsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsVUFBVTtRQUNSLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFF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QyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlCO1NBQ0Y7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsS0FBSztRQUNILE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNsQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDNUM7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztDQUNGO0FBak9ELHNCQWlPQyIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENlbGwsIFRpbGVDb2xvciwgQUxMX0NPTE9SUyB9IGZyb20gXCIuL0NlbGxcIjtcblxuZXhwb3J0IGNsYXNzIEJvYXJkIHtcbiAgcmVhZG9ubHkgcm93czogbnVtYmVyO1xuXG4gIHJlYWRvbmx5IGNvbHM6IG51bWJlcjtcblxuICBwcml2YXRlIGdyaWQ6IENlbGxbXVtdO1xuXG4gIGNvbnN0cnVjdG9yKHJvd3M6IG51bWJlciwgY29sczogbnVtYmVyKSB7XG4gICAgdGhpcy5yb3dzID0gcm93cztcbiAgICB0aGlzLmNvbHMgPSBjb2xzO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCByb3dzOyByKyspIHtcbiAgICAgIHRoaXMuZ3JpZFtyXSA9IFtdO1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBjb2xzOyBjKyspIHtcbiAgICAgICAgdGhpcy5ncmlkW3JdW2NdID0gbmV3IENlbGwociwgYyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2VsbChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBDZWxsIHwgbnVsbCB7XG4gICAgaWYgKHJvdyA8IDAgfHwgcm93ID49IHRoaXMucm93cyB8fCBjb2wgPCAwIHx8IGNvbCA+PSB0aGlzLmNvbHMpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ncmlkW3Jvd11bY29sXTtcbiAgfVxuXG4gIGZpbGxSYW5kb20oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLnJvd3M7IHIrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbHM7IGMrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkW3JdW2NdO1xuICAgICAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEFMTF9DT0xPUlMubGVuZ3RoKTtcbiAgICAgICAgY2VsbC5jb2xvciA9IEFMTF9DT0xPUlNbcmFuZG9tSW5kZXhdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZpbmRHcm91cChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBDZWxsW10ge1xuICAgIGNvbnN0IHN0YXJ0Q2VsbCA9IHRoaXMuZ2V0Q2VsbChyb3csIGNvbCk7XG5cbiAgICBpZiAoIXN0YXJ0Q2VsbCB8fCBzdGFydENlbGwuaXNFbXB0eSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IHRhcmdldENvbG9yID0gc3RhcnRDZWxsLmNvbG9yO1xuICAgIGNvbnN0IGdyb3VwOiBDZWxsW10gPSBbXTtcblxuICAgIGNvbnN0IHZpc2l0ZWQ6IGJvb2xlYW5bXVtdID0gW107XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLnJvd3M7IHIrKykge1xuICAgICAgdmlzaXRlZFtyXSA9IG5ldyBBcnJheSh0aGlzLmNvbHMpLmZpbGwoZmFsc2UpO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlOiBDZWxsW10gPSBbc3RhcnRDZWxsXTtcbiAgICB2aXNpdGVkW3Jvd11bY29sXSA9IHRydWU7XG5cbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgY3VycmVudCA9IHF1ZXVlLnNoaWZ0KCkhO1xuICAgICAgZ3JvdXAucHVzaChjdXJyZW50KTtcblxuICAgICAgY29uc3QgbmVpZ2hib3JzID0gW1xuICAgICAgICB0aGlzLmdldENlbGwoY3VycmVudC5yb3cgLSAxLCBjdXJyZW50LmNvbCksXG4gICAgICAgIHRoaXMuZ2V0Q2VsbChjdXJyZW50LnJvdyArIDEsIGN1cnJlbnQuY29sKSxcbiAgICAgICAgdGhpcy5nZXRDZWxsKGN1cnJlbnQucm93LCBjdXJyZW50LmNvbCAtIDEpLFxuICAgICAgICB0aGlzLmdldENlbGwoY3VycmVudC5yb3csIGN1cnJlbnQuY29sICsgMSksXG4gICAgICBdO1xuXG4gICAgICBmb3IgKGNvbnN0IG5laWdoYm9yIG9mIG5laWdoYm9ycykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgbmVpZ2hib3IgJiZcbiAgICAgICAgICAhdmlzaXRlZFtuZWlnaGJvci5yb3ddW25laWdoYm9yLmNvbF0gJiZcbiAgICAgICAgICBuZWlnaGJvci5jb2xvciA9PT0gdGFyZ2V0Q29sb3JcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmlzaXRlZFtuZWlnaGJvci5yb3ddW25laWdoYm9yLmNvbF0gPSB0cnVlO1xuICAgICAgICAgIHF1ZXVlLnB1c2gobmVpZ2hib3IpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3VwO1xuICB9XG5cbiAgcmVtb3ZlQ2VsbHMoY2VsbHM6IENlbGxbXSk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgY2VsbCBvZiBjZWxscykge1xuICAgICAgY2VsbC5jbGVhcigpO1xuICAgIH1cbiAgfVxuXG4gIGFwcGx5R3Jhdml0eSgpOiB2b2lkIHtcbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sczsgYysrKSB7XG4gICAgICBsZXQgd3JpdGVSb3cgPSB0aGlzLnJvd3MgLSAxO1xuXG4gICAgICBmb3IgKGxldCByID0gdGhpcy5yb3dzIC0gMTsgciA+PSAwOyByLS0pIHtcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuZ2V0Q2VsbChyLCBjKTtcblxuICAgICAgICBpZiAoY2VsbCAmJiAhY2VsbC5pc0VtcHR5KSB7XG4gICAgICAgICAgaWYgKHIgIT09IHdyaXRlUm93KSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDZWxsID0gdGhpcy5nZXRDZWxsKHdyaXRlUm93LCBjKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsKSB7XG4gICAgICAgICAgICAgIHRhcmdldENlbGwuY29sb3IgPSBjZWxsLmNvbG9yO1xuICAgICAgICAgICAgICB0YXJnZXRDZWxsLnN1cGVyVHlwZSA9IGNlbGwuc3VwZXJUeXBlO1xuICAgICAgICAgICAgICBjZWxsLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdyaXRlUm93LS07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmaWxsRW1wdHkoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLnJvd3M7IHIrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbHM7IGMrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ncmlkW3JdW2NdO1xuICAgICAgICBpZiAoY2VsbC5pc0VtcHR5KSB7XG4gICAgICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBBTExfQ09MT1JTLmxlbmd0aCk7XG4gICAgICAgICAgY2VsbC5jb2xvciA9IEFMTF9DT0xPUlNbcmFuZG9tSW5kZXhdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0R3Jhdml0eU1vdmVzKCk6IEFycmF5PHtcbiAgICBmcm9tUm93OiBudW1iZXI7XG4gICAgZnJvbUNvbDogbnVtYmVyO1xuICAgIHRvUm93OiBudW1iZXI7XG4gICAgdG9Db2w6IG51bWJlcjtcbiAgfT4ge1xuICAgIGNvbnN0IG1vdmVzOiBBcnJheTx7XG4gICAgICBmcm9tUm93OiBudW1iZXI7XG4gICAgICBmcm9tQ29sOiBudW1iZXI7XG4gICAgICB0b1JvdzogbnVtYmVyO1xuICAgICAgdG9Db2w6IG51bWJlcjtcbiAgICB9PiA9IFtdO1xuXG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbHM7IGMrKykge1xuICAgICAgbGV0IHdyaXRlUm93ID0gdGhpcy5yb3dzIC0gMTtcblxuICAgICAgZm9yIChsZXQgciA9IHRoaXMucm93cyAtIDE7IHIgPj0gMDsgci0tKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdldENlbGwociwgYyk7XG4gICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgICBpZiAociAhPT0gd3JpdGVSb3cpIHtcbiAgICAgICAgICAgIG1vdmVzLnB1c2goe1xuICAgICAgICAgICAgICBmcm9tUm93OiByLFxuICAgICAgICAgICAgICBmcm9tQ29sOiBjLFxuICAgICAgICAgICAgICB0b1Jvdzogd3JpdGVSb3csXG4gICAgICAgICAgICAgIHRvQ29sOiBjLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdyaXRlUm93LS07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbW92ZXM7XG4gIH1cblxuICBnZXROZXdUaWxlcygpOiBBcnJheTx7IHJvdzogbnVtYmVyOyBjb2w6IG51bWJlcjsgY29sb3I6IFRpbGVDb2xvciB9PiB7XG4gICAgY29uc3QgbmV3VGlsZXM6IEFycmF5PHsgcm93OiBudW1iZXI7IGNvbDogbnVtYmVyOyBjb2xvcjogVGlsZUNvbG9yIH0+ID0gW107XG5cbiAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMucm93czsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sczsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmdyaWRbcl1bY107XG4gICAgICAgIGlmIChjZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgICBjb25zdCBjb2xvciA9XG4gICAgICAgICAgICBBTExfQ09MT1JTW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEFMTF9DT0xPUlMubGVuZ3RoKV07XG4gICAgICAgICAgbmV3VGlsZXMucHVzaCh7IHJvdzogciwgY29sOiBjLCBjb2xvcjogY29sb3IgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbmV3VGlsZXM7XG4gIH1cblxuICBoYXNWYWxpZE1vdmVzKCk6IGJvb2xlYW4ge1xuICAgIGZvciAobGV0IHIgPSAwOyByIDwgdGhpcy5yb3dzOyByKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgdGhpcy5jb2xzOyBjKyspIHtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSB0aGlzLmZpbmRHcm91cChyLCBjKTtcbiAgICAgICAgaWYgKGdyb3VwLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc2h1ZmZsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xvcnM6IChUaWxlQ29sb3IgfCBudWxsKVtdID0gW107XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLnJvd3M7IHIrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbHM7IGMrKykge1xuICAgICAgICBjb2xvcnMucHVzaCh0aGlzLmdyaWRbcl1bY10uY29sb3IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSBjb2xvcnMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgY29uc3QgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xuICAgICAgW2NvbG9yc1tpXSwgY29sb3JzW2pdXSA9IFtjb2xvcnNbal0sIGNvbG9yc1tpXV07XG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMucm93czsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sczsgYysrKSB7XG4gICAgICAgIHRoaXMuZ3JpZFtyXVtjXS5jb2xvciA9IGNvbG9yc1tpbmRleCsrXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRBbGxDZWxscygpOiBDZWxsW10ge1xuICAgIGNvbnN0IHJlc3VsdDogQ2VsbFtdID0gW107XG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLnJvd3M7IHIrKykge1xuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmNvbHM7IGMrKykge1xuICAgICAgICByZXN1bHQucHVzaCh0aGlzLmdyaWRbcl1bY10pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgY2xvbmUoKTogQm9hcmQge1xuICAgIGNvbnN0IGJvYXJkID0gbmV3IEJvYXJkKHRoaXMucm93cywgdGhpcy5jb2xzKTtcbiAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMucm93czsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gMDsgYyA8IHRoaXMuY29sczsgYysrKSB7XG4gICAgICAgIGJvYXJkLmdyaWRbcl1bY10gPSB0aGlzLmdyaWRbcl1bY10uY2xvbmUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG59XG4iXX0=
//------QC-SOURCE-SPLIT------
