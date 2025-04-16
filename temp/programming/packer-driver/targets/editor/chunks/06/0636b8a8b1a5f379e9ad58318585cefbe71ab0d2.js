System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, log, Input, UITransform, find, Vec2, _dec, _class, _crd, ccclass, property, MahjongTile;

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
      UITransform = _cc.UITransform;
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
        constructor(...args) {
          super(...args);
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
          const gridsNode = find('Canvas/Grids');

          if (gridsNode) {
            this.gridNodes = gridsNode.children;
            log(`Found ${this.gridNodes.length} grids`);
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
          const tile = event.target;

          if (tile) {
            this.draggedTile = tile;
            this.originalPosition.set(tile.getWorldPosition()); // 记录麻将的初始世界位置

            this.isDragging = true;
            log(`选中麻将位置: ${this.originalPosition.toString()}`);
          }
        }

        onMouseMove(event) {
          if (this.isDragging && this.draggedTile) {
            const worldPos = event.getUILocation();
            this.draggedTile.setWorldPosition(new Vec3(worldPos.x, worldPos.y, 0)); // log(`MahjongTile onMouseMove: Dragging Position: ${this.draggedTile.getWorldPosition().toString()}`);
          }
        }

        onMouseUp(event) {
          if (!this.draggedTile) return;
          const targetPos = event.getUILocation();
          let targetGridNode = null; // 查找鼠标释放位置所在的格子

          for (const gridNode of this.gridNodes) {
            const gridTransform = gridNode.getComponent(UITransform);
            log(gridNode.name + '包围盒: ' + gridTransform.getBoundingBoxToWorld().toString());

            if (gridTransform) {
              const boundingBox = gridTransform.getBoundingBoxToWorld();

              if (boundingBox.contains(new Vec2(targetPos.x, targetPos.y))) {
                targetGridNode = gridNode;
                break;
              }
            }
          }

          if (targetGridNode) {
            const gameManager = this.gameManager.getComponent('GameManager');
            const gridNodeMap = gameManager.gridNodeMap;
            log(`麻将释放位置: ${targetGridNode.name}`);

            if (gridNodeMap.has(targetGridNode)) {
              const targetTile = gridNodeMap.get(targetGridNode);

              if (targetTile === this.draggedTile) {
                log('麻将释放: Same tile selected, no swap performed.');
                this.draggedTile.setWorldPosition(this.originalPosition);
              } else {
                const tempPosition = targetTile.getWorldPosition().clone();
                targetTile.setWorldPosition(this.draggedTile.getWorldPosition());
                this.draggedTile.setWorldPosition(tempPosition);
                gridNodeMap.set(targetGridNode, this.draggedTile);
                gridNodeMap.set(this.node.parent, targetTile);
                log(`麻将释放，交换格子: Swapped with tile at grid ${targetGridNode.name}`);
              }
            } else {
              this.draggedTile.setWorldPosition(targetGridNode.getWorldPosition());
              gridNodeMap.delete(this.node.parent);
              gridNodeMap.set(targetGridNode, this.draggedTile);
              log(`MahjongTile onMouseUp: Moved to empty grid ${targetGridNode.name}`);
            }
          } else {
            this.draggedTile.setWorldPosition(this.originalPosition);
            log(`MahjongTile onMouseUp: Returned to original position: ${this.originalPosition.toString()}`);
          }

          this.isDragging = false;
          this.draggedTile = null;
        }

        setGameManager(gameManager) {
          this.gameManager = gameManager;
        }

        setGridNodes(gridNodes) {
          this.gridNodes = gridNodes;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0636b8a8b1a5f379e9ad58318585cefbe71ab0d2.js.map