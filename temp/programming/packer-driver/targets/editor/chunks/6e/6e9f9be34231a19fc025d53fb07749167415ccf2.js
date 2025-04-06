System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, Node, tween, _cc, MahjongManager, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, cc, Marjong;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfMahjongManager(extras) {
    _reporterNs.report("MahjongManager", "./MahjongManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc2) {
      _cclegacy = _cc2.cclegacy;
      __checkObsolete__ = _cc2.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc2.__checkObsoleteInNamespace__;
      _decorator = _cc2._decorator;
      Component = _cc2.Component;
      Vec3 = _cc2.Vec3;
      Node = _cc2.Node;
      tween = _cc2.tween;
      _cc = _cc2;
    }, function (_unresolved_2) {
      MahjongManager = _unresolved_2.MahjongManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "1ab4f8Ll3lJqqByaudE9pqd", "Majiang", undefined);

      __checkObsolete__(['_decorator', 'Component', 'instantiate', 'Vec3', 'Node', 'tween']);

      ({
        ccclass,
        property
      } = _decorator);
      cc = __checkObsoleteInNamespace__(_cc);

      _export("Marjong", Marjong = (_dec = ccclass('Mahjong'), _dec2 = property(Node), _dec(_class = (_class2 = class Marjong extends Component {
        constructor(...args) {
          super(...args);
          this.originalPos = new Vec3();
          this.isSelected = false;

          _initializerDefineProperty(this, "speed", _descriptor, this);

          _initializerDefineProperty(this, "score", _descriptor2, this);

          _initializerDefineProperty(this, "type", _descriptor3, this);

          _initializerDefineProperty(this, "targetTile", _descriptor4, this);

          _initializerDefineProperty(this, "moveUpDistance", _descriptor5, this);
        }

        onLoad() {
          // 保存原始位置
          this.originalPos = this.node.position.clone(); // 添加点击事件

          this.node.on(Node.EventType.TOUCH_END, this.onClick, this);
        }

        onClick() {
          if (this.isSelected) {
            this.cancelSelect();
            (_crd && MahjongManager === void 0 ? (_reportPossibleCrUseOfMahjongManager({
              error: Error()
            }), MahjongManager) : MahjongManager).instance.cancelCurrent();
          } else {
            (_crd && MahjongManager === void 0 ? (_reportPossibleCrUseOfMahjongManager({
              error: Error()
            }), MahjongManager) : MahjongManager).instance.trySelect(this.node);
            this.select();
          }
        }

        select() {
          if (this.isSelected) return;
          this.isSelected = true; // 抬起动画

          tween(this.node).to(0.2, {
            position: new Vec3(this.originalPos.x, this.originalPos.y + 50, 0)
          }).start();
        }

        cancelSelect() {
          if (!this.isSelected) return;
          this.isSelected = false; // 复位动画

          tween(this.node).to(0.2, {
            position: this.originalPos
          }).start();
        } // update(deltaTime: number) {
        // }


      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 10;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "score", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "type", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return "mj_feng_1";
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "targetTile", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "moveUpDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6e9f9be34231a19fc025d53fb07749167415ccf2.js.map