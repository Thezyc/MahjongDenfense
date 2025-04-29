System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, Sprite, SpriteFrame, instantiate, Vec3, resources, log, find, MahjongTile, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, GameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfMahjongTile(extras) {
    _reporterNs.report("MahjongTile", "./MahjongTile", _context.meta, extras);
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
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      resources = _cc.resources;
      log = _cc.log;
      find = _cc.find;
    }, function (_unresolved_2) {
      MahjongTile = _unresolved_2.MahjongTile;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "54f66FZpF9ObrVAgX50vi0W", "GameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Prefab', 'Node', 'Sprite', 'SpriteFrame', 'instantiate', 'Vec3', 'resources', 'log', 'find']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameManager", GameManager = (_dec = ccclass('GameManager'), _dec2 = property(Prefab), _dec3 = property([SpriteFrame]), _dec(_class = (_class2 = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "tilePrefab", _descriptor, this);

          _initializerDefineProperty(this, "tileSprites", _descriptor2, this);

          this.tiles = [];
          this.gridNodes = [];
          this.gridNodeMap = new Map();
        }

        onLoad() {
          log('GameManager onLoad'); // 获取 Grids 节点

          const gridsNode = find('Canvas/Grids');

          if (gridsNode) {
            this.gridNodes = gridsNode.children;
            log(`Found ${this.gridNodes.length} grids`);
          } else {
            log('Grids node not found');
          }

          this.loadTileSprites().then(() => {
            this.initTiles();
          }).catch(err => {
            log(`Error loading tile sprites: ${err}`);
          });
        }

        async loadTileSprites() {
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

              this.tileSprites = frames;
              log(`Loaded ${frames.length} tile sprites`);
              resolve();
            });
          });
        }

        initTiles() {
          log('Initializing tiles');

          if (!this.tilePrefab) {
            log('Error: tilePrefab is null');
            return;
          }

          for (let i = 0; i < this.gridNodes.length; i++) {
            const gridNode = this.gridNodes[i]; // 创建麻将并设置精灵

            const tile = instantiate(this.tilePrefab);
            const sprite = tile.getComponent(Sprite);
            sprite.spriteFrame = this.tileSprites[i % this.tileSprites.length]; // 使用世界坐标初始化麻将的位置

            const gridWorldPos = gridNode.getWorldPosition();
            tile.setWorldPosition(gridWorldPos); // 初始化 MahjongTile 脚本

            const tileScript = tile.getComponent(_crd && MahjongTile === void 0 ? (_reportPossibleCrUseOfMahjongTile({
              error: Error()
            }), MahjongTile) : MahjongTile);
            tileScript.setGameManager(this.node);
            tileScript.setGridNodes(this.gridNodes); // 记录到 gridNodeMap

            this.gridNodeMap.set(gridNode, tile);
            this.tiles.push(tile);
          }

          this.shuffleTiles();
          this.dealTiles();
        }

        shuffleTiles() {
          log('Shuffling tiles');

          for (let i = this.tiles.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
          }
        }

        dealTiles() {
          log('Dealing tiles');

          for (let i = 0; i < 13; i++) {
            let tile = this.tiles.pop();
            const sprite = tile.getComponent(Sprite);

            if (!tile) {
              log(`Error: Tile is null at index ${i}`);
              continue;
            }

            let gridNode = this.gridNodes[i];
            log(`Dealing tile ${tile.getComponent(Sprite).spriteFrame.name} to grid ${gridNode.name}`);
            tile.setParent(gridNode, true);
            tile.setPosition(Vec3.ZERO); // 保存每个麻将的初始位置

            tile.getComponent(_crd && MahjongTile === void 0 ? (_reportPossibleCrUseOfMahjongTile({
              error: Error()
            }), MahjongTile) : MahjongTile).originalPosition.set(tile.position);
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
//# sourceMappingURL=1430d662b82b8380e6df5cf31d50a34f3d6946fb.js.map