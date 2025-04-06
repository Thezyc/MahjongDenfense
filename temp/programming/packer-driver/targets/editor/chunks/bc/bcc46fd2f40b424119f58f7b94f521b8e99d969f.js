System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Sprite, SpriteFrame, resources, Node, _dec, _class, _crd, ccclass, property, MahjongGenerator;

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
        async onLoad() {
          // 加载图片
          const spriteFrame = await this.loadSpriteFrame('Tiles/mj_wan_1');
          if (!spriteFrame) return; // 创建 Sprite 节点

          const tileNode = new Node('Tile');
          const sprite = tileNode.addComponent(Sprite);
          sprite.spriteFrame = spriteFrame;
          this.node.addChild(tileNode);
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