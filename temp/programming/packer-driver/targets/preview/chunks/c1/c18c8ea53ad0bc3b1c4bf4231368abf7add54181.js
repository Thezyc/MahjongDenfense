System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, Node, Sprite, SpriteFrame, instantiate, Vec3, resources, log, UITransform, Button, Label, MahjongTile, HuPaiChecker, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, GameManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfMahjongTile(extras) {
    _reporterNs.report("MahjongTile", "./MahjongTile", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHuPaiChecker(extras) {
    _reporterNs.report("HuPaiChecker", "./HuPaiChecker", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      resources = _cc.resources;
      log = _cc.log;
      UITransform = _cc.UITransform;
      Button = _cc.Button;
      Label = _cc.Label;
    }, function (_unresolved_2) {
      MahjongTile = _unresolved_2.MahjongTile;
    }, function (_unresolved_3) {
      HuPaiChecker = _unresolved_3.HuPaiChecker;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "54f66FZpF9ObrVAgX50vi0W", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Prefab', 'Node', 'Sprite', 'SpriteFrame', 'instantiate', 'Vec3', 'resources', 'log', 'UITransform', 'EventTouch', 'Button', 'Label']);

      // 引入Monster类
      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Prefab), _dec3 = property([SpriteFrame]), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Prefab), _dec(_class = (_class2 = class GameManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "tilePrefab", _descriptor, this);

          _initializerDefineProperty(this, "tileSprites", _descriptor2, this);

          _initializerDefineProperty(this, "huButton", _descriptor3, this);

          // 胡牌按钮
          _initializerDefineProperty(this, "huResultPopup", _descriptor4, this);

          // 计分窗口
          _initializerDefineProperty(this, "monsterPrefab", _descriptor5, this);

          // 怪物预制资源
          this.tiles = [];
          this.raisedTile = null;
          this.handTiles = [];
          this.handArea = null;
          this.huPaiChecker = new (_crd && HuPaiChecker === void 0 ? (_reportPossibleCrUseOfHuPaiChecker({
            error: Error()
          }), HuPaiChecker) : HuPaiChecker)();
        }

        onLoad() {
          log('GameManager onLoad');
          this.handArea = this.node.getChildByName('HandArea');
          this.loadTileSprites().then(() => {
            this.initTiles();
          }).catch(err => {
            log("Error loading tile sprites: " + err);
          }); // 初始化胡牌按钮

          this.huButton.active = false;
          this.huButton.on(Button.EventType.CLICK, this.onHuButtonClick, this); // 初始化计分窗口

          this.huResultPopup.active = false; // 定时生成怪物

          this.schedule(this.spawnMonster, 2);
        }

        onDestroy() {
          // 移除屏幕点击事件监听
          this.node.off(Node.EventType.TOUCH_START, this.onScreenTouch, this);
        }

        loadTileSprites() {
          var _this = this;

          return _asyncToGenerator(function* () {
            return new Promise((resolve, reject) => {
              resources.loadDir('output', SpriteFrame, (err, frames) => {
                if (err) {
                  reject(err);
                  return;
                }

                if (frames.length === 0) {
                  reject('No tile sprites found');
                  return;
                }

                _this.tileSprites = frames;
                log("Loaded " + frames.length + " tile sprites");
                resolve();
              });
            });
          })();
        }

        initTiles() {
          log('Initializing tiles');

          for (var i = 0; i < 136; i++) {
            var tile = instantiate(this.tilePrefab);

            if (!tile) {
              log("Error: Tile prefab instantiation failed at index " + i);
              continue;
            }

            var sprite = tile.getComponent(Sprite);

            if (!sprite) {
              log("Error: Sprite component not found on tile at index " + i);
              continue;
            }

            sprite.spriteFrame = this.tileSprites[i % this.tileSprites.length];
            var tileScript = tile.getComponent(_crd && MahjongTile === void 0 ? (_reportPossibleCrUseOfMahjongTile({
              error: Error()
            }), MahjongTile) : MahjongTile);

            if (tileScript) {
              tileScript.setGameManager(this.node);
            } else {
              log("Error: MahjongTile component not found on tilePrefab at index " + i);
            }

            this.tiles.push(tile);
          }

          this.shuffleTiles();
          this.dealTiles();
        }

        shuffleTiles() {
          log('Shuffling tiles');

          for (var i = this.tiles.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
          }
        }

        dealTiles() {
          log('Dealing tiles');

          for (var i = 0; i < 13; i++) {
            var tile = this.tiles.pop();

            if (!tile) {
              log("Error: Tile is null at index " + i);
              continue;
            }

            this.handTiles.push(tile);
            tile.setParent(this.handArea, false);
          }

          this.drawTile(); // 摸一张牌，使手牌区有14张麻将

          this.updateHandTiles();
        }

        updateHandTiles() {
          this.sortHandTiles();
          var tileWidth = this.handArea.getComponent(UITransform).width / 14;

          for (var i = 0; i < this.handTiles.length; i++) {
            var tile = this.handTiles[i];
            tile.setPosition(new Vec3(i * tileWidth - this.handArea.getComponent(UITransform).width / 2 + tileWidth / 2, 0, 0)); // 禁用自动位置更新

            tile.active = true; // 保存每个麻将的初始位置

            tile.getComponent(_crd && MahjongTile === void 0 ? (_reportPossibleCrUseOfMahjongTile({
              error: Error()
            }), MahjongTile) : MahjongTile).originalPosition.set(tile.position); // 设置图层优先级

            tile.setSiblingIndex(i);
          } // 输出当前手牌到日志


          var handTilesLog = this.handTiles.map(tile => tile.getComponent(Sprite).spriteFrame.name).join(', ');
          log("Current hand tiles: " + handTilesLog);
          this.checkHu();
        }

        sortHandTiles() {
          // 确保最新摸到的麻将放在最右边
          var lastTile = this.handTiles.pop();
          this.handTiles.sort((a, b) => {
            var spriteA = a.getComponent(Sprite).spriteFrame.name;
            var spriteB = b.getComponent(Sprite).spriteFrame.name;
            return spriteA.localeCompare(spriteB);
          });

          if (lastTile) {
            this.handTiles.push(lastTile);
          }
        }

        raiseTile(tile) {
          if (this.raisedTile && this.raisedTile !== tile) {
            this.raisedTile.getComponent(_crd && MahjongTile === void 0 ? (_reportPossibleCrUseOfMahjongTile({
              error: Error()
            }), MahjongTile) : MahjongTile).lower();
          }

          tile.getComponent(_crd && MahjongTile === void 0 ? (_reportPossibleCrUseOfMahjongTile({
            error: Error()
          }), MahjongTile) : MahjongTile).raise();
          this.raisedTile = tile;
        }

        discardTile(tile) {
          log("Discarding tile: " + tile.name);
          this.handTiles = this.handTiles.filter(t => t !== tile);
          tile.removeFromParent();
          this.raisedTile = null;
          this.drawTile();
          this.updateHandTiles(); // 更新手牌显示
        }

        drawTile() {
          if (this.tiles.length > 0) {
            var tile = this.tiles.pop();
            this.handTiles.push(tile);
            tile.setParent(this.handArea, false);
            this.updateHandTiles();
            log("Drew new tile: " + tile.name);
          } else {
            log('No more tiles to draw');
          }
        }

        checkHu() {
          // 创建一个对象，表示所有可能的麻将牌
          var tileCounts = {
            feng: new Array(4).fill(0),
            jian: new Array(3).fill(0),
            wan: new Array(9).fill(0),
            tong: new Array(9).fill(0),
            tiao: new Array(9).fill(0)
          }; // 获取当前手牌并转换为数字数组

          this.handTiles.forEach(tile => {
            var spriteFrameName = tile.getComponent(Sprite).spriteFrame.name;
            var parts = spriteFrameName.split('_');
            var type = parts[2];
            var number = parseInt(parts[3]) - 1;

            if (tileCounts[type]) {
              tileCounts[type][number]++;
            }
          }); // 输出解析后的手牌统计信息到日志

          log('Tile counts:', JSON.stringify(tileCounts)); // 设置胡牌检测器的手牌

          this.huPaiChecker.setTiles(tileCounts); // 检查是否胡牌

          if (this.huPaiChecker.isHu()) {
            log('Hu! You win!');
            this.huButton.active = true; // 显示胡牌按钮
          } else {
            log('Not a Hu yet.');
            this.huButton.active = false; // 隐藏胡牌按钮
          }
        }

        onHuButtonClick() {
          // 显示计分窗口
          this.huResultPopup.active = true; // 列出满足的番种（此处简单示例，可以根据实际需求列出具体番种）

          var huResultLabel = this.huResultPopup.getComponentInChildren(Label);
          huResultLabel.string = "恭喜胡牌！\n番种：XX番，YY番";
        }

        onScreenTouch(event) {
          // 如果点击的不是麻将牌，则放下所有抬起的麻将牌
          if (this.raisedTile) {
            this.raisedTile.getComponent(_crd && MahjongTile === void 0 ? (_reportPossibleCrUseOfMahjongTile({
              error: Error()
            }), MahjongTile) : MahjongTile).lower();
            this.raisedTile = null;
          }
        }

        spawnMonster() {
          var monster = instantiate(this.monsterPrefab); // if (monster) {
          //     log('Monster instantiated successfully.');
          // } else {
          //     log('Failed to instantiate monster.');
          // }

          monster.parent = this.node; // 设置怪物在屏幕最右侧生成

          var uiTransform = monster.getComponent(UITransform);
          monster.setPosition(cc.winSize.width * 0.9 + uiTransform.width / 2, Math.random() * cc.winSize.height); // log(`Monster spawned at position: ${monster.position}`);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tilePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tileSprites", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "huButton", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "huResultPopup", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "monsterPrefab", [_dec6], {
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
//# sourceMappingURL=c18c8ea53ad0bc3b1c4bf4231368abf7add54181.js.map