System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, Sprite, SpriteFrame, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, TileType, MahjongGame;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f0765ortTRJiJoFx8UTlz3E", "MahjongGame", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'Sprite', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      TileType = /*#__PURE__*/function (TileType) {
        TileType[TileType["Character"] = 0] = "Character";
        TileType[TileType["Bamboo"] = 1] = "Bamboo";
        TileType[TileType["Dot"] = 2] = "Dot";
        TileType[TileType["Wind"] = 3] = "Wind";
        TileType[TileType["Dragon"] = 4] = "Dragon";
        return TileType;
      }(TileType || {});

      _export("MahjongGame", MahjongGame = (_dec = ccclass('MahjongGame'), _dec2 = property({
        type: Prefab
      }), _dec3 = property({
        type: [SpriteFrame]
      }), _dec(_class = (_class2 = class MahjongGame extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "tilePrefab", _descriptor, this);

          _initializerDefineProperty(this, "tileSprites", _descriptor2, this);

          this.allTiles = [];
          this.currentHand = [];
          this.selectedTiles = [];
        }

        start() {
          this.initializeTiles();
        } // 初始化所有麻将牌


        initializeTiles() {
          // 创建万条筒（1-9 各4张）
          for (let type = 0; type < 3; type++) {
            for (let value = 1; value <= 9; value++) {
              for (let i = 0; i < 4; i++) {
                this.allTiles.push({
                  type: type,
                  value: value,
                  spriteFrame: this.tileSprites[type * 9 + (value - 1)]
                });
              }
            }
          } // 创建风牌和箭牌（各4张）
          // ...类似逻辑...

        } // 洗牌


        shuffleTiles() {
          for (let i = this.allTiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.allTiles[i], this.allTiles[j]] = [this.allTiles[j], this.allTiles[i]];
          }
        } // 发牌


        dealTiles() {
          this.clearCurrentHand(); // 实例化136张牌中的14张（示例）

          for (let i = 0; i < 14; i++) {
            const tileNode = instantiate(this.tilePrefab);
            const tileData = this.allTiles[i];
            const sprite = tileNode.getComponent(Sprite);
            sprite.spriteFrame = tileData.spriteFrame;
            tileNode.setParent(this.node.getChildByName('TilePool'));
            tileNode.on(Node.EventType.TOUCH_END, this.onTileSelected, this);
            this.currentHand.push(tileNode);
          }

          this.arrangeTiles();
        } // 排列麻将牌


        arrangeTiles() {
          const startX = -500;
          const spacing = 100;
          this.currentHand.forEach((tile, index) => {
            tile.setPosition(startX + spacing * index, 0);
          });
        } // 牌被选中


        onTileSelected(event) {
          const tileNode = event.target;
          const highlight = tileNode.getChildByName('SelectHighlight');

          if (this.selectedTiles.includes(tileNode)) {
            // 取消选择
            highlight.active = false;
            this.selectedTiles = this.selectedTiles.filter(t => t !== tileNode);
          } else {
            // 选中
            highlight.active = true;
            this.selectedTiles.push(tileNode);

            if (this.selectedTiles.length === 3) {
              this.checkTriplet();
            }
          }
        } // 检查是否组成刻子


        checkTriplet() {
          const tilesData = this.selectedTiles.map(tile => {
            return;
          });

          if (this.isTriplet(tilesData)) {
            // 成功匹配
            this.removeMatchedTiles();
            this.selectedTiles = [];
          }
        } // 判断是否刻子


        isTriplet(tiles) {
          // 实现刻子判断逻辑
          return true;
        } // 移除匹配的牌


        removeMatchedTiles() {
          this.selectedTiles.forEach(tile => {
            tile.destroy();
          });
        } // 检查胜利条件


        checkWinCondition() {
          if (this.currentHand.length === 0) {// 显示胜利UI
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tilePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tileSprites", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=42dd13850c3b1c648cfcd8db2d13b456be095bce.js.map