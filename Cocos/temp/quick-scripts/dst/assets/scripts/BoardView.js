
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