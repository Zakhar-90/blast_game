const { ccclass, property } = cc._decorator;

import { Board } from "./logic/Board";
import BoardView from "./BoardView";

@ccclass
export default class GameController extends cc.Component {
  @property(BoardView)
  boardView: BoardView | null = null;

  private board!: Board;
  private isProcessing: boolean = false;

  onLoad(): void {
    this.board = new Board(8, 8);

    this.board.fillRandom();

    if (this.boardView) {
      this.boardView.init(this.board, this);
    } else {
      cc.error(
        "boardView не назначен! Перетащите узел Board в поле Board View.",
      );
    }
  }

  async onTileClick(row: number, col: number): Promise<void> {
    if (this.isProcessing) {
      return;
    }

    const group = this.board.findGroup(row, col);
    cc.log(`Группа для удаления: ${group}`);

    if (group.length < 2) {
      cc.log(`Группа из ${group.length} тайлов — недостаточно`);
      return;
    }

    this.isProcessing = true;

    // 1. Анимация удаления
    if (this.boardView) {
      await this.boardView.animateRemoval(group);
    }

    // 2. Обновление модели
    this.board.removeCells(group);
    this.board.applyGravity();
    this.board.fillEmpty();

    // 3. Перерисовка поля (теперь tileViews соответствует модели)
    if (this.boardView) {
      this.boardView.render(this.board);

      // 4. Анимация падения (всегда после render)
      await this.boardView.animateGravity();

      // 5. Анимация появления
      await this.boardView.animateSpawn();
    }

    this.isProcessing = false;
    cc.log("Ход завершен");
  }
}
