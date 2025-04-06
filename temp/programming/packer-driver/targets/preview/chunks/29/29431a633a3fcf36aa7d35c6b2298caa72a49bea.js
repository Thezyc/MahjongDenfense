System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Sprite, SpriteFrame, resources, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, SetGenerator;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      resources = _cc.resources;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d23971l9D9JrL0zeMkI/L5x", "SetGenerator", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'SpriteFrame', 'resources']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SetGenerator", SetGenerator = (_dec = ccclass('SetGenerator'), _dec2 = property({
        type: SpriteFrame
      }), _dec(_class = (_class2 = class SetGenerator extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "baseSpriteFrame", _descriptor, this);

          // 绑定miaojiang_bai.png
          // 麻将类型和数字枚举（示例）
          this.types = ["wan", "tong", "tiao", "feng", "jian"];
          this.numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
        }

        start() {
          this.generateAllTiles();
        }

        generateAllTiles() {
          var _this = this;

          return _asyncToGenerator(function* () {
            for (var type of _this.types) {
              for (var num of _this.numbers) {
                // 动态加载牌面资源
                var path = "Tiles/mj_" + type + "_" + num;
                var spriteFrame = yield _this.loadSpriteFrame(path); // 创建节点并组合

                var tileNode = new Node();
                var baseSprite = tileNode.addComponent(Sprite);
                baseSprite.spriteFrame = _this.baseSpriteFrame;
                var faceNode = new Node();
                var faceSprite = faceNode.addComponent(Sprite);
                faceSprite.spriteFrame = spriteFrame;
                faceNode.setPosition(0, 0); // 根据实际偏移调整

                tileNode.addChild(faceNode);
              }
            }
          })();
        }

        loadSpriteFrame(path) {
          return new Promise((resolve, reject) => {
            resources.load(path, SpriteFrame, (err, asset) => {
              if (err) reject(err);else resolve(asset);
            });
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "baseSpriteFrame", [_dec2], {
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
//# sourceMappingURL=29431a633a3fcf36aa7d35c6b2298caa72a49bea.js.map