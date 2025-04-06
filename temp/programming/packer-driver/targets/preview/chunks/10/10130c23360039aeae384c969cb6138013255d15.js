System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, MjType, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "dbd2bhsVstAy5gCSiy5XDmL", "MahjongGame.js", undefined);

      // GameManager.ts
      ({
        ccclass,
        property
      } = cc._decorator);

      MjType = /*#__PURE__*/function (MjType) {
        MjType[MjType["WAN"] = 0] = "WAN";
        MjType[MjType["TIAO"] = 1] = "TIAO";
        MjType[MjType["TONG"] = 2] = "TONG";
        return MjType;
      }(MjType || {});

      _export("default", GameManager = (_dec = property(cc.Node), _dec2 = property(cc.Node), _dec3 = property(cc.Prefab), ccclass(_class = (_class2 = class GameManager extends cc.Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "startButton", _descriptor, this);

          _initializerDefineProperty(this, "handArea", _descriptor2, this);

          _initializerDefineProperty(this, "tilePrefab", _descriptor3, this);

          this.allTiles = [];
          this.playerHand = [];
          this.tilePool = [];
          this.discarded = [];
        }

        onLoad() {
          this.startButton.on(cc.Node.EventType.TOUCH_END, this.initGame, this);
        } // 初始化游戏


        initGame() {
          this.generateTiles();
          this.shuffleTiles();
          this.dealInitialHand();
          this.drawNextTile();
        } // 生成所有麻将牌


        generateTiles() {
          this.allTiles = []; // 生成万（1-9）、条（11-19）、筒（21-29）

          for (var type = 0; type < 3; type++) {
            for (var num = 1; num <= 9; num++) {
              for (var i = 0; i < 4; i++) {
                this.allTiles.push(type * 10 + num);
              }
            }
          }
        } // 洗牌


        shuffleTiles() {
          for (var i = this.allTiles.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [this.allTiles[i], this.allTiles[j]] = [this.allTiles[j], this.allTiles[i]];
          }

          this.tilePool = [...this.allTiles];
        } // 初始发牌


        dealInitialHand() {
          this.playerHand = this.tilePool.splice(0, 14);
          this.updateHandDisplay();
        } // 摸牌


        drawNextTile() {
          if (this.tilePool.length === 0) {
            cc.log("牌堆已空");
            return;
          }

          this.playerHand.push(this.tilePool.shift());
          this.updateHandDisplay();
          this.checkWinCondition();
        } // 打牌


        discardTile(index) {
          var discarded = this.playerHand.splice(index, 1)[0];
          this.discarded.push(discarded);
          this.drawNextTile();
        } // 更新手牌显示


        updateHandDisplay() {
          this.handArea.removeAllChildren();
          this.playerHand.sort((a, b) => a - b).forEach((tile, index) => {
            var tileNode = cc.instantiate(this.tilePrefab);
            tileNode.getComponentInChildren(cc.Label).string = this.getTileName(tile);
            tileNode.on(cc.Node.EventType.TOUCH_END, () => this.discardTile(index));
            this.handArea.addChild(tileNode);
          });
        } // 胡牌检测


        checkWinCondition() {
          if (this.isWin(this.playerHand)) {
            cc.log("胡牌啦！");
            this.tilePool = []; // 清空牌堆结束游戏
          }
        } // 胡牌判断算法


        isWin(hand) {
          var sorted = [...hand].sort((a, b) => a - b); // 尝试所有可能的将牌组合

          for (var i = 0; i < sorted.length - 1; i++) {
            if (sorted[i] === sorted[i + 1]) {
              var temp = [...sorted];
              temp.splice(i, 2);
              if (this.checkGroups(temp)) return true;
            }
          }

          return false;
        } // 检查是否可组成四个成牌


        checkGroups(hand) {
          if (hand.length === 0) return true; // 检查刻子

          if (hand.length >= 3 && hand[0] === hand[1] && hand[1] === hand[2]) {
            if (this.checkGroups(hand.slice(3))) return true;
          } // 检查顺子


          var first = hand[0];
          var next1 = first + 1;
          var next2 = first + 2;

          if (first % 10 <= 7 && hand.includes(next1) && hand.includes(next2) && Math.floor(first / 10) === Math.floor(next1 / 10) && Math.floor(first / 10) === Math.floor(next2 / 10)) {
            var temp = [...hand];
            temp.splice(temp.indexOf(next2), 1);
            temp.splice(temp.indexOf(next1), 1);
            temp.shift();
            if (this.checkGroups(temp)) return true;
          }

          return false;
        } // 获取牌显示名称


        getTileName(tile) {
          var type = Math.floor(tile / 10);
          var num = tile % 10;
          return "" + ["万", "条", "筒"][type] + num;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startButton", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "handArea", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tilePrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=10130c23360039aeae384c969cb6138013255d15.js.map