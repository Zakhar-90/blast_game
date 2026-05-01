const { ccclass, property } = cc._decorator;

@ccclass
export default class TileView extends cc.Component {
  @property(cc.Sprite)
  sprite: cc.Sprite | null = null;

  @property(cc.SpriteFrame)
  blueSprite: cc.SpriteFrame | null = null;

  @property(cc.SpriteFrame)
  greenSprite: cc.SpriteFrame | null = null;

  @property(cc.SpriteFrame)
  purpleSprite: cc.SpriteFrame | null = null;

  @property(cc.SpriteFrame)
  redSprite: cc.SpriteFrame | null = null;

  @property(cc.SpriteFrame)
  yellowSprite: cc.SpriteFrame | null = null;

  row: number = -1;
  col: number = -1;

  currentColor: string | null = null;

  setColor(color: string): void {
    if (!this.sprite) return;

    this.currentColor = color;

    switch (color) {
      case "blue":
        this.sprite.spriteFrame = this.blueSprite!;
        break;
      case "green":
        this.sprite.spriteFrame = this.greenSprite!;
        break;
      case "purple":
        this.sprite.spriteFrame = this.purpleSprite!;
        break;
      case "red":
        this.sprite.spriteFrame = this.redSprite!;
        break;
      case "yellow":
        this.sprite.spriteFrame = this.yellowSprite!;
        break;
    }
  }

  playRemoveAnimation(): Promise<void> {
    return new Promise<void>((resolve) => {
      cc.tween(this.node)
        .to(0.3, { scale: 0, opacity: 0 })
        .call(() => resolve())
        .start();
    });
  }

  playSpawnAnimation(): Promise<void> {
    this.node.scale = 0;
    this.node.opacity = 255;
    return new Promise<void>((resolve) => {
      cc.tween(this.node)
        .to(0.3, { scale: 1 }, { easing: "backOut" })
        .call(() => resolve())
        .start();
    });
  }
}
