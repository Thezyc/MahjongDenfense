System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, log, Input, find, Vec2, input, _dec, _class, _class2, _crd, ccclass, property, MahjongTile;

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
      input = _cc.input;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "246feN9fQFJoYjS5Z/9UUkW", "MahjongTile", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'log', 'EventMouse', 'Input', 'UITransform', 'find', 'Vec2', 'input']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MahjongTile", MahjongTile = (_dec = ccclass('MahjongTile'), _dec(_class = (_class2 = class MahjongTile extends Component {
        constructor() {
          super(...arguments);
          this.originalPosition = new Vec3();
          this.isDragging = false;
          this.gridNodes = [];
          this.gameManager = null;
          this.draggedTile = null;
        }

        onLoad() {
          this.originalPosition.set(this.node.position); // 本地事件监听

          this.node.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
          this.node.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
          this.node.on(Input.EventType.MOUSE_UP, this.onMouseUp, this); // 使用 input 全局监听 MOUSE_UP 事件，确保在任意区域释放鼠标时都能触发拖拽结束

          input.on(Input.EventType.MOUSE_UP, this.onGlobalMouseUp, this);
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
          input.off(Input.EventType.MOUSE_UP, this.onGlobalMouseUp, this); // 如果当前实例是正在拖拽的实例，则置空

          if (MahjongTile.currentDragging === this) {
            MahjongTile.currentDragging = null;
          }
        }

        onMouseDown(event) {
          // 如果已有其他麻将正在拖拽，先结束它的拖拽操作
          if (MahjongTile.currentDragging && MahjongTile.currentDragging !== this) {
            MahjongTile.currentDragging.forceEndDrag();
          }

          var tile = event.target;

          if (tile) {
            this.draggedTile = tile; // 记录麻将的原始世界位置

            this.originalPosition.set(tile.getWorldPosition());
            this.isDragging = true; // 更新当前正在拖拽的实例

            MahjongTile.currentDragging = this;
            log("\u9009\u4E2D\u9EBB\u5C06\u4F4D\u7F6E: " + this.originalPosition.toString());
          }
        }

        onMouseMove(event) {
          if (this.isDragging && this.draggedTile) {
            var worldPos = event.getUILocation();
            this.draggedTile.setWorldPosition(new Vec3(worldPos.x, worldPos.y, 0));
          }
        }

        onMouseUp(event) {
          if (!this.draggedTile) return;
          var targetPos = event.getUILocation();
          var targetGridNode = this.findNearestGrid(targetPos);

          if (targetGridNode) {
            if (this.isGridOccupied(targetGridNode)) {
              this.swapTileWithGrid(targetGridNode);
              log("\u4E0E\u683C\u5B50 " + targetGridNode.name + " \u5185\u7684\u9EBB\u5C06\u8FDB\u884C\u4EA4\u6362");
            } else {
              this.placeTileInGrid(targetGridNode);
              log("\u653E\u7F6E\u9EBB\u5C06\u5230\u683C\u5B50: " + targetGridNode.name);
            }
          } else {
            this.returnToOriginalPosition();
            log('未找到有效格子，返回原位置');
          }

          this.endDrag();
        }
        /**
         * 全局 MOUSE_UP 回调，确保鼠标任意释放时都能重置拖拽状态
         */


        onGlobalMouseUp(event) {
          // 仅对当前正在拖拽的实例生效
          if (this.isDragging) {
            this.onMouseUp(event);
          }
        }
        /**
         * 强制结束拖拽，恢复到原始位置，并重置拖拽状态
         */


        forceEndDrag() {
          if (this.isDragging) {
            this.returnToOriginalPosition();
            this.endDrag();
            log("\u5F3A\u5236\u7ED3\u675F\u62D6\u62FD\uFF0C\u9EBB\u5C06\u8FD4\u56DE\u539F\u4F4D");
          }
        }
        /**
         * 结束拖拽，清理状态
         */


        endDrag() {
          this.isDragging = false;
          this.draggedTile = null;

          if (MahjongTile.currentDragging === this) {
            MahjongTile.currentDragging = null;
          }
        }

        setGameManager(gameManager) {
          this.gameManager = gameManager;
        }

        setGridNodes(gridNodes) {
          this.gridNodes = gridNodes;
        }
        /**
         * 找到最近的有效格子
         */


        findNearestGrid(targetPos) {
          if (!this.gridNodes || this.gridNodes.length === 0) return null;
          var nearestGrid = null;
          var minDistance = Number.MAX_VALUE;

          for (var grid of this.gridNodes) {
            var gridPos = grid.getWorldPosition();
            var distance = Vec2.distance(new Vec2(targetPos.x, targetPos.y), new Vec2(gridPos.x, gridPos.y));

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
          return gridNode.children.length > 0 && gridNode.children[0] !== this.draggedTile;
        }
        /**
         * 将麻将放置到指定格子
         */


        placeTileInGrid(gridNode) {
          if (!this.draggedTile) return;
          this.draggedTile.setParent(gridNode, true);
          this.draggedTile.setPosition(Vec3.ZERO);
          this.originalPosition.set(this.draggedTile.getWorldPosition());
        }
        /**
         * 返回原始位置
         */


        returnToOriginalPosition() {
          if (!this.draggedTile) return;
          this.draggedTile.setWorldPosition(this.originalPosition);
        }
        /**
         * 交换拖拽麻将与目标格子中已有麻将的位置
         */


        swapTileWithGrid(targetGrid) {
          if (!this.draggedTile) return;
          var originalGrid = this.draggedTile.parent;

          if (!originalGrid) {
            this.returnToOriginalPosition();
            return;
          }

          var occupiedTile = targetGrid.children[0];

          if (!occupiedTile) {
            this.placeTileInGrid(targetGrid);
            return;
          }

          this.draggedTile.setParent(targetGrid, true);
          this.draggedTile.setPosition(Vec3.ZERO);
          occupiedTile.setParent(originalGrid, true);
          occupiedTile.setPosition(Vec3.ZERO);
          var draggedTileScript = this.draggedTile.getComponent(MahjongTile);

          if (draggedTileScript) {
            draggedTileScript.originalPosition.set(this.draggedTile.getWorldPosition());
          }

          var occupiedTileScript = occupiedTile.getComponent(MahjongTile);

          if (occupiedTileScript) {
            occupiedTileScript.originalPosition.set(occupiedTile.getWorldPosition());
          }
        }

      }, _class2.currentDragging = null, _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f2b8ba9c0315c5438e8314191d25c3295b2323fa.js.map