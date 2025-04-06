System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, UITransform, sp, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Monster;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      UITransform = _cc.UITransform;
      sp = _cc.sp;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "78fecN/v3FKoYqvX9ilPhGf", "Monster", undefined);

      ({
        ccclass,
        property
      } = cc._decorator);

      __checkObsolete__(['UITransform', 'sp']);

      _export("default", Monster = ccclass(_class = (_class2 = class Monster extends cc.Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "hp", _descriptor, this);

          _initializerDefineProperty(this, "speed", _descriptor2, this);

          _initializerDefineProperty(this, "attack", _descriptor3, this);

          this.spine = null;
        }

        onLoad() {
          // 获取 Spine 组件
          this.spine = this.node.getComponent(sp.Skeleton);

          if (this.spine) {
            // 设置默认动画
            this.spine.setAnimation(0, 'IDLE', true);
          } else {
            console.error('Spine component not found on monster node.');
          } // 获取UITransform组件


          var uiTransform = this.node.getComponent(UITransform);

          if (uiTransform) {
            // 设置怪物在屏幕最右侧生成
            this.node.setPosition(cc.winSize.width + uiTransform.width / 2, Math.random() * cc.winSize.height - cc.winSize.height / 2); // console.log(`Monster created at position: ${this.node.position}`);
          } else {
            console.error('UITransform component not found on monster node.');
          }
        }

        start() {// console.log(`Monster start method called.`);
        }

        update(dt) {
          var uiTransform = this.node.getComponent(UITransform);

          if (!uiTransform) {
            console.error('UITransform component not found on monster node.');
            return;
          } // 确保 update() 方法被调用
          // console.log(`Monster is updating. dt=${dt}, speed=${this.speed}, current position: (${this.node.position.x}, ${this.node.position.y})`);
          // 让怪物向左移动


          var newX = this.node.position.x - this.speed * dt;
          this.node.setPosition(newX, this.node.position.y); // 确保位置更新
          // console.log(`Monster new position: (${this.node.position.x}, ${this.node.position.y})`);
          // 如果怪物移出屏幕左侧，则销毁该节点

          if (this.node.position.x < -cc.winSize.width / 2 - uiTransform.width / 2) {
            this.node.destroy(); // console.log(`Monster destroyed.`);
          }
        }

        playAnimation(animationName, loop) {
          if (this.spine) {
            this.spine.setAnimation(0, animationName, loop);
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hp", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "attack", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 10;
        }
      })), _class2)) || _class);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e0fe8cf2cd729475a6feb1df2cac400e4aa257a9.js.map