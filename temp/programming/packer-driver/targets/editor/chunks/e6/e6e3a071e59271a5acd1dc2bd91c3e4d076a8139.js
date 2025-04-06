System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, GridManager;

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
      Prefab = _cc.Prefab;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "74e65Vupa5ONoK7hwxd/045", "GridManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Prefab', 'instantiate', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GridManager", GridManager = (_dec = ccclass('GridManager'), _dec2 = property(Prefab), _dec(_class = (_class2 = class GridManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "gridPrefab", _descriptor, this);

          this.gridNodes = [];
        }

        onLoad() {
          this.createGrid();
        } // createGrid() {
        //     const gridSize = 120; // 每个格子的大小
        //     const leftGridCount = 9; // 左侧3x3的格子数量
        //     const rightGridCount = 6; // 右侧2x3的格子数量
        //     // 创建左侧3x3格子
        //     // for (let i = 0; i < leftGridCount; i++) {
        //     //     const gridNode = instantiate(this.gridPrefab);
        //     //     gridNode.setParent(this.node);
        //     //     const row = Math.floor(i / 3);
        //     //     const col = i % 3;
        //     //     gridNode.setPosition(new Vec3(col * gridSize - 500, -row * gridSize + 200, 0));
        //     //     gridNode.setSiblingIndex(0); // 设置格子的显示层级低于麻将
        //     //     this.gridNodes.push(gridNode);
        //     // }
        //     // 创建右侧2x3格子
        //     // for (let i = 0; i < rightGridCount; i++) {
        //     //     const gridNode = instantiate(this.gridPrefab);
        //     //     gridNode.setParent(this.node);
        //     //     const row = Math.floor(i / 2);
        //     //     const col = i % 2;
        //     //     gridNode.setPosition(new Vec3(col * gridSize - 200, -row * gridSize + 200, 0));
        //     //     gridNode.setSiblingIndex(0); // 设置格子的显示层级低于麻将
        //     //     this.gridNodes.push(gridNode);
        //     // }
        // }


        getGridNodes() {
          return this.gridNodes;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gridPrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e6e3a071e59271a5acd1dc2bd91c3e4d076a8139.js.map