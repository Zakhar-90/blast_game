"use strict";
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