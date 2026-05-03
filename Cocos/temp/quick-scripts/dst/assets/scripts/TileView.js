
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/scripts/TileView.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0c1xcc2NyaXB0c1xcVGlsZVZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7QUFHNUMsSUFBcUIsUUFBUSxHQUE3QixNQUFxQixRQUFTLFNBQVEsRUFBRSxDQUFDLFNBQVM7SUFBbEQ7O1FBRUUsV0FBTSxHQUFxQixJQUFJLENBQUM7UUFHaEMsZUFBVSxHQUEwQixJQUFJLENBQUM7UUFHekMsZ0JBQVcsR0FBMEIsSUFBSSxDQUFDO1FBRzFDLGlCQUFZLEdBQTBCLElBQUksQ0FBQztRQUczQyxjQUFTLEdBQTBCLElBQUksQ0FBQztRQUd4QyxpQkFBWSxHQUEwQixJQUFJLENBQUM7UUFHM0MsbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1FBRzdDLHNCQUFpQixHQUEwQixJQUFJLENBQUM7UUFHaEQsc0JBQWlCLEdBQTBCLElBQUksQ0FBQztRQUVoRCxRQUFHLEdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakIsUUFBRyxHQUFXLENBQUMsQ0FBQyxDQUFDO1FBRWpCLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUVuQyxxQkFBZ0IsR0FBa0IsSUFBSSxDQUFDO0lBd0V6QyxDQUFDO0lBdEVDLFFBQVEsQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFekIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUU3QixRQUFRLEtBQUssRUFBRTtZQUNiLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVyxDQUFDO2dCQUMzQyxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUks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QVcsQ0FBQzs4Q0FDa0I7QUFHM0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQztnREFDb0I7QUFHN0M7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDdUI7QUFHaEQ7SUFEQyxRQUFRLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQzttREFDdUI7QUExQjdCLFFBQVE7SUFENUIsT0FBTztHQUNhLFFBQVEsQ0F5RzVCO2tCQXpHb0IsUUFBUSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUaWxlVmlldyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG4gIEBwcm9wZXJ0eShjYy5TcHJpdGUpXG4gIHNwcml0ZTogY2MuU3ByaXRlIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICBibHVlU3ByaXRlOiBjYy5TcHJpdGVGcmFtZSB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgZ3JlZW5TcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICBwdXJwbGVTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICByZWRTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICB5ZWxsb3dTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgQHByb3BlcnR5KGNjLlNwcml0ZUZyYW1lKVxuICBzdXBlclJvd1Nwcml0ZTogY2MuU3ByaXRlRnJhbWUgfCBudWxsID0gbnVsbDtcblxuICBAcHJvcGVydHkoY2MuU3ByaXRlRnJhbWUpXG4gIHN1cGVyQ29sdW1uU3ByaXRlOiBjYy5TcHJpdGVGcmFtZSB8IG51bGwgPSBudWxsO1xuXG4gIEBwcm9wZXJ0eShjYy5TcHJpdGVGcmFtZSlcbiAgc3VwZXJSYWRpdXNTcHJpdGU6IGNjLlNwcml0ZUZyYW1lIHwgbnVsbCA9IG51bGw7XG5cbiAgcm93OiBudW1iZXIgPSAtMTtcbiAgY29sOiBudW1iZXIgPSAtMTtcblxuICBjdXJyZW50Q29sb3I6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIGN1cnJlbnRTdXBlclR5cGU6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXG4gIHNldENvbG9yKGNvbG9yOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSByZXR1cm47XG5cbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IGNvbG9yO1xuICAgIHRoaXMuY3VycmVudFN1cGVyVHlwZSA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKGNvbG9yKSB7XG4gICAgICBjYXNlIFwiYmx1ZVwiOlxuICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuYmx1ZVNwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImdyZWVuXCI6XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5ncmVlblNwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInB1cnBsZVwiOlxuICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMucHVycGxlU3ByaXRlITtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwicmVkXCI6XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5yZWRTcHJpdGUhO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ5ZWxsb3dcIjpcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnllbGxvd1Nwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY2Mud2Fybihg0J3QtdC40LfQstC10YHRgtC90YvQuSDRhtCy0LXRgiDRgtCw0LnQu9CwOiAke2NvbG9yfWApO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBzZXRTdXBlclRpbGUoc3VwZXJUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuc3ByaXRlKSByZXR1cm47XG5cbiAgICB0aGlzLmN1cnJlbnRDb2xvciA9IG51bGw7XG4gICAgdGhpcy5jdXJyZW50U3VwZXJUeXBlID0gc3VwZXJUeXBlO1xuXG4gICAgc3dpdGNoIChzdXBlclR5cGUpIHtcbiAgICAgIGNhc2UgXCJyb3dcIjpcbiAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLnN1cGVyUm93U3ByaXRlITtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiY29sdW1uXCI6XG4gICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5zdXBlckNvbHVtblNwcml0ZSE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInJhZGl1c1wiOlxuICAgICAgICB0aGlzLnNwcml0ZS5zcHJpdGVGcmFtZSA9IHRoaXMuc3VwZXJSYWRpdXNTcHJpdGUhO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNjLndhcm4oYNCd0LXQuNC30LLQtdGB0YLQvdGL0Lkg0YLQuNC/INGB0YPQv9C10YAt0YLQsNC50LvQsDogJHtzdXBlclR5cGV9YCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHBsYXlSZW1vdmVBbmltYXRpb24oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgIC50bygwLjMsIHsgc2NhbGU6IDAsIG9wYWNpdHk6IDAgfSlcbiAgICAgICAgLmNhbGwoKCkgPT4gcmVzb2x2ZSgpKVxuICAgICAgICAuc3RhcnQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIHBsYXlTcGF3bkFuaW1hdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLm5vZGUuc2NhbGUgPSAwO1xuICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMjU1O1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlKSA9PiB7XG4gICAgICBjYy50d2Vlbih0aGlzLm5vZGUpXG4gICAgICAgIC50bygwLjMsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwiYmFja091dFwiIH0pXG4gICAgICAgIC5jYWxsKCgpID0+IHJlc29sdmUoKSlcbiAgICAgICAgLnN0YXJ0KCk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==