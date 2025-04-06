System.register(["cc", "cc/env", "editor-extends"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EDITOR, Node, Prefab, Sprite, SpriteFrame, EditorExtends, _crd, Menu, Path;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
    }, function (_ccEnv) {
      EDITOR = _ccEnv.EDITOR;
    }, function (_editorExtends) {
      EditorExtends = _editorExtends;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "3dc09dqGclL+IraDQWN/OKV", "mahjong_generators", undefined);

      __checkObsolete__(['director']);

      __checkObsolete__(['Asset', 'Node', 'Prefab', 'Sprite', 'SpriteFrame', '_decorator']);

      if (EDITOR) {
        ({
          Menu,
          Path
        } = EditorExtends); // 注册到编辑器菜单

        Menu.addMenuItem('Project/生成麻将Prefab', /*#__PURE__*/_asyncToGenerator(function* () {
          yield generateMahjongPrefabs();
        }));

        function generateMahjongPrefabs() {
          return _generateMahjongPrefabs.apply(this, arguments);
        }

        function _generateMahjongPrefabs() {
          _generateMahjongPrefabs = _asyncToGenerator(function* () {
            // 配置参数
            var config = {
              basePath: 'Miaojiang/miaojiang_bai',
              // 底图路径
              faceDir: 'Tiles',
              // 牌面目录
              outputDir: 'Prefabs/Mahjong',
              // 输出目录
              types: ['wan', 'tong', 'suo', 'feng'],
              // 麻将类型
              numbers: Array.from({
                length: 9
              }, (_, i) => i + 1) // 数字1-9

            }; // 加载底图资源

            var baseSpriteFrame = yield EditorExtends.AssetDB.loadAsset("db://assets/" + config.basePath + ".png", SpriteFrame); // 遍历所有牌型组合

            for (var type of config.types) {
              for (var number of config.numbers) {
                var facePath = config.faceDir + "/mj_" + type + "_" + number; // 加载牌面资源

                var faceSpriteFrame = yield EditorExtends.AssetDB.loadAsset("db://assets/" + facePath + ".png", SpriteFrame); // 创建预制体节点

                var prefabNode = new Node("Mahjong_" + type + "_" + number); // 添加底图组件

                var baseNode = new Node('Base');
                var baseSprite = baseNode.addComponent(Sprite);
                baseSprite.spriteFrame = baseSpriteFrame;
                baseSprite.sizeMode = Sprite.SizeMode.TRIMMED;
                prefabNode.addChild(baseNode); // 添加牌面组件

                var faceNode = new Node('Face');
                var faceSprite = faceNode.addComponent(Sprite);
                faceSprite.spriteFrame = faceSpriteFrame;
                faceNode.setPosition(0, 10); // 微调牌面位置

                prefabNode.addChild(faceNode); // 生成Prefab并保存

                var prefab = new Prefab();
                prefab.data = prefabNode;
                var outputPath = config.outputDir + "/mahjong_" + type + "_" + number + ".prefab";
                yield EditorExtends.AssetDB.createOrSaveAsset(prefab, "db://assets/" + outputPath);
              }
            }

            EditorExtends.Dialog.info('生成完成', "\u5DF2\u521B\u5EFA" + config.types.length * config.numbers.length + "\u4E2APrefab");
          });
          return _generateMahjongPrefabs.apply(this, arguments);
        }
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dcd5a2fa5e7fa30fddd056254e39a109d13cbe8f.js.map