System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, HuPaiChecker, _crd;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6e398rzrIBBbZkkMF4P6tOO", "HuPaiChecker", undefined);

      _export("HuPaiChecker", HuPaiChecker = class HuPaiChecker {
        constructor() {
          this.tiles = void 0;
          this.tiles = {
            feng: new Array(4).fill(0),
            jian: new Array(3).fill(0),
            wan: new Array(9).fill(0),
            tong: new Array(9).fill(0),
            tiao: new Array(9).fill(0)
          };
        }

        setTiles(tiles) {
          this.tiles = tiles;
        }

        isHu() {
          for (var type in this.tiles) {
            for (var i = 0; i < this.tiles[type].length; i++) {
              if (this.tiles[type][i] >= 2) {
                this.tiles[type][i] -= 2;
                var tempTiles = JSON.parse(JSON.stringify(this.tiles));

                if (this.isMentsuAll(tempTiles)) {
                  this.tiles[type][i] += 2;
                  return true;
                }

                this.tiles[type][i] += 2;
              }
            }
          }

          return false;
        }

        isMentsuAll(tiles) {
          for (var type in tiles) {
            if (!this.isMentsu(tiles[type])) {
              return false;
            }
          }

          return true;
        }

        isMentsu(tiles) {
          var tilesCopy = tiles.slice();

          for (var i = 0; i < tilesCopy.length; i++) {
            if (tilesCopy[i] >= 3) {
              tilesCopy[i] -= 3;
              i--;
              continue;
            }

            if (i + 2 < tilesCopy.length && tilesCopy[i] > 0 && tilesCopy[i + 1] > 0 && tilesCopy[i + 2] > 0) {
              tilesCopy[i]--;
              tilesCopy[i + 1]--;
              tilesCopy[i + 2]--;
              i--;
              continue;
            }
          }

          return tilesCopy.every(count => count === 0);
        } // 检测清一色


        checkQingYiSe() {
          var colorTypes = ['wan', 'tong', 'tiao'];
          var colorCount = 0;

          for (var color of colorTypes) {
            if (this.tiles[color].some(count => count > 0)) {
              colorCount++;
            }
          }

          var hasNoZi = this.tiles['feng'].every(count => count === 0) && this.tiles['jian'].every(count => count === 0);
          return colorCount === 1 && hasNoZi;
        } // 检测混一色


        checkHunYiSe() {
          var colorTypes = ['wan', 'tong', 'tiao'];
          var colorCount = 0;

          for (var color of colorTypes) {
            if (this.tiles[color].some(count => count > 0)) {
              colorCount++;
            }
          }

          var hasZi = this.tiles['feng'].some(count => count > 0) || this.tiles['jian'].some(count => count > 0);
          return colorCount === 1 && hasZi;
        } // 检测碰碰和


        checkPengPengHu() {
          for (var type in this.tiles) {
            var tileCopy = [...this.tiles[type]];
            var hasPair = false;

            for (var i = 0; i < tileCopy.length; i++) {
              if (tileCopy[i] >= 2) {
                if (hasPair) {
                  continue; // 如果已经有将牌，跳过多余的将牌
                }

                hasPair = true;
                tileCopy[i] -= 2; // 移除将牌
              }
            }

            if (!tileCopy.every(count => count % 3 === 0)) {
              return false; // 如果剩余的牌不能被3整除，返回false
            }
          }

          return true;
        } // 检测断幺九


        checkDuanYaoJiu() {
          for (var i = 0; i < 9; i++) {
            if (i === 0 || i === 8) {
              if (this.tiles['wan'][i] > 0 || this.tiles['tong'][i] > 0 || this.tiles['tiao'][i] > 0) {
                return false;
              }
            }
          }

          return this.tiles['feng'].every(count => count === 0) && this.tiles['jian'].every(count => count === 0);
        } // 检测平和


        checkPingHu() {
          var hasPair = false;
          var totalMentsu = 0;

          for (var type in this.tiles) {
            var tileCopy = [...this.tiles[type]];

            for (var i = 0; i < tileCopy.length; i++) {
              if (tileCopy[i] >= 2) {
                if (hasPair) {
                  continue; // 忽略多余的将牌
                }

                hasPair = true;
                tileCopy[i] -= 2;
              }
            }

            totalMentsu += this.countShunzi(tileCopy);
          }

          return hasPair && totalMentsu === 4;
        }

        countShunzi(tiles) {
          var tilesCopy = tiles.slice();
          var shunziCount = 0;

          for (var i = 0; i < tilesCopy.length; i++) {
            while (i + 2 < tilesCopy.length && tilesCopy[i] > 0 && tilesCopy[i + 1] > 0 && tilesCopy[i + 2] > 0) {
              tilesCopy[i]--;
              tilesCopy[i + 1]--;
              tilesCopy[i + 2]--;
              shunziCount++;
            }
          }

          return shunziCount;
        } // 检测鸡胡


        checkJiHu() {
          return true; // 鸡胡默认返回true
        } // 获取满足条件的番种


        getFanTypes() {
          var fanTypes = [];

          if (this.checkQingYiSe()) {
            fanTypes.push({
              name: '清一色',
              fan: 24
            });
          }

          if (this.checkHunYiSe()) {
            fanTypes.push({
              name: '混一色',
              fan: 6
            });
          }

          if (this.checkPengPengHu()) {
            fanTypes.push({
              name: '碰碰和',
              fan: 6
            });
          }

          if (this.checkDuanYaoJiu()) {
            fanTypes.push({
              name: '断幺九',
              fan: 2
            });
          }

          if (this.checkPingHu()) {
            fanTypes.push({
              name: '平和',
              fan: 2
            });
          }

          if (fanTypes.length === 0) {
            fanTypes.push({
              name: '鸡胡',
              fan: 1
            });
          }

          return fanTypes;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8f925432070582f37856a05c2a346e295c2748c7.js.map