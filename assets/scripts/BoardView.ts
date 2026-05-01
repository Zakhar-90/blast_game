const { ccclass, property } = cc._decorator;

import { Board } from "./logic/Board";
import { Cell } from "./logic/Cell";
import TileView from "./TileView";

@ccclass
export default class BoardView extends cc.Component {
  @property(cc.Prefab)
  tilePrefab: cc.Prefab | null = null;

  @property
  tileSizeWidth: number = 100;

  @property
  tileSizeHeight: number = 112;

  private rows: number = 8;
  private cols: number = 8;

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
      totalHeight / 2 - this.tileSizeHeight / 2,
    );

    this.render(board);
  }

  render(board: Board): void {
    
    const keysToRemove: string[] = [];

    for (let [key, val] of this.tileViews) {
      cc.log(`Key - Value: ${key} - ${val} `)
    }

    this.tileViews.forEach((tileView, key) => {
      const cell = board.getCell(tileView.row, tileView.col);

      if (!cell || cell.isEmpty || cell.color !== tileView.currentColor) {
        keysToRemove.push(key);
      }
    });

    for (const key of keysToRemove) {
      const tileView = this.tileViews.get(key);
      if (tileView) {
        tileView.node.destroy();
        this.tileViews.delete(key);
      }
    }

    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const cell = board.getCell(r, c);
        if (!cell || cell.isEmpty) continue;

        const key = this.makeKey(r, c);
        if (!this.tileViews.has(key)) {
          this.createTile(cell);
        }
      }
    }
  }

  private createTile(cell: Cell): void {
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

    if (cell.color) {
      tileView.setColor(cell.color);
    }

    tileView.row = cell.row;
    tileView.col = cell.col;

    const x = cell.col * this.tileSizeWidth;
    const y = -cell.row * this.tileSizeHeight;
    node.setPosition(x, y);

    node.on(cc.Node.EventType.TOUCH_END, (event: cc.Event.EventTouch) => {
      event.stopPropagation();

      if (this.gameController) {
        this.gameController.onTileClick(cell.row, cell.col);
      }
    });

    const key = this.makeKey(cell.row, cell.col);
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

  async animateSpawn(): Promise<void> {
    const promises: Promise<void>[] = [];

    this.tileViews.forEach((tileView) => {
      promises.push(tileView.playSpawnAnimation());
    });

    await Promise.all(promises);
  }

  async animateGravity(): Promise<void> {
    const promises: Promise<void>[] = [];

    this.tileViews.forEach((tileView, key) => {
      const targetX = tileView.col * this.tileSizeWidth;
      const targetY = -tileView.row * this.tileSizeHeight;

        cc.log('Координаты', targetX, targetY, '|', tileView.node.x, tileView.node.y);
      if (tileView.node.x !== targetX || tileView.node.y !== targetY) {
        cc.log('Стар анимации');
        const promise = new Promise<void>((resolve) => {
          cc.tween(tileView.node)
            .to(0.5, { y: targetY, x: targetX }, { easing: "bounceOut" })
            .call(() => resolve())
            .start();
        });
        promises.push(promise);
      }
    });

    await Promise.all(promises);
  }

  debugPrint(): void {
    cc.log("=== TileViews Map ===");
    this.tileViews.forEach((tileView, key) => {
      cc.log(
        `${key}: row=${tileView.row}, col=${tileView.col}, color=${tileView.currentColor}, pos=(${tileView.node.x}, ${tileView.node.y})`,
      );
    });
    cc.log("=====================");
  }
}
