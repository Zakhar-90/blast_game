"use strict";
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