System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Mahjong, _cc, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _class3, _crd, ccclass, property, cc, GameState, TileState, MahjongManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfMahjong(extras) {
    _reporterNs.report("Mahjong", "./Mahjong", _context.meta, extras);
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
      Node = _cc2.Node;
      _cc = _cc2;
    }, function (_unresolved_2) {
      Mahjong = _unresolved_2.Mahjong;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "e1ef3v8ZIJPB4WyXlLHOhsi", "MahjongManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);
      cc = __checkObsoleteInNamespace__(_cc);

      GameState = /*#__PURE__*/function (GameState) {
        GameState[GameState["GS_INIT"] = 0] = "GS_INIT";
        GameState[GameState["GS_PLAYING"] = 1] = "GS_PLAYING";
        GameState[GameState["GS_END"] = 2] = "GS_END";
        return GameState;
      }(GameState || {});

      ;

      TileState = /*#__PURE__*/function (TileState) {
        TileState[TileState["MJ_SELECTED"] = 0] = "MJ_SELECTED";
        TileState[TileState["MJ_UNSELECTED"] = 1] = "MJ_UNSELECTED";
        return TileState;
      }(TileState || {});

      _export("MahjongManager", MahjongManager = (_dec = ccclass('MahjongManager'), _dec2 = property({
        type: Node
      }), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property(Node), _dec(_class = (_class2 = (_class3 = class MahjongManager extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "startMenu", _descriptor, this);

          _initializerDefineProperty(this, "playingState", _descriptor2, this);

          _initializerDefineProperty(this, "tileState", _descriptor3, this);

          _initializerDefineProperty(this, "targetTile", _descriptor4, this);

          _initializerDefineProperty(this, "moveDistance", _descriptor5, this);

          this.currentSelected = null;
        }

        start() {
          this.setCurState(GameState.GS_INIT);
        }

        update(deltaTime) {}

        init() {
          if (this.startMenu) {
            this.startMenu.active = true;
          }

          if (this.playingState) {
            this.playingState.active = false;
          }
        }

        setCurState(value) {
          switch (value) {
            case GameState.GS_INIT:
              this.init();
              break;

            case GameState.GS_PLAYING:
              if (this.startMenu) {
                this.startMenu.active = false;
              }

              if (this.playingState) {
                this.playingState.active = true;
              }

              break;

            case GameState.GS_END:
              break;
          }
        }

        onStartButtonClicked() {
          this.setCurState(GameState.GS_PLAYING);
        }

        onLoad() {
          MahjongManager.instance = this;
        }

        trySelect(newNode) {
          if (this.currentSelected === newNode) return; // 取消之前选中的麻将

          if (this.currentSelected) {
            var mahjong = this.currentSelected.getComponent(_crd && Mahjong === void 0 ? (_reportPossibleCrUseOfMahjong({
              error: Error()
            }), Mahjong) : Mahjong);
            mahjong == null || mahjong.cancelSelect();
          } // 选中新的麻将


          this.currentSelected = newNode;
        }

        cancelCurrent() {
          this.currentSelected = null;
        }

      }, _class3.instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "startMenu", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playingState", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tileState", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "targetTile", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "moveDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=f4681dabeb24a36bdacf433b554a5a3dfb70b451.js.map