System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, log, Input, find, Vec2, _dec, _class, _crd, ccclass, property, MahjongTile;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      log = _cc.log;
      Input = _cc.Input;
      find = _cc.find;
      Vec2 = _cc.Vec2;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "246feN9fQFJoYjS5Z/9UUkW", "MahjongTile", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'log', 'EventMouse', 'Input', 'UITransform', 'find', 'Vec2']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MahjongTile", MahjongTile = (_dec = ccclass('MahjongTile'), _dec(_class = class MahjongTile extends Component {
        constructor() {
          super(...arguments);
          this.originalPosition = new Vec3();
          this.isDragging = false;
          this.gridNodes = [];
          this.gameManager = null;
          this.draggedTile = null;
        }

        onLoad() {
          this.originalPosition.set(this.node.position);
          this.node.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
          this.node.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
          this.node.on(Input.EventType.MOUSE_UP, this.onMouseUp, this);
          var gridsNode = find('Canvas/Grids');

          if (gridsNode) {
            this.gridNodes = gridsNode.children;
            log("Found " + this.gridNodes.length + " grids");
          } else {
            log('Grids node not found');
          }
        }

        onDestroy() {
          this.node.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
          this.node.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
          this.node.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }

        onMouseDown(event) {
          var tile = event.target;

          if (tile) {
            this.draggedTile = tile; // 记录麻将的初始世界位置，同时记录原有的父节点（原格子）

            this.originalPosition.set(tile.getWorldPosition());
            this.isDragging = true;
            log("\u9009\u4E2D\u9EBB\u5C06\u4F4D\u7F6E: " + this.originalPosition.toString());
          }
        }

        onMouseMove(event) {
          if (this.isDragging && this.draggedTile) {
            var worldPos = event.getUILocation();
            this.draggedTile.setWorldPosition(new Vec3(worldPos.x, worldPos.y, 0)); // log(`MahjongTile onMouseMove: Dragging Position: ${this.draggedTile.getWorldPosition().toString()}`);
          }
        }

        onMouseUp(event) {
          if (!this.draggedTile) return;
          var targetPos = event.getUILocation();
          var targetGridNode = this.findNearestGrid(targetPos); // 判断鼠标释放位置的情况

          if (targetGridNode) {
            if (this.isGridOccupied(targetGridNode)) {
              // 如果目标格子已被占用，则进行交换
              this.swapTileWithGrid(targetGridNode);
              log("\u4E0E\u683C\u5B50 " + targetGridNode.name + " \u5185\u7684\u9EBB\u5C06\u8FDB\u884C\u4EA4\u6362");
            } else {
              // 目标格子没有麻将，则正常放置
              this.placeTileInGrid(targetGridNode);
              log("\u653E\u7F6E\u9EBB\u5C06\u5230\u683C\u5B50: " + targetGridNode.name);
            }
          } else {
            this.returnToOriginalPosition();
            log('未找到有效格子，返回原位置');
          }

          this.isDragging = false;
          this.draggedTile = null;
        }

        setGameManager(gameManager) {
          this.gameManager = gameManager;
        }

        setGridNodes(gridNodes) {
          this.gridNodes = gridNodes;
        } // 新增辅助方法

        /**
         * 找到最近的有效格子
         */


        findNearestGrid(targetPos) {
          if (!this.gridNodes || this.gridNodes.length === 0) return null;
          var nearestGrid = null;
          var minDistance = Number.MAX_VALUE;

          for (var grid of this.gridNodes) {
            var gridPos = grid.getWorldPosition();
            var distance = Vec2.distance(new Vec2(targetPos.x, targetPos.y), new Vec2(gridPos.x, gridPos.y)); // 设置一个最大有效距离（比如100像素）

            if (distance < minDistance && distance < 100) {
              minDistance = distance;
              nearestGrid = grid;
            }
          }

          return nearestGrid;
        }
        /**
         * 检查格子是否已被占用
         */


        isGridOccupied(gridNode) {
          // 检查格子是否已经有子节点（不包括当前拖动的麻将）
          return gridNode.children.length > 0 && gridNode.children[0] !== this.draggedTile;
        }
        /**
         * 将麻将放置到指定格子
         */


        placeTileInGrid(gridNode) {
          if (!this.draggedTile) return; // 设置父节点为目标格子并对齐中心

          this.draggedTile.setParent(gridNode, true);
          this.draggedTile.setPosition(Vec3.ZERO); // 更新原始位置

          this.originalPosition.set(this.draggedTile.getWorldPosition());
        }
        /**
         * 返回原始位置
         */


        returnToOriginalPosition() {
          if (!this.draggedTile) return; // 使用世界坐标系设置位置

          this.draggedTile.setWorldPosition(this.originalPosition);
        }
        /**
         * 交换拖拽麻将与目标格子中已有麻将的位置
         */


        swapTileWithGrid(targetGrid) {
          if (!this.draggedTile) return; // 获取拖拽麻将原来的格子（父节点）

          var originalGrid = this.draggedTile.parent;

          if (!originalGrid) {
            // 如果原格子不存在，则无法交换，回到原位置
            this.returnToOriginalPosition();
            return;
          } // 获取目标格子中已存在的麻将


          var occupiedTile = targetGrid.children[0];

          if (!occupiedTile) {
            // 这里不应该发生，因为isGridOccupied已经检查过
            this.placeTileInGrid(targetGrid);
            return;
          } // 交换步骤：
          // 1. 将拖拽麻将移动到目标格子


          this.draggedTile.setParent(targetGrid, true);
          this.draggedTile.setPosition(Vec3.ZERO); // 2. 将目标格子原有的麻将移动到拖拽麻将的原格子

          occupiedTile.setParent(originalGrid, true);
          occupiedTile.setPosition(Vec3.ZERO); // 3. 更新各自的原始位置记录

          var draggedTileScript = this.draggedTile.getComponent(MahjongTile);

          if (draggedTileScript) {
            draggedTileScript.originalPosition.set(this.draggedTile.getWorldPosition());
          }

          var occupiedTileScript = occupiedTile.getComponent(MahjongTile);

          if (occupiedTileScript) {
            occupiedTileScript.originalPosition.set(occupiedTile.getWorldPosition());
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f2b8ba9c0315c5438e8314191d25c3295b2323fa.js.map