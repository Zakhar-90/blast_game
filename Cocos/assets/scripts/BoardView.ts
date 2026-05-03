const { ccclass, property } = cc._decorator;

import { Board } from "./logic/Board";
import { Cell, SuperTileType } from "./logic/Cell";
import TileView from "./TileView";

@ccclass
export default class BoardView extends cc.Component {
  @property(cc.Prefab)
  tilePrefab: cc.Prefab | null = null;

  @property
  tileSizeWidth: number = 100;

  @property
  tileSizeHeight: number = 112;

  private rows: number = 9;

  private cols: number = 9;

  private tileViews: Map<string, TileView> = new Map();

  private board: Board | null = null;

  private gameController: any = null;

  init(board: Board, gameController: any): void {
    this.board = board;
    this.gameController = gameController;
    this.rows = board.rows;
    this.cols = board.cols;

    const totalWidth = this.cols * this.tileSizeWidth;
    const totalHeight = this.rows * this.tileSizeHeight;
    this.node.setPosition(
      -totalWidth / 2 + this.tileSizeWidth / 2,
      totalHeight / 2 - this.tileSizeHeight / 2 + 64,
    );

    this.initialBuild(board);
  }

  private initialBuild(board: Board): void {
    this.tileViews.forEach((tileView) => {
      tileView.node.destroy();
    });
    this.tileViews.clear();

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = board.getCell(r, c);
        if (!cell || cell.isEmpty) continue;

        this.createTile(cell, r, c);
      }
    }
  }

  fullRebuild(
    board: Board,
    gravityMoves: Array<{
      fromRow: number;
      fromCol: number;
      toRow: number;
      toCol: number;
    }>,
  ): void {
    this.tileViews.forEach((tileView) => {
      tileView.node.destroy();
    });
    this.tileViews.clear();

    const moveMap = new Map<string, { fromRow: number; fromCol: number }>();
    for (const move of gravityMoves) {
      const key = `${move.toRow}_${move.toCol}`;
      moveMap.set(key, { fromRow: move.fromRow, fromCol: move.fromCol });
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = board.getCell(r, c);
        if (!cell || cell.isEmpty) continue;

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

  private createTile(
    cell: Cell,
    visualRow: number,
    visualCol: number,
    logicalRow?: number,
    logicalCol?: number,
  ): void {
    if (!this.tilePrefab) {
      cc.error("tilePrefab не назначен в BoardView!");
      return;
    }

    const node = cc.instantiate(this.tilePrefab);
    node.parent = this.node;

    const tileView = node.getComponent(TileView);
    if (!tileView) {
      cc.error("TileView не найден на префабе!");
      node.destroy();
      return;
    }

    if (cell.isSuperTile && cell.superType !== SuperTileType.None) {
      tileView.setSuperTile(cell.superType);
    } else if (cell.color) {
      tileView.setColor(cell.color);
    }

    const actualRow = logicalRow !== undefined ? logicalRow : visualRow;
    const actualCol = logicalCol !== undefined ? logicalCol : visualCol;

    tileView.row = actualRow;
    tileView.col = actualCol;

    const x = visualCol * this.tileSizeWidth;
    const y = -visualRow * this.tileSizeHeight;
    node.setPosition(x, y);

    node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
      event.stopPropagation();
      if (this.gameController) {
        this.gameController.onTileClick(actualRow, actualCol);
      }
    });

    const key = this.makeKey(actualRow, actualCol);
    this.tileViews.set(key, tileView);
  }

  private makeKey(row: number, col: number): string {
    return `${row}_${col}`;
  }

  async animateRemoval(cells: Cell[]): Promise<void> {
    const promises: Promise<void>[] = [];

    for (const cell of cells) {
      const key = this.makeKey(cell.row, cell.col);
      const tileView = this.tileViews.get(key);

      if (tileView) {
        promises.push(tileView.playRemoveAnimation());
      }
    }

    await Promise.all(promises);
  }

  async animateGravity(): Promise<void> {
    const promises: Promise<void>[] = [];

    this.tileViews.forEach((tileView) => {
      const targetX = tileView.col * this.tileSizeWidth;
      const targetY = -tileView.row * this.tileSizeHeight;

      const promise = new Promise<void>((resolve) => {
        cc.tween(tileView.node)
          .to(0.4, { y: targetY, x: targetX }, { easing: "bounceOut" })
          .call(() => resolve())
          .start();
      });
      promises.push(promise);
    });

    await Promise.all(promises);
  }

  async animateSpawn(): Promise<void> {
    const promises: Promise<void>[] = [];

    this.tileViews.forEach((tileView) => {
      promises.push(tileView.playSpawnAnimation());
    });

    await Promise.all(promises);
  }
}
