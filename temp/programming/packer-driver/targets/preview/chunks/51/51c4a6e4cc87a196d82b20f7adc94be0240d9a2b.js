System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Prefab, instantiate, log, Vec3, TileManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, DeckManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTileManager(extras) {
    _reporterNs.report("TileManager", "./TileManager", _context.meta, extras);
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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      log = _cc.log;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      TileManager = _unresolved_2.TileManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3fb73HefHxGSIUmAS/ioWz0", "DeckManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'resources', 'SpriteFrame', 'log', 'Sprite', 'Vec3']);

      // 导入TileManager类
      ({
        ccclass,
        property
      } = _decorator);

      _export("DeckManager", DeckManager = (_dec = ccclass('DeckManager'), _dec2 = property(Prefab), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = class DeckManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "mahjongTilePrefab", _descriptor, this);

          // MahjongTile的Prefab
          _initializerDefineProperty(this, "deckNode", _descriptor2, this);

          // 牌堆所在的节点
          _initializerDefineProperty(this, "drawArea", _descriptor3, this);

          // 抽牌区
          this.deck = [];
          // 存放所有麻将牌的节点数组
          this.drawnTile = null;
          // 当前抽取的麻将牌
          this.types = ['wan', 'tong', 'tiao', 'feng', 'jian'];
          // 麻将牌的类型
          this.numbers = {
            wan: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            tong: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            tiao: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            feng: [1, 2, 3, 4],
            jian: [1, 2, 3]
          };
          // 每种牌的编号
          this.totalTiles = [];
        }

        // 存储所有136张麻将牌
        start() {
          this.initializeDeck(); // 初始化牌堆
        } // 初始化牌堆，加载并创建136张麻将牌


        initializeDeck() {
          // 遍历每种类型和对应的编号来生成牌
          this.types.forEach(type => {
            this.numbers[type].forEach(num => {
              for (var i = 0; i < 4; i++) {
                // 每种牌有4张
                var tile = instantiate(this.mahjongTilePrefab);
                tile.setParent(this.deckNode); // 将麻将牌添加到牌堆节点

                tile.position = new Vec3(0, 0, 0); // 设置位置，调整为合适的位置（视场景而定）
                // 使用 TileManager 组件类来初始化麻将牌

                var tileManager = tile.getComponent(_crd && TileManager === void 0 ? (_reportPossibleCrUseOfTileManager({
                  error: Error()
                }), TileManager) : TileManager);

                if (tileManager) {
                  tileManager.initializeTile(type, num, i + 1); // 初始化麻将牌，传递花色、编号、序列号
                } else {
                  log("TileManager component not found on tile prefab!");
                }

                this.totalTiles.push(tile); // 将该牌加入牌堆数组
              }
            });
          });
        } // 抽取一张牌


        drawTile() {
          if (this.totalTiles.length > 0) {
            var randomIndex = Math.floor(Math.random() * this.totalTiles.length);
            var tile = this.totalTiles[randomIndex];
            this.totalTiles.splice(randomIndex, 1); // 从牌堆中移除抽取的牌

            this.createDrawnTile(tile); // 将抽取的牌显示在抽牌区
          }
        } // 创建抽取的麻将牌并放到抽牌区


        createDrawnTile(tile) {
          this.drawnTile = tile;
          tile.setParent(this.drawArea); // 将牌放到抽牌区

          tile.position = new Vec3(0, 0, 0); // 设置位置，调整为合适的位置

          this.addDragFeature(tile); // 给麻将牌添加拖拽功能
        } // 给麻将牌添加拖拽功能


        addDragFeature(tile) {
          tile.on(Node.EventType.TOUCH_MOVE, this.onTileDrag, this);
          tile.on(Node.EventType.TOUCH_END, this.onTileDrop, this);
          tile.on(Node.EventType.TOUCH_CANCEL, this.onTileDrop, this);
        } // 拖拽麻将牌


        onTileDrag(event) {
          var delta = event.getDelta();
          this.drawnTile.setPosition(this.drawnTile.position.add(delta));
        } // 放置麻将牌（检查是否放入格子或丢弃区）


        onTileDrop(event) {
          var gridManager = this.node.getComponent('GridManager'); // 获取GridManager组件

          var grid = gridManager.getGridAtPoint(this.drawnTile.position);

          if (grid) {
            // 如果放入格子，则将牌放到格子上
            this.drawnTile.setPosition(grid.position);
          } else {
            // 如果没有放入格子，则返回抽牌区或丢弃牌
            this.drawnTile.setPosition(this.drawArea.position);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mahjongTilePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "deckNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "drawArea", [_dec4], {
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
//# sourceMappingURL=51c4a6e4cc87a196d82b20f7adc94be0240d9a2b.js.map