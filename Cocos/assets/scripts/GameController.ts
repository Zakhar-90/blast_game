const { ccclass, property } = cc._decorator;

import { Board } from "./logic/Board";
import {
  Cell,
  SuperTileType,
  ALL_SUPER_TILE_TYPES,
  TileColor,
} from "./logic/Cell";
import BoardView from "./BoardView";


enum BoosterType {
  None = "none",
  Teleport = "teleport",
  Bomb = "bomb",
}

@ccclass
export default class GameController extends cc.Component {

  @property(BoardView)
  boardView: BoardView | null = null;

  @property(cc.Label)
  scoreLabel: cc.Label | null = null;

  @property(cc.Label)
  movesLabel: cc.Label | null = null;

  @property(cc.Node)
  resultPopup: cc.Node | null = null;

  @property(cc.Label)
  resultTitleLabel: cc.Label | null = null;

  @property(cc.Label)
  resultMessageLabel: cc.Label | null = null;

  @property(cc.Label)
  resultScoreLabel: cc.Label | null = null;

  @property(cc.Node)
  teleportButton: cc.Node | null = null;

  @property(cc.Label)
  teleportCountLabel: cc.Label | null = null;

  @property(cc.Node)
  bombButton: cc.Node | null = null;

  @property(cc.Label)
  bombCountLabel: cc.Label | null = null;

  private board!: Board;
  private isProcessing: boolean = false;
  private score: number = 0;
  private movesLeft: number = 20;
  private targetScore: number = 500;
  private isGameOver: boolean = false;

  private activeBooster: BoosterType = BoosterType.None;

  private teleportCount: number = 3;

  private bombCount: number = 3;

  private bombRadius: number = 1;

  private teleportFirstSelected: boolean = false;

  private teleportFirstRow: number = -1;
  private teleportFirstCol: number = -1;

  private superTileThreshold: number = 5;

  onLoad(): void {
    this.board = new Board(8, 8);
    this.board.fillRandom();

    if (this.boardView) {
      this.boardView.init(this.board, this);
    } else {
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

  async onTileClick(row: number, col: number): Promise<void> {
    if (this.isGameOver) return;
    if (this.isProcessing) return;

    const cell = this.board.getCell(row, col);
    if (cell && cell.isSuperTile) {
      await this.handleSuperTileClick(row, col);
      return;
    }

    if (this.activeBooster !== BoosterType.None) {
      await this.handleBoosterClick(row, col);
      return;
    }

    await this.handleNormalMove(row, col);
  }

  private async handleSuperTileClick(row: number, col: number): Promise<void> {
    const cell = this.board.getCell(row, col);
    if (!cell || !cell.isSuperTile) return;

    this.isProcessing = true;

    cc.log(
      `Активирован супер-тайл типа "${cell.superType}" на (${row}, ${col})`,
    );

    let cellsToRemove: Cell[] = [];

    switch (cell.superType) {
      case SuperTileType.Row:
        for (let c = 0; c < this.board.cols; c++) {
          const targetCell = this.board.getCell(row, c);
          if (targetCell && !targetCell.isEmpty) {
            cellsToRemove.push(targetCell);
          }
        }
        cc.log(`Супер-тайл (строка): удалено ${cellsToRemove.length} тайлов`);
        break;

      case SuperTileType.Column:
        for (let r = 0; r < this.board.rows; r++) {
          const targetCell = this.board.getCell(r, col);
          if (targetCell && !targetCell.isEmpty) {
            cellsToRemove.push(targetCell);
          }
        }
        cc.log(`Супер-тайл (столбец): удалено ${cellsToRemove.length} тайлов`);
        break;

      case SuperTileType.Radius:
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

      case SuperTileType.All:
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
      await this.boardView.animateRemoval(cellsToRemove);
    }

    const gravityMoves = this.board.getGravityMoves();
    this.board.removeCells(cellsToRemove);
    this.board.applyGravity();
    this.board.fillEmpty();

    if (this.boardView) {
      this.boardView.fullRebuild(this.board, gravityMoves);
      await this.boardView.animateGravity();
    }

    this.updateUI();
    this.checkWinLose();

    if (!this.isGameOver) {
      this.isProcessing = false;
    }

    cc.log(`Супер-тайл: +${points} очков`);
  }

  private async handleBoosterClick(row: number, col: number): Promise<void> {
    const cell = this.board.getCell(row, col);
    if (!cell || cell.isEmpty) return;

    switch (this.activeBooster) {
      case BoosterType.Teleport:
        await this.selectTeleportTarget(row, col);
        break;

      case BoosterType.Bomb:
        await this.useBomb(row, col);
        break;
    }
  }

  private async selectTeleportTarget(row: number, col: number): Promise<void> {
    if (!this.teleportFirstSelected) {
      this.teleportFirstSelected = true;
      this.teleportFirstRow = row;
      this.teleportFirstCol = col;
      cc.log(`Телепорт: выбран первый тайл (${row}, ${col})`);
    } else {
      cc.log(
        `Телепорт: меняем (${this.teleportFirstRow}, ${this.teleportFirstCol}) ` +
          `и (${row}, ${col})`,
      );

      this.isProcessing = true;

      const cell1 = this.board.getCell(
        this.teleportFirstRow,
        this.teleportFirstCol,
      );
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
  }

  private async useBomb(row: number, col: number): Promise<void> {
    cc.log(`Используем БОМБУ на (${row}, ${col}), радиус: ${this.bombRadius}`);

    const cellsToRemove: Cell[] = [];

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
      await this.boardView.animateRemoval(cellsToRemove);
    }

    const gravityMoves = this.board.getGravityMoves();
    this.board.removeCells(cellsToRemove);
    this.board.applyGravity();
    this.board.fillEmpty();
    if (this.boardView) {
      this.boardView.fullRebuild(this.board, gravityMoves);
      await this.boardView.animateGravity();
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
  }

  private async handleNormalMove(row: number, col: number): Promise<void> {
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
      await this.boardView.animateRemoval(group);
    }

    const gravityMoves = this.board.getGravityMoves();
    this.board.removeCells(group);
    this.board.applyGravity();
    this.board.fillEmpty();
4
    if (createSuperTile) {
      const cell = this.board.getCell(row, col);
      if (cell) {
        cell.color = ALL_SUPER_TILE_TYPES[
          Math.floor(Math.random() * ALL_SUPER_TILE_TYPES.length)
        ] as any;
        cell.superType =
          ALL_SUPER_TILE_TYPES[
            Math.floor(Math.random() * ALL_SUPER_TILE_TYPES.length)
          ];
        cc.log(`Супер-тайл создан на (${row}, ${col}), тип: ${cell.superType}`);
      }
    }

    if (this.boardView) {
      this.boardView.fullRebuild(this.board, gravityMoves);
      await this.boardView.animateGravity();
    }

    this.updateUI();
    this.checkWinLose();

    if (!this.isGameOver) {
      this.isProcessing = false;
    }

    cc.log(`Обычный ход: +${points} очков`);
  }

  onTeleportButtonClick(): void {
    if (this.isGameOver || this.isProcessing) return;
    if (this.teleportCount <= 0) {
      cc.log("Телепорты закончились!");
      return;
    }

    if (this.activeBooster === BoosterType.Teleport) {
      this.activeBooster = BoosterType.None;
      this.teleportFirstSelected = false;
    } else {
      this.activeBooster = BoosterType.Teleport;
      this.teleportFirstSelected = false;
    }

    this.resetBoosterHighlights();
    this.highlightActiveBooster();
    cc.log(`Бустер: ${this.activeBooster}`);
  }

  onBombButtonClick(): void {
    if (this.isGameOver || this.isProcessing) return;
    if (this.bombCount <= 0) {
      cc.log("Бомбы закончились!");
      return;
    }

    if (this.activeBooster === BoosterType.Bomb) {
      this.activeBooster = BoosterType.None;
    } else {
      this.activeBooster = BoosterType.Bomb;
    }

    this.resetBoosterHighlights();
    this.highlightActiveBooster();
    cc.log(`Бустер: ${this.activeBooster}`);
  }

  private resetBoosterHighlights(): void {
    if (this.teleportButton) this.teleportButton.opacity = 255;
    if (this.bombButton) this.bombButton.opacity = 255;
  }

  private highlightActiveBooster(): void {
    switch (this.activeBooster) {
      case BoosterType.Teleport:
        if (this.teleportButton) this.teleportButton.opacity = 150;
        break;
      case BoosterType.Bomb:
        if (this.bombButton) this.bombButton.opacity = 150;
        break;
    }
  }

private updateBoosterUI(): void {
    if (this.teleportCountLabel) {
      this.teleportCountLabel.string = `${this.teleportCount}`;
    }
    if (this.bombCountLabel) {
      this.bombCountLabel.string = `${this.bombCount}`;
    }
  }

  private updateUI(): void {
    if (this.movesLabel) {
      this.movesLabel.string = `${this.movesLeft}`;
    }
    if (this.scoreLabel) {
      this.scoreLabel.string = `${this.score}/${this.targetScore}`;
    }
  }

  private hideResultPopup(): void {
    if (this.resultPopup) this.resultPopup.active = false;
  }

  private showResultPopup(isWin: boolean): void {
    if (!this.resultPopup) return;

    if (isWin) {
      if (this.resultTitleLabel) {
        this.resultTitleLabel.string = "ПОБЕДА!";
        this.resultTitleLabel.node.color = new cc.Color(255, 215, 0);
      }
      if (this.resultMessageLabel) {
        this.resultMessageLabel.string = "Отличная игра!";
      }
    } else {
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


  private checkWinLose(): void {
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

  onRestartButtonClick(): void {
    this.hideResultPopup();

    this.score = 0;
    this.movesLeft = 20;
    this.isGameOver = false;
    this.isProcessing = false;
    this.activeBooster = BoosterType.None;
    this.teleportFirstSelected = false;
    this.teleportCount = 3;
    this.bombCount = 3;

    this.board = new Board(8, 8);
    this.board.fillRandom();

    if (this.boardView) {
      this.boardView.init(this.board, this);
    }

    this.updateUI();
    this.updateBoosterUI();
    this.resetBoosterHighlights();
  }
}
