"use strict";
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