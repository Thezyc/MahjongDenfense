System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, resources, SpriteFrame, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, TileManager;

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
      Sprite = _cc.Sprite;
      resources = _cc.resources;
      SpriteFrame = _cc.SpriteFrame;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ea85amXUMBDe6hh9RJUMbTd", "TileManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Sprite', 'resources', 'SpriteFrame']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("TileManager", TileManager = (_dec = ccclass('TileManager'), _dec2 = property(Sprite), _dec(_class = (_class2 = class TileManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "sprite", _descriptor, this);
        }

        // 初始化麻将牌的类型、编号和序列号
        initializeTile(type, number, index) {
          const spriteName = `output/combined_mj_${type}_${number}`;
          console.log(`Loading sprite at path: ${spriteName}`); // 输出路径调试信息

          resources.load(spriteName, SpriteFrame, (err, spriteFrame) => {
            if (err) {
              console.error(`Error loading sprite: ${spriteName} - ${err.message}`);
            } else {
              this.sprite.spriteFrame = spriteFrame; // 设置麻将牌的SpriteFrame
            }
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "sprite", [_dec2], {
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
//# sourceMappingURL=f4804ca4dda2fa3f7d50e122afe71c412587d96e.js.map