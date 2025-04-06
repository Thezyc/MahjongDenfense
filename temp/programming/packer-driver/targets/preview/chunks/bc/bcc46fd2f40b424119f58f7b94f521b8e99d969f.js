System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, SpriteFrame, resources, Node, _dec, _class, _crd, ccclass, property, MahjongGenerator;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      resources = _cc.resources;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b1b3bNCg3tGkZkuS20vxqzq", "MahjongGenerator", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Sprite', 'SpriteFrame', 'resources', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MahjongGenerator", MahjongGenerator = (_dec = ccclass('MahjongGenerator'), _dec(_class = class MahjongGenerator extends Component {
        onLoad() {
          var _this = this;

          return _asyncToGenerator(function* () {
            // 加载图片
            var spriteFrame = yield _this.loadSpriteFrame('Tiles/mj_wan_1');
            if (!spriteFrame) return; // 创建 Sprite 节点

            var tileNode = new Node('Tile');
            var sprite = tileNode.addComponent(Sprite);
            sprite.spriteFrame = spriteFrame;

            _this.node.addChild(tileNode);
          })();
        }

        loadSpriteFrame(path) {
          return new Promise(resolve => {
            resources.load(path, SpriteFrame, (err, spriteFrame) => {
              if (err) {
                console.error('加载失败:', path, err);
                resolve(null);
              } else {
                resolve(spriteFrame);
              }
            });
          });
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bcc46fd2f40b424119f58f7b94f521b8e99d969f.js.map