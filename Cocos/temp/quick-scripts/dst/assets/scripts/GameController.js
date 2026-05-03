
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcR2FtZUNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFFNUMseUNBQXNDO0FBQ3RDLHVDQUtzQjtBQUN0QiwyQ0FBb0M7QUFHcEMsSUFBSyxXQUlKO0FBSkQsV0FBSyxXQUFXO0lBQ2QsNEJBQWEsQ0FBQTtJQUNiLG9DQUFxQixDQUFBO0lBQ3JCLDRCQUFhLENBQUE7QUFDZixDQUFDLEVBSkksV0FBVyxLQUFYLFdBQVcsUUFJZjtBQUdELElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLEVBQUUsQ0FBQyxTQUFTO0lBQXhEOztRQUdFLGNBQVMsR0FBcUIsSUFBSSxDQUFDO1FBR25DLGVBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGVBQVUsR0FBb0IsSUFBSSxDQUFDO1FBR25DLGdCQUFXLEdBQW1CLElBQUksQ0FBQztRQUduQyxxQkFBZ0IsR0FBb0IsSUFBSSxDQUFDO1FBR3pDLHVCQUFrQixHQUFvQixJQUFJLENBQUM7UUFHM0MscUJBQWdCLEdBQW9CLElBQUksQ0FBQztRQUd6QyxtQkFBYyxHQUFtQixJQUFJLENBQUM7UUFHdEMsdUJBQWtCLEdBQW9CLElBQUksQ0FBQztRQUczQyxlQUFVLEdBQW1CLElBQUksQ0FBQztRQUdsQyxtQkFBYyxHQUFvQixJQUFJLENBQUM7UUFHL0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsVUFBSyxHQUFXLENBQUMsQ0FBQztRQUNsQixjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQ3ZCLGdCQUFXLEdBQVcsR0FBRyxDQUFDO1FBQzFCLGVBQVUsR0FBWSxLQUFLLENBQUM7UUFFNUIsa0JBQWEsR0FBZ0IsV0FBVyxDQUFDLElBQUksQ0FBQztRQUU5QyxrQkFBYSxHQUFXLENBQUMsQ0FBQztRQUUxQixjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBRXRCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFFdkIsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBRXZDLHFCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBQzlCLHFCQUFnQixHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRTlCLHVCQUFrQixHQUFXLENBQUMsQ0FBQztJQXVjekMsQ0FBQztJQXJjQyxNQUFNO1FBQ0osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsRUFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1NBQ3BDO1FBRUQsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztJQUVLLFdBQVcsQ0FBQyxHQUFXLEVBQUUsR0FBVzs7WUFDeEMsSUFBSSxJQUFJLENBQUMsVUFBVTtnQkFBRSxPQUFPO1lBQzVCLElBQUksSUFBSSxDQUFDLFlBQVk7Z0JBQUUsT0FBTztZQUU5QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtnQkFDNUIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxPQUFPO2FBQ1I7WUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDM0MsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN4QyxPQUFPO2FBQ1I7WUFFRCxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUFBO0lBRWEsb0JBQW9CLENBQUMsR0FBVyxFQUFFLEdBQVc7O1lBQ3pELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7Z0JBQUUsT0FBTztZQUV2QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUV6QixFQUFFLENBQUMsR0FBRyxDQUNKLGdDQUFnQyxJQUFJLENBQUMsU0FBUyxTQUFTLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FDdEUsQ0FBQztZQUVGLElBQUksYUFBYSxHQUFXLEVBQUUsQ0FBQztZQUUvQixRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RCLEtBQUssb0JBQWEsQ0FBQyxHQUFHO29CQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsSUFBSSxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFOzRCQUNyQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3lCQUNoQztxQkFDRjtvQkFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxhQUFhLENBQUMsTUFBTSxTQUFTLENBQUMsQ0FBQztvQkFDdEUsTUFBTTtnQkFFUixLQUFLLG9CQUFhLENBQUMsTUFBTTtvQkFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQzlDLElBQUksVUFBVSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTs0QkFDckMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt5QkFDaEM7cUJBQ0Y7b0JBQ0QsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsYUFBYSxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUM7b0JBQ3ZFLE1BQU07Z0JBRVIsS0FBSyxvQkFBYSxDQUFDLE1BQU07b0JBQ3ZCLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUNqRCxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ2pELE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsSUFBSSxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO2dDQUNyQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUNoQzt5QkFDRjtxQkFDRjtvQkFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxhQUFhLENBQUMsTUFBTSxTQUFTLENBQUMsQ0FBQztvQkFDdEUsTUFBTTtnQkFFUixLQUFLLG9CQUFhLENBQUMsR0FBRztvQkFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUN4QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7NEJBQ3hDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs0QkFDNUMsSUFBSSxVQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO2dDQUNyQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzZCQUNoQzt5QkFDRjtxQkFDRjtvQkFDRCxFQUFFLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxhQUFhLENBQUMsTUFBTSxTQUFTLENBQUMsQ0FBQztvQkFDeEUsTUFBTTthQUNUO1lBRUQsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNwRDtZQUVELE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRXZCLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxZQUFZLENBQUMsQ0FBQztnQkFDckQsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3ZDO1lBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7YUFDM0I7WUFFRCxFQUFFLENBQUMsR0FBRyxDQUFDLGdCQUFnQixNQUFNLFFBQVEsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7S0FBQTtJQUVhLGtCQUFrQixDQUFDLEdBQVcsRUFBRSxHQUFXOztZQUN2RCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPO1lBRWxDLFFBQVEsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDMUIsS0FBSyxXQUFXLENBQUMsUUFBUTtvQkFDdkIsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMxQyxNQUFNO2dCQUVSLEtBQUssV0FBVyxDQUFDLElBQUk7b0JBQ25CLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzdCLE1BQU07YUFDVDtRQUNILENBQUM7S0FBQTtJQUVhLG9CQUFvQixDQUFDLEdBQVcsRUFBRSxHQUFXOztZQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFO2dCQUMvQixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO2dCQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO2dCQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO2dCQUM1QixFQUFFLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxFQUFFLENBQUMsR0FBRyxDQUNKLHFCQUFxQixJQUFJLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLGdCQUFnQixJQUFJO29CQUN0RSxNQUFNLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FDdkIsQ0FBQztnQkFFRixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztnQkFFekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQzlCLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUN0QixDQUFDO2dCQUNGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFFM0MsSUFBSSxLQUFLLElBQUksS0FBSyxFQUFFO29CQUNsQixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUM5QixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUNsQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQzFCLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztvQkFDbEMsS0FBSyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO2lCQUM3QjtnQkFFRCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFckIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO29CQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUM1QztnQkFFRCxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO2dCQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUU5QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2hCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7aUJBQzNCO2dCQUVELEVBQUUsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUM7S0FBQTtJQUVhLE9BQU8sQ0FBQyxHQUFXLEVBQUUsR0FBVzs7WUFDNUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLEdBQUcsY0FBYyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUUzRSxNQUFNLGFBQWEsR0FBVyxFQUFFLENBQUM7WUFFakMsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25FLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNuRSxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDekIsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDMUI7aUJBQ0Y7YUFDRjtZQUVELElBQUksYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzlCLEVBQUUsQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDekMsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFekIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsYUFBYSxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUM7WUFFMUQsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDcEQ7WUFFRCxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ2xELElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QztZQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztZQUN0QyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUU5QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDcEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7YUFDM0I7WUFFRCxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsTUFBTSwwQkFBMEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDdEUsQ0FBQztLQUFBO0lBRWEsZ0JBQWdCLENBQUMsR0FBVyxFQUFFLEdBQVc7O1lBQ3JELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU3QyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsS0FBSyxDQUFDLE1BQU0sd0JBQXdCLENBQUMsQ0FBQztnQkFDMUQsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFFekIsRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLE1BQU0sU0FBUyxDQUFDLENBQUM7WUFFbkQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRWpCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDbkIsSUFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDO1lBRW5CLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7Z0JBQzNDLGVBQWUsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLEVBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxLQUFLLENBQUMsTUFBTSwrQkFBK0IsQ0FBQyxDQUFDO2FBQ2xFO1lBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO2dCQUNsQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzVDO1lBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNsRCxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFBO1lBQ0csSUFBSSxlQUFlLEVBQUU7Z0JBQ25CLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxJQUFJLEVBQUU7b0JBQ1IsSUFBSSxDQUFDLEtBQUssR0FBRywyQkFBb0IsQ0FDL0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsMkJBQW9CLENBQUMsTUFBTSxDQUFDLENBQ2pELENBQUM7b0JBQ1QsSUFBSSxDQUFDLFNBQVM7d0JBQ1osMkJBQW9CLENBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLDJCQUFvQixDQUFDLE1BQU0sQ0FBQyxDQUN4RCxDQUFDO29CQUNKLEVBQUUsQ0FBQyxHQUFHLENBQUMseUJBQXlCLEdBQUcsS0FBSyxHQUFHLFdBQVcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7aUJBQ3pFO2FBQ0Y7WUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7Z0JBQ3JELE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QztZQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO2FBQzNCO1lBRUQsRUFBRSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsTUFBTSxRQUFRLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQUE7SUFFRCxxQkFBcUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxZQUFZO1lBQUUsT0FBTztRQUNqRCxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxFQUFFO1lBQzNCLEVBQUUsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNqQyxPQUFPO1NBQ1I7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUMvQyxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDdEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztTQUNwQzthQUFNO1lBQ0wsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1lBQzFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7U0FDcEM7UUFFRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELGlCQUFpQjtRQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsWUFBWTtZQUFFLE9BQU87UUFDakQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtZQUN2QixFQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDN0IsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7U0FDdkM7UUFFRCxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixJQUFJLElBQUksQ0FBQyxjQUFjO1lBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQzNELElBQUksSUFBSSxDQUFDLFVBQVU7WUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7SUFDckQsQ0FBQztJQUVPLHNCQUFzQjtRQUM1QixRQUFRLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDMUIsS0FBSyxXQUFXLENBQUMsUUFBUTtnQkFDdkIsSUFBSSxJQUFJLENBQUMsY0FBYztvQkFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Z0JBQzNELE1BQU07WUFDUixLQUFLLFdBQVcsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLElBQUksQ0FBQyxVQUFVO29CQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztnQkFDbkQsTUFBTTtTQUNUO0lBQ0gsQ0FBQztJQUVLLGVBQWU7UUFDbkIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUMxRDtRQUNELElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNsRDtJQUNILENBQUM7SUFFTyxRQUFRO1FBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQzlDO1FBQ0QsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDOUQ7SUFDSCxDQUFDO0lBRU8sZUFBZTtRQUNyQixJQUFJLElBQUksQ0FBQyxXQUFXO1lBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3hELENBQUM7SUFFTyxlQUFlLENBQUMsS0FBYztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVc7WUFBRSxPQUFPO1FBRTlCLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUN6QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUM5RDtZQUNELElBQUksSUFBSSxDQUFDLGtCQUFrQixFQUFFO2dCQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDO2FBQ25EO1NBQ0Y7YUFBTTtZQUNMLElBQUksSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUN6QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztnQkFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDOUQ7WUFDRCxJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQzthQUNyRDtTQUNGO1FBRUQsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDekIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxTQUFTLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzFFO1FBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMzQixFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDdkIsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQzthQUM1QyxLQUFLLEVBQUUsQ0FBQztJQUNiLENBQUM7SUFHTyxZQUFZO1FBQ2xCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0IsT0FBTztTQUNSO1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsRUFBRTtZQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLE9BQU87U0FDUjtJQUNILENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBRXZCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDbkMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFFbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV4QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7SUFDaEMsQ0FBQztDQUNGLENBQUE7QUEzZkM7SUFEQyxRQUFRLENBQUMsbUJBQVMsQ0FBQztpREFDZTtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNnQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO2tEQUNnQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO21EQUNpQjtBQUduQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNzQjtBQUd6QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUN3QjtBQUczQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3dEQUNzQjtBQUd6QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO3NEQUNvQjtBQUd0QztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDOzBEQUN3QjtBQUczQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2tEQUNnQjtBQUdsQztJQURDLFFBQVEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO3NEQUNvQjtBQWpDcEIsY0FBYztJQURsQyxPQUFPO0dBQ2EsY0FBYyxDQThmbEM7a0JBOWZvQixjQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcblxuaW1wb3J0IHsgQm9hcmQgfSBmcm9tIFwiLi9sb2dpYy9Cb2FyZFwiO1xuaW1wb3J0IHtcbiAgQ2VsbCxcbiAgU3VwZXJUaWxlVHlwZSxcbiAgQUxMX1NVUEVSX1RJTEVfVFlQRVMsXG4gIFRpbGVDb2xvcixcbn0gZnJvbSBcIi4vbG9naWMvQ2VsbFwiO1xuaW1wb3J0IEJvYXJkVmlldyBmcm9tIFwiLi9Cb2FyZFZpZXdcIjtcblxuXG5lbnVtIEJvb3N0ZXJUeXBlIHtcbiAgTm9uZSA9IFwibm9uZVwiLFxuICBUZWxlcG9ydCA9IFwidGVsZXBvcnRcIixcbiAgQm9tYiA9IFwiYm9tYlwiLFxufVxuXG5AY2NjbGFzc1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZUNvbnRyb2xsZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gIEBwcm9wZXJ0eShCb2FyZFZpZXcpXG4gIGJvYXJkVmlldzogQm9hcmRWaWV3IHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBzY29yZUxhYmVsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgbW92ZXNMYWJlbDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgcmVzdWx0UG9wdXA6IGNjLk5vZGUgfCBudWxsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuTGFiZWwpXG4gIHJlc3VsdFRpdGxlTGFiZWw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICByZXN1bHRNZXNzYWdlTGFiZWw6IGNjLkxhYmVsIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICByZXN1bHRTY29yZUxhYmVsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICB0ZWxlcG9ydEJ1dHRvbjogY2MuTm9kZSB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5MYWJlbClcbiAgdGVsZXBvcnRDb3VudExhYmVsOiBjYy5MYWJlbCB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICBib21iQnV0dG9uOiBjYy5Ob2RlIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLkxhYmVsKVxuICBib21iQ291bnRMYWJlbDogY2MuTGFiZWwgfCBudWxsID0gbnVsbDtcblxuICBwcml2YXRlIGJvYXJkITogQm9hcmQ7XG4gIHByaXZhdGUgaXNQcm9jZXNzaW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2NvcmU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbW92ZXNMZWZ0OiBudW1iZXIgPSAyMDtcbiAgcHJpdmF0ZSB0YXJnZXRTY29yZTogbnVtYmVyID0gNTAwO1xuICBwcml2YXRlIGlzR2FtZU92ZXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwcml2YXRlIGFjdGl2ZUJvb3N0ZXI6IEJvb3N0ZXJUeXBlID0gQm9vc3RlclR5cGUuTm9uZTtcblxuICBwcml2YXRlIHRlbGVwb3J0Q291bnQ6IG51bWJlciA9IDM7XG5cbiAgcHJpdmF0ZSBib21iQ291bnQ6IG51bWJlciA9IDM7XG5cbiAgcHJpdmF0ZSBib21iUmFkaXVzOiBudW1iZXIgPSAxO1xuXG4gIHByaXZhdGUgdGVsZXBvcnRGaXJzdFNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSB0ZWxlcG9ydEZpcnN0Um93OiBudW1iZXIgPSAtMTtcbiAgcHJpdmF0ZSB0ZWxlcG9ydEZpcnN0Q29sOiBudW1iZXIgPSAtMTtcblxuICBwcml2YXRlIHN1cGVyVGlsZVRocmVzaG9sZDogbnVtYmVyID0gNTtcblxuICBvbkxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy5ib2FyZCA9IG5ldyBCb2FyZCg4LCA4KTtcbiAgICB0aGlzLmJvYXJkLmZpbGxSYW5kb20oKTtcblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgdGhpcy5ib2FyZFZpZXcuaW5pdCh0aGlzLmJvYXJkLCB0aGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY2MuZXJyb3IoXCJib2FyZFZpZXcg0L3QtSDQvdCw0LfQvdCw0YfQtdC9IVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgIHRoaXMudGVsZXBvcnRGaXJzdFNlbGVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgdGhpcy5oaWRlUmVzdWx0UG9wdXAoKTtcbiAgICB0aGlzLnJlc2V0Qm9vc3RlckhpZ2hsaWdodHMoKTtcbiAgfVxuXG4gIGFzeW5jIG9uVGlsZUNsaWNrKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmlzR2FtZU92ZXIpIHJldHVybjtcbiAgICBpZiAodGhpcy5pc1Byb2Nlc3NpbmcpIHJldHVybjtcblxuICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwocm93LCBjb2wpO1xuICAgIGlmIChjZWxsICYmIGNlbGwuaXNTdXBlclRpbGUpIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU3VwZXJUaWxlQ2xpY2socm93LCBjb2wpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZUJvb3N0ZXIgIT09IEJvb3N0ZXJUeXBlLk5vbmUpIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlQm9vc3RlckNsaWNrKHJvdywgY29sKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmhhbmRsZU5vcm1hbE1vdmUocm93LCBjb2wpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTdXBlclRpbGVDbGljayhyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZC5nZXRDZWxsKHJvdywgY29sKTtcbiAgICBpZiAoIWNlbGwgfHwgIWNlbGwuaXNTdXBlclRpbGUpIHJldHVybjtcblxuICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gdHJ1ZTtcblxuICAgIGNjLmxvZyhcbiAgICAgIGDQkNC60YLQuNCy0LjRgNC+0LLQsNC9INGB0YPQv9C10YAt0YLQsNC50Lsg0YLQuNC/0LAgXCIke2NlbGwuc3VwZXJUeXBlfVwiINC90LAgKCR7cm93fSwgJHtjb2x9KWAsXG4gICAgKTtcblxuICAgIGxldCBjZWxsc1RvUmVtb3ZlOiBDZWxsW10gPSBbXTtcblxuICAgIHN3aXRjaCAoY2VsbC5zdXBlclR5cGUpIHtcbiAgICAgIGNhc2UgU3VwZXJUaWxlVHlwZS5Sb3c6XG4gICAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgdGhpcy5ib2FyZC5jb2xzOyBjKyspIHtcbiAgICAgICAgICBjb25zdCB0YXJnZXRDZWxsID0gdGhpcy5ib2FyZC5nZXRDZWxsKHJvdywgYyk7XG4gICAgICAgICAgaWYgKHRhcmdldENlbGwgJiYgIXRhcmdldENlbGwuaXNFbXB0eSkge1xuICAgICAgICAgICAgY2VsbHNUb1JlbW92ZS5wdXNoKHRhcmdldENlbGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50LsgKNGB0YLRgNC+0LrQsCk6INGD0LTQsNC70LXQvdC+ICR7Y2VsbHNUb1JlbW92ZS5sZW5ndGh9INGC0LDQudC70L7QsmApO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBTdXBlclRpbGVUeXBlLkNvbHVtbjpcbiAgICAgICAgZm9yIChsZXQgciA9IDA7IHIgPCB0aGlzLmJvYXJkLnJvd3M7IHIrKykge1xuICAgICAgICAgIGNvbnN0IHRhcmdldENlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwociwgY29sKTtcbiAgICAgICAgICBpZiAodGFyZ2V0Q2VsbCAmJiAhdGFyZ2V0Q2VsbC5pc0VtcHR5KSB7XG4gICAgICAgICAgICBjZWxsc1RvUmVtb3ZlLnB1c2godGFyZ2V0Q2VsbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhg0KHRg9C/0LXRgC3RgtCw0LnQuyAo0YHRgtC+0LvQsdC10YYpOiDRg9C00LDQu9C10L3QviAke2NlbGxzVG9SZW1vdmUubGVuZ3RofSDRgtCw0LnQu9C+0LJgKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgU3VwZXJUaWxlVHlwZS5SYWRpdXM6XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IDI7XG4gICAgICAgIGZvciAobGV0IHIgPSByb3cgLSByYWRpdXM7IHIgPD0gcm93ICsgcmFkaXVzOyByKyspIHtcbiAgICAgICAgICBmb3IgKGxldCBjID0gY29sIC0gcmFkaXVzOyBjIDw9IGNvbCArIHJhZGl1czsgYysrKSB7XG4gICAgICAgICAgICBjb25zdCB0YXJnZXRDZWxsID0gdGhpcy5ib2FyZC5nZXRDZWxsKHIsIGMpO1xuICAgICAgICAgICAgaWYgKHRhcmdldENlbGwgJiYgIXRhcmdldENlbGwuaXNFbXB0eSkge1xuICAgICAgICAgICAgICBjZWxsc1RvUmVtb3ZlLnB1c2godGFyZ2V0Q2VsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNjLmxvZyhg0KHRg9C/0LXRgC3RgtCw0LnQuyAo0YDQsNC00LjRg9GBKTog0YPQtNCw0LvQtdC90L4gJHtjZWxsc1RvUmVtb3ZlLmxlbmd0aH0g0YLQsNC50LvQvtCyYCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFN1cGVyVGlsZVR5cGUuQWxsOlxuICAgICAgICBmb3IgKGxldCByID0gMDsgciA8IHRoaXMuYm9hcmQucm93czsgcisrKSB7XG4gICAgICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCB0aGlzLmJvYXJkLmNvbHM7IGMrKykge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0Q2VsbCA9IHRoaXMuYm9hcmQuZ2V0Q2VsbChyLCBjKTtcbiAgICAgICAgICAgIGlmICh0YXJnZXRDZWxsICYmICF0YXJnZXRDZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgY2VsbHNUb1JlbW92ZS5wdXNoKHRhcmdldENlbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50LsgKNCy0YHRkSDQv9C+0LvQtSk6INGD0LTQsNC70LXQvdC+ICR7Y2VsbHNUb1JlbW92ZS5sZW5ndGh9INGC0LDQudC70L7QsmApO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCBwb2ludHMgPSBjZWxsc1RvUmVtb3ZlLmxlbmd0aCAqIDEwICogMjtcbiAgICB0aGlzLnNjb3JlICs9IHBvaW50cztcblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYW5pbWF0ZVJlbW92YWwoY2VsbHNUb1JlbW92ZSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3Jhdml0eU1vdmVzID0gdGhpcy5ib2FyZC5nZXRHcmF2aXR5TW92ZXMoKTtcbiAgICB0aGlzLmJvYXJkLnJlbW92ZUNlbGxzKGNlbGxzVG9SZW1vdmUpO1xuICAgIHRoaXMuYm9hcmQuYXBwbHlHcmF2aXR5KCk7XG4gICAgdGhpcy5ib2FyZC5maWxsRW1wdHkoKTtcblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgdGhpcy5ib2FyZFZpZXcuZnVsbFJlYnVpbGQodGhpcy5ib2FyZCwgZ3Jhdml0eU1vdmVzKTtcbiAgICAgIGF3YWl0IHRoaXMuYm9hcmRWaWV3LmFuaW1hdGVHcmF2aXR5KCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMuY2hlY2tXaW5Mb3NlKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50Ls6ICske3BvaW50c30g0L7Rh9C60L7QsmApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVCb29zdGVyQ2xpY2socm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmQuZ2V0Q2VsbChyb3csIGNvbCk7XG4gICAgaWYgKCFjZWxsIHx8IGNlbGwuaXNFbXB0eSkgcmV0dXJuO1xuXG4gICAgc3dpdGNoICh0aGlzLmFjdGl2ZUJvb3N0ZXIpIHtcbiAgICAgIGNhc2UgQm9vc3RlclR5cGUuVGVsZXBvcnQ6XG4gICAgICAgIGF3YWl0IHRoaXMuc2VsZWN0VGVsZXBvcnRUYXJnZXQocm93LCBjb2wpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBCb29zdGVyVHlwZS5Cb21iOlxuICAgICAgICBhd2FpdCB0aGlzLnVzZUJvbWIocm93LCBjb2wpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNlbGVjdFRlbGVwb3J0VGFyZ2V0KHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy50ZWxlcG9ydEZpcnN0U2VsZWN0ZWQpIHtcbiAgICAgIHRoaXMudGVsZXBvcnRGaXJzdFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgIHRoaXMudGVsZXBvcnRGaXJzdFJvdyA9IHJvdztcbiAgICAgIHRoaXMudGVsZXBvcnRGaXJzdENvbCA9IGNvbDtcbiAgICAgIGNjLmxvZyhg0KLQtdC70LXQv9C+0YDRgjog0LLRi9Cx0YDQsNC9INC/0LXRgNCy0YvQuSDRgtCw0LnQuyAoJHtyb3d9LCAke2NvbH0pYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNjLmxvZyhcbiAgICAgICAgYNCi0LXQu9C10L/QvtGA0YI6INC80LXQvdGP0LXQvCAoJHt0aGlzLnRlbGVwb3J0Rmlyc3RSb3d9LCAke3RoaXMudGVsZXBvcnRGaXJzdENvbH0pIGAgK1xuICAgICAgICAgIGDQuCAoJHtyb3d9LCAke2NvbH0pYCxcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuaXNQcm9jZXNzaW5nID0gdHJ1ZTtcblxuICAgICAgY29uc3QgY2VsbDEgPSB0aGlzLmJvYXJkLmdldENlbGwoXG4gICAgICAgIHRoaXMudGVsZXBvcnRGaXJzdFJvdyxcbiAgICAgICAgdGhpcy50ZWxlcG9ydEZpcnN0Q29sLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGNlbGwyID0gdGhpcy5ib2FyZC5nZXRDZWxsKHJvdywgY29sKTtcblxuICAgICAgaWYgKGNlbGwxICYmIGNlbGwyKSB7XG4gICAgICAgIGNvbnN0IHRlbXBDb2xvciA9IGNlbGwxLmNvbG9yO1xuICAgICAgICBjb25zdCB0ZW1wU3VwZXIgPSBjZWxsMS5zdXBlclR5cGU7XG4gICAgICAgIGNlbGwxLmNvbG9yID0gY2VsbDIuY29sb3I7XG4gICAgICAgIGNlbGwxLnN1cGVyVHlwZSA9IGNlbGwyLnN1cGVyVHlwZTtcbiAgICAgICAgY2VsbDIuY29sb3IgPSB0ZW1wQ29sb3I7XG4gICAgICAgIGNlbGwyLnN1cGVyVHlwZSA9IHRlbXBTdXBlcjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5tb3Zlc0xlZnQtLTtcbiAgICAgIHRoaXMudGVsZXBvcnRDb3VudC0tO1xuXG4gICAgICBpZiAodGhpcy5ib2FyZFZpZXcpIHtcbiAgICAgICAgdGhpcy5ib2FyZFZpZXcuZnVsbFJlYnVpbGQodGhpcy5ib2FyZCwgW10pO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnRlbGVwb3J0Rmlyc3RTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5hY3RpdmVCb29zdGVyID0gQm9vc3RlclR5cGUuTm9uZTtcbiAgICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuXG4gICAgICB0aGlzLnVwZGF0ZVVJKCk7XG4gICAgICB0aGlzLnVwZGF0ZUJvb3N0ZXJVSSgpO1xuICAgICAgdGhpcy5jaGVja1dpbkxvc2UoKTtcblxuICAgICAgaWYgKCF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgY2MubG9nKFwi0KLQtdC70LXQv9C+0YDRgiDQt9Cw0LLQtdGA0YjRkdC9XCIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgdXNlQm9tYihyb3c6IG51bWJlciwgY29sOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjYy5sb2coYNCY0YHQv9C+0LvRjNC30YPQtdC8INCR0J7QnNCR0KMg0L3QsCAoJHtyb3d9LCAke2NvbH0pLCDRgNCw0LTQuNGD0YE6ICR7dGhpcy5ib21iUmFkaXVzfWApO1xuXG4gICAgY29uc3QgY2VsbHNUb1JlbW92ZTogQ2VsbFtdID0gW107XG5cbiAgICBmb3IgKGxldCByID0gcm93IC0gdGhpcy5ib21iUmFkaXVzOyByIDw9IHJvdyArIHRoaXMuYm9tYlJhZGl1czsgcisrKSB7XG4gICAgICBmb3IgKGxldCBjID0gY29sIC0gdGhpcy5ib21iUmFkaXVzOyBjIDw9IGNvbCArIHRoaXMuYm9tYlJhZGl1czsgYysrKSB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwociwgYyk7XG4gICAgICAgIGlmIChjZWxsICYmICFjZWxsLmlzRW1wdHkpIHtcbiAgICAgICAgICBjZWxsc1RvUmVtb3ZlLnB1c2goY2VsbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY2VsbHNUb1JlbW92ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIGNjLmxvZyhcItCR0L7QvNCx0LA6INC90LXRgiDRgtCw0LnQu9C+0LIg0LTQu9GPINGD0LTQsNC70LXQvdC40Y9cIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSB0cnVlO1xuXG4gICAgY2MubG9nKGDQkdC+0LzQsdCwINGD0L3QuNGH0YLQvtC20LDQtdGCICR7Y2VsbHNUb1JlbW92ZS5sZW5ndGh9INGC0LDQudC70L7QsmApO1xuXG4gICAgY29uc3QgcG9pbnRzID0gY2VsbHNUb1JlbW92ZS5sZW5ndGggKiA1O1xuICAgIHRoaXMuc2NvcmUgKz0gcG9pbnRzO1xuICAgIHRoaXMubW92ZXNMZWZ0LS07XG4gICAgdGhpcy5ib21iQ291bnQtLTtcbiAgICBpZiAodGhpcy5ib2FyZFZpZXcpIHtcbiAgICAgIGF3YWl0IHRoaXMuYm9hcmRWaWV3LmFuaW1hdGVSZW1vdmFsKGNlbGxzVG9SZW1vdmUpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyYXZpdHlNb3ZlcyA9IHRoaXMuYm9hcmQuZ2V0R3Jhdml0eU1vdmVzKCk7XG4gICAgdGhpcy5ib2FyZC5yZW1vdmVDZWxscyhjZWxsc1RvUmVtb3ZlKTtcbiAgICB0aGlzLmJvYXJkLmFwcGx5R3Jhdml0eSgpO1xuICAgIHRoaXMuYm9hcmQuZmlsbEVtcHR5KCk7XG4gICAgaWYgKHRoaXMuYm9hcmRWaWV3KSB7XG4gICAgICB0aGlzLmJvYXJkVmlldy5mdWxsUmVidWlsZCh0aGlzLmJvYXJkLCBncmF2aXR5TW92ZXMpO1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYW5pbWF0ZUdyYXZpdHkoKTtcbiAgICB9XG5cbiAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgdGhpcy5jaGVja1dpbkxvc2UoKTtcblxuICAgIGlmICghdGhpcy5pc0dhbWVPdmVyKSB7XG4gICAgICB0aGlzLmlzUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNjLmxvZyhg0JHQvtC80LHQsDogKyR7cG9pbnRzfSDQvtGH0LrQvtCyLCDQvtGB0YLQsNC70L7RgdGMINCx0L7QvNCxOiAke3RoaXMuYm9tYkNvdW50fWApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVOb3JtYWxNb3ZlKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5ib2FyZC5maW5kR3JvdXAocm93LCBjb2wpO1xuXG4gICAgaWYgKGdyb3VwLmxlbmd0aCA8IDIpIHtcbiAgICAgIGNjLmxvZyhg0JPRgNGD0L/Qv9CwINC40LcgJHtncm91cC5sZW5ndGh9INGC0LDQudC70L7QsiDigJQg0L3QtdC00L7RgdGC0LDRgtC+0YfQvdC+YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSB0cnVlO1xuXG4gICAgY2MubG9nKGDQo9C00LDQu9GP0LXQvCDQs9GA0YPQv9C/0YMg0LjQtyAke2dyb3VwLmxlbmd0aH0g0YLQsNC50LvQvtCyYCk7XG5cbiAgICBjb25zdCBwb2ludHMgPSBncm91cC5sZW5ndGggKiAxMDtcbiAgICB0aGlzLnNjb3JlICs9IHBvaW50cztcbiAgICB0aGlzLm1vdmVzTGVmdC0tO1xuXG4gICAgbGV0IGNyZWF0ZVN1cGVyVGlsZSA9IGZhbHNlO1xuICAgIGxldCBzdXBlclJvdyA9IHJvdztcbiAgICBsZXQgc3VwZXJDb2wgPSBjb2w7XG5cbiAgICBpZiAoZ3JvdXAubGVuZ3RoID49IHRoaXMuc3VwZXJUaWxlVGhyZXNob2xkKSB7XG4gICAgICBjcmVhdGVTdXBlclRpbGUgPSB0cnVlO1xuICAgICAgY2MubG9nKGDQk9GA0YPQv9C/0LAg0LjQtyAke2dyb3VwLmxlbmd0aH0g0YLQsNC50LvQvtCyIOKAlCDRgdC+0LfQtNCw0ZHQvCDQodCj0J/QldCgLdCi0JDQmdCbIWApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgYXdhaXQgdGhpcy5ib2FyZFZpZXcuYW5pbWF0ZVJlbW92YWwoZ3JvdXApO1xuICAgIH1cblxuICAgIGNvbnN0IGdyYXZpdHlNb3ZlcyA9IHRoaXMuYm9hcmQuZ2V0R3Jhdml0eU1vdmVzKCk7XG4gICAgdGhpcy5ib2FyZC5yZW1vdmVDZWxscyhncm91cCk7XG4gICAgdGhpcy5ib2FyZC5hcHBseUdyYXZpdHkoKTtcbiAgICB0aGlzLmJvYXJkLmZpbGxFbXB0eSgpO1xuNFxuICAgIGlmIChjcmVhdGVTdXBlclRpbGUpIHtcbiAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkLmdldENlbGwocm93LCBjb2wpO1xuICAgICAgaWYgKGNlbGwpIHtcbiAgICAgICAgY2VsbC5jb2xvciA9IEFMTF9TVVBFUl9USUxFX1RZUEVTW1xuICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEFMTF9TVVBFUl9USUxFX1RZUEVTLmxlbmd0aClcbiAgICAgICAgXSBhcyBhbnk7XG4gICAgICAgIGNlbGwuc3VwZXJUeXBlID1cbiAgICAgICAgICBBTExfU1VQRVJfVElMRV9UWVBFU1tcbiAgICAgICAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIEFMTF9TVVBFUl9USUxFX1RZUEVTLmxlbmd0aClcbiAgICAgICAgICBdO1xuICAgICAgICBjYy5sb2coYNCh0YPQv9C10YAt0YLQsNC50Lsg0YHQvtC30LTQsNC9INC90LAgKCR7cm93fSwgJHtjb2x9KSwg0YLQuNC/OiAke2NlbGwuc3VwZXJUeXBlfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLmJvYXJkVmlldykge1xuICAgICAgdGhpcy5ib2FyZFZpZXcuZnVsbFJlYnVpbGQodGhpcy5ib2FyZCwgZ3Jhdml0eU1vdmVzKTtcbiAgICAgIGF3YWl0IHRoaXMuYm9hcmRWaWV3LmFuaW1hdGVHcmF2aXR5KCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMuY2hlY2tXaW5Mb3NlKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgdGhpcy5pc1Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjYy5sb2coYNCe0LHRi9GH0L3Ri9C5INGF0L7QtDogKyR7cG9pbnRzfSDQvtGH0LrQvtCyYCk7XG4gIH1cblxuICBvblRlbGVwb3J0QnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNHYW1lT3ZlciB8fCB0aGlzLmlzUHJvY2Vzc2luZykgcmV0dXJuO1xuICAgIGlmICh0aGlzLnRlbGVwb3J0Q291bnQgPD0gMCkge1xuICAgICAgY2MubG9nKFwi0KLQtdC70LXQv9C+0YDRgtGLINC30LDQutC+0L3Rh9C40LvQuNGB0YwhXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmFjdGl2ZUJvb3N0ZXIgPT09IEJvb3N0ZXJUeXBlLlRlbGVwb3J0KSB7XG4gICAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgICAgdGhpcy50ZWxlcG9ydEZpcnN0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVCb29zdGVyID0gQm9vc3RlclR5cGUuVGVsZXBvcnQ7XG4gICAgICB0aGlzLnRlbGVwb3J0Rmlyc3RTZWxlY3RlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuICAgIHRoaXMuaGlnaGxpZ2h0QWN0aXZlQm9vc3RlcigpO1xuICAgIGNjLmxvZyhg0JHRg9GB0YLQtdGAOiAke3RoaXMuYWN0aXZlQm9vc3Rlcn1gKTtcbiAgfVxuXG4gIG9uQm9tYkJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzR2FtZU92ZXIgfHwgdGhpcy5pc1Byb2Nlc3NpbmcpIHJldHVybjtcbiAgICBpZiAodGhpcy5ib21iQ291bnQgPD0gMCkge1xuICAgICAgY2MubG9nKFwi0JHQvtC80LHRiyDQt9Cw0LrQvtC90YfQuNC70LjRgdGMIVwiKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5hY3RpdmVCb29zdGVyID09PSBCb29zdGVyVHlwZS5Cb21iKSB7XG4gICAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Ob25lO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZUJvb3N0ZXIgPSBCb29zdGVyVHlwZS5Cb21iO1xuICAgIH1cblxuICAgIHRoaXMucmVzZXRCb29zdGVySGlnaGxpZ2h0cygpO1xuICAgIHRoaXMuaGlnaGxpZ2h0QWN0aXZlQm9vc3RlcigpO1xuICAgIGNjLmxvZyhg0JHRg9GB0YLQtdGAOiAke3RoaXMuYWN0aXZlQm9vc3Rlcn1gKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRCb29zdGVySGlnaGxpZ2h0cygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50ZWxlcG9ydEJ1dHRvbikgdGhpcy50ZWxlcG9ydEJ1dHRvbi5vcGFjaXR5ID0gMjU1O1xuICAgIGlmICh0aGlzLmJvbWJCdXR0b24pIHRoaXMuYm9tYkJ1dHRvbi5vcGFjaXR5ID0gMjU1O1xuICB9XG5cbiAgcHJpdmF0ZSBoaWdobGlnaHRBY3RpdmVCb29zdGVyKCk6IHZvaWQge1xuICAgIHN3aXRjaCAodGhpcy5hY3RpdmVCb29zdGVyKSB7XG4gICAgICBjYXNlIEJvb3N0ZXJUeXBlLlRlbGVwb3J0OlxuICAgICAgICBpZiAodGhpcy50ZWxlcG9ydEJ1dHRvbikgdGhpcy50ZWxlcG9ydEJ1dHRvbi5vcGFjaXR5ID0gMTUwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQm9vc3RlclR5cGUuQm9tYjpcbiAgICAgICAgaWYgKHRoaXMuYm9tYkJ1dHRvbikgdGhpcy5ib21iQnV0dG9uLm9wYWNpdHkgPSAxNTA7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG5wcml2YXRlIHVwZGF0ZUJvb3N0ZXJVSSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy50ZWxlcG9ydENvdW50TGFiZWwpIHtcbiAgICAgIHRoaXMudGVsZXBvcnRDb3VudExhYmVsLnN0cmluZyA9IGAke3RoaXMudGVsZXBvcnRDb3VudH1gO1xuICAgIH1cbiAgICBpZiAodGhpcy5ib21iQ291bnRMYWJlbCkge1xuICAgICAgdGhpcy5ib21iQ291bnRMYWJlbC5zdHJpbmcgPSBgJHt0aGlzLmJvbWJDb3VudH1gO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVUkoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW92ZXNMYWJlbCkge1xuICAgICAgdGhpcy5tb3Zlc0xhYmVsLnN0cmluZyA9IGAke3RoaXMubW92ZXNMZWZ0fWA7XG4gICAgfVxuICAgIGlmICh0aGlzLnNjb3JlTGFiZWwpIHtcbiAgICAgIHRoaXMuc2NvcmVMYWJlbC5zdHJpbmcgPSBgJHt0aGlzLnNjb3JlfS8ke3RoaXMudGFyZ2V0U2NvcmV9YDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhpZGVSZXN1bHRQb3B1cCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZXN1bHRQb3B1cCkgdGhpcy5yZXN1bHRQb3B1cC5hY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd1Jlc3VsdFBvcHVwKGlzV2luOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlc3VsdFBvcHVwKSByZXR1cm47XG5cbiAgICBpZiAoaXNXaW4pIHtcbiAgICAgIGlmICh0aGlzLnJlc3VsdFRpdGxlTGFiZWwpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRUaXRsZUxhYmVsLnN0cmluZyA9IFwi0J/QntCR0JXQlNCQIVwiO1xuICAgICAgICB0aGlzLnJlc3VsdFRpdGxlTGFiZWwubm9kZS5jb2xvciA9IG5ldyBjYy5Db2xvcigyNTUsIDIxNSwgMCk7XG4gICAgICB9XG4gICAgICBpZiAodGhpcy5yZXN1bHRNZXNzYWdlTGFiZWwpIHtcbiAgICAgICAgdGhpcy5yZXN1bHRNZXNzYWdlTGFiZWwuc3RyaW5nID0gXCLQntGC0LvQuNGH0L3QsNGPINC40LPRgNCwIVwiO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5yZXN1bHRUaXRsZUxhYmVsKSB7XG4gICAgICAgIHRoaXMucmVzdWx0VGl0bGVMYWJlbC5zdHJpbmcgPSBcItCf0J7QoNCQ0JbQldCd0JjQlSFcIjtcbiAgICAgICAgdGhpcy5yZXN1bHRUaXRsZUxhYmVsLm5vZGUuY29sb3IgPSBuZXcgY2MuQ29sb3IoMjU1LCA1MCwgNTApO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMucmVzdWx0TWVzc2FnZUxhYmVsKSB7XG4gICAgICAgIHRoaXMucmVzdWx0TWVzc2FnZUxhYmVsLnN0cmluZyA9IFwi0JfQsNC60L7QvdGH0LjQu9C40YHRjCDRhdC+0LTRi1wiO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnJlc3VsdFNjb3JlTGFiZWwpIHtcbiAgICAgIHRoaXMucmVzdWx0U2NvcmVMYWJlbC5zdHJpbmcgPSBg0KHRh9GR0YI6ICR7dGhpcy5zY29yZX0vJHt0aGlzLnRhcmdldFNjb3JlfWA7XG4gICAgfVxuXG4gICAgdGhpcy5yZXN1bHRQb3B1cC5hY3RpdmUgPSB0cnVlO1xuICAgIHRoaXMucmVzdWx0UG9wdXAuc2NhbGUgPSAwO1xuICAgIGNjLnR3ZWVuKHRoaXMucmVzdWx0UG9wdXApXG4gICAgICAudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcImJhY2tPdXRcIiB9KVxuICAgICAgLnN0YXJ0KCk7XG4gIH1cblxuXG4gIHByaXZhdGUgY2hlY2tXaW5Mb3NlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnNjb3JlID49IHRoaXMudGFyZ2V0U2NvcmUpIHtcbiAgICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgICB0aGlzLnNob3dSZXN1bHRQb3B1cCh0cnVlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5tb3Zlc0xlZnQgPD0gMCkge1xuICAgICAgdGhpcy5pc0dhbWVPdmVyID0gdHJ1ZTtcbiAgICAgIHRoaXMuc2hvd1Jlc3VsdFBvcHVwKGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBvblJlc3RhcnRCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICB0aGlzLmhpZGVSZXN1bHRQb3B1cCgpO1xuXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5tb3Zlc0xlZnQgPSAyMDtcbiAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmlzUHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuYWN0aXZlQm9vc3RlciA9IEJvb3N0ZXJUeXBlLk5vbmU7XG4gICAgdGhpcy50ZWxlcG9ydEZpcnN0U2VsZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRlbGVwb3J0Q291bnQgPSAzO1xuICAgIHRoaXMuYm9tYkNvdW50ID0gMztcblxuICAgIHRoaXMuYm9hcmQgPSBuZXcgQm9hcmQoOCwgOCk7XG4gICAgdGhpcy5ib2FyZC5maWxsUmFuZG9tKCk7XG5cbiAgICBpZiAodGhpcy5ib2FyZFZpZXcpIHtcbiAgICAgIHRoaXMuYm9hcmRWaWV3LmluaXQodGhpcy5ib2FyZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVVSSgpO1xuICAgIHRoaXMudXBkYXRlQm9vc3RlclVJKCk7XG4gICAgdGhpcy5yZXNldEJvb3N0ZXJIaWdobGlnaHRzKCk7XG4gIH1cbn1cbiJdfQ==