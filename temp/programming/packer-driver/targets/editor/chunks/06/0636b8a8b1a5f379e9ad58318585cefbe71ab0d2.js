System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, log, Input, UITransform, find, _dec, _class, _crd, ccclass, property, MahjongTile;

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
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "246feN9fQFJoYjS5Z/9UUkW", "MahjongTile", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'log', 'EventMouse', 'Input', 'UITransform', 'director', 'find']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MahjongTile", MahjongTile = (_dec = ccclass('MahjongTile'), _dec(_class = class MahjongTile extends Component {
        constructor(...args) {
          super(...args);
          this.originalPosition = new Vec3();
          this.isDragging = false;
          this.offset = new Vec3();
          this.gridNodes = [];
          this.gameManager = null;
          this.gridNodeMap = new Map();
        }

        // 用于记录格子和麻将的映射关系
        onLoad() {
          // 设置麻将的显示层级
          this.node.setSiblingIndex(1000); // 保存麻将牌的初始位置

          this.originalPosition.set(this.node.position); // 添加鼠标事件监听器

          this.node.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
          this.node.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
          this.node.on(Input.EventType.MOUSE_UP, this.onMouseUp, this); // 获取 Slots 节点

          const slotsNode = find('Canvas/Slots');

          if (slotsNode) {
            this.gridNodes = slotsNode.children;
            log(`Found ${this.gridNodes.length} slots`);
          } else {
            log('Slots node not found');
          }
        }

        onDestroy() {
          // 移除鼠标事件监听器
          this.node.off(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
          this.node.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
          this.node.off(Input.EventType.MOUSE_UP, this.onMouseUp, this);
        }

        onMouseDown(event) {
          this.isDragging = true; // 计算鼠标点击位置与麻将牌节点位置的偏移量

          const uiTransform = this.node.getComponent(UITransform);

          if (uiTransform) {
            const localMousePos = uiTransform.convertToNodeSpaceAR(new Vec3(event.getUILocation().x, event.getUILocation().y, 0));
            this.offset = this.node.position.subtract(localMousePos);
          } // 当开始拖拽时，将麻将的显示层级提高


          this.node.setSiblingIndex(2000);
        }

        onMouseMove(event) {
          if (this.isDragging) {
            // 更新麻将牌的位置
            const uiTransform = this.node.getComponent(UITransform);

            if (uiTransform) {
              const localMousePos = uiTransform.convertToNodeSpaceAR(new Vec3(event.getUILocation().x, event.getUILocation().y, 0));
              this.node.setPosition(localMousePos.add(this.offset));
            }
          }
        }

        onMouseUp(event) {
          this.isDragging = false; // 获取麻将牌的中心点

          const tileCenter = this.node.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO); // 检查是否在格子内

          let closestGridNode = null;
          let minDistance = Infinity;

          for (let i = 0; i < this.gridNodes.length; i++) {
            const gridNode = this.gridNodes[i];
            const gridTransform = gridNode.getComponent(UITransform);
            const gridCenter = gridTransform.convertToWorldSpaceAR(Vec3.ZERO); // 判断麻将牌的中心点是否与格子的边界框相交

            if (gridTransform.getBoundingBoxToWorld().contains(tileCenter)) {
              // 计算麻将牌中心与格子中心的距离
              const distance = tileCenter.subtract(gridCenter).length();

              if (distance < minDistance) {
                minDistance = distance;
                closestGridNode = gridNode;
              }
            }
          }

          if (closestGridNode) {
            const existingTile = this.gridNodeMap.get(closestGridNode);

            if (existingTile) {
              // 如果格子中已有麻将，与当前麻将交换位置
              const existingTilePosition = existingTile.getWorldPosition();
              existingTile.setWorldPosition(this.node.getWorldPosition());
              this.node.setWorldPosition(existingTilePosition);
            } else {
              // 将麻将牌放置在最近的格子中心
              this.node.setWorldPosition(closestGridNode.getComponent(UITransform).convertToWorldSpaceAR(Vec3.ZERO));
              this.gridNodeMap.set(closestGridNode, this.node);
            }

            this.node.setSiblingIndex(1000);
          } else {
            // 如果不在格子内，恢复到原始位置，并恢复正常的显示层级
            this.node.setPosition(this.originalPosition);
            this.node.setSiblingIndex(1000);
          }
        }

        setGameManager(gameManager) {
          this.gameManager = gameManager;
        }

        raise() {// this.node.setPosition(this.originalPosition.clone().add3f(0, 50, 0)); // 基于初始位置抬起
          // this.isRaised = true;
        }

        lower() {// this.node.setPosition(this.originalPosition); // 恢复到初始位置
          // this.isRaised = false;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0636b8a8b1a5f379e9ad58318585cefbe71ab0d2.js.map