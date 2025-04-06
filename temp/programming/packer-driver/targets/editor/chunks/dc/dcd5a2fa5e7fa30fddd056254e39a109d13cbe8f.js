System.register(["cc", "cc/env", "editor-extends"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, EDITOR, Node, Prefab, Sprite, SpriteFrame, EditorExtends, _crd, Menu, Path;

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

        Menu.addMenuItem('Project/生成麻将Prefab', async () => {
          await generateMahjongPrefabs();
        });

        async function generateMahjongPrefabs() {
          // 配置参数
          const config = {
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

          const baseSpriteFrame = await EditorExtends.AssetDB.loadAsset(`db://assets/${config.basePath}.png`, SpriteFrame); // 遍历所有牌型组合

          for (const type of config.types) {
            for (const number of config.numbers) {
              const facePath = `${config.faceDir}/mj_${type}_${number}`; // 加载牌面资源

              const faceSpriteFrame = await EditorExtends.AssetDB.loadAsset(`db://assets/${facePath}.png`, SpriteFrame); // 创建预制体节点

              const prefabNode = new Node(`Mahjong_${type}_${number}`); // 添加底图组件

              const baseNode = new Node('Base');
              const baseSprite = baseNode.addComponent(Sprite);
              baseSprite.spriteFrame = baseSpriteFrame;
              baseSprite.sizeMode = Sprite.SizeMode.TRIMMED;
              prefabNode.addChild(baseNode); // 添加牌面组件

              const faceNode = new Node('Face');
              const faceSprite = faceNode.addComponent(Sprite);
              faceSprite.spriteFrame = faceSpriteFrame;
              faceNode.setPosition(0, 10); // 微调牌面位置

              prefabNode.addChild(faceNode); // 生成Prefab并保存

              const prefab = new Prefab();
              prefab.data = prefabNode;
              const outputPath = `${config.outputDir}/mahjong_${type}_${number}.prefab`;
              await EditorExtends.AssetDB.createOrSaveAsset(prefab, `db://assets/${outputPath}`);
            }
          }

          EditorExtends.Dialog.info('生成完成', `已创建${config.types.length * config.numbers.length}个Prefab`);
        }
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dcd5a2fa5e7fa30fddd056254e39a109d13cbe8f.js.map