
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Model/GameModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'cc442HaMlBE/ZKi7W/YUKwd', 'GameModel');
// Script/Model/GameModel.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _CellModel = _interopRequireDefault(require("./CellModel"));

var _ConstValue = require("./ConstValue");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameModel = /*#__PURE__*/function () {
  function GameModel() {
    _classCallCheck(this, GameModel);

    this.cells = null;
    this.cellBgs = null;
    this.lastPos = cc.v2(-1, -1);
    this.cellTypeNum = 5;
    this.cellCreateType = []; // 升成种类只在这个数组里面查找
  }

  _createClass(GameModel, [{
    key: "init",
    value: function init(cellTypeNum) {
      this.cells = [];
      this.setCellTypeNum(cellTypeNum || this.cellTypeNum);

      for (var i = 1; i <= _ConstValue.GRID_WIDTH; i++) {
        this.cells[i] = [];

        for (var j = 1; j <= _ConstValue.GRID_HEIGHT; j++) {
          this.cells[i][j] = new _CellModel["default"]();
        }
      }

      for (var i = 1; i <= _ConstValue.GRID_WIDTH; i++) {
        for (var j = 1; j <= _ConstValue.GRID_HEIGHT; j++) {
          var flag = true;

          while (flag) {
            flag = false;
            this.cells[i][j].init(this.getRandomCellType());
            var result = this.checkPoint(j, i)[0];

            if (result.length > 2) {
              flag = true;
            }

            this.cells[i][j].setXY(j, i);
            this.cells[i][j].setStartXY(j, i);
          }
        }
      }
    }
  }, {
    key: "initWithData",
    value: function initWithData(data) {// to do
    }
  }, {
    key: "checkPoint",
    value: function checkPoint(x, y) {
      var checkWithDirection = function checkWithDirection(x, y, direction) {
        var queue = [];
        var vis = [];
        vis[x + y * 9] = true;
        queue.push(cc.v2(x, y));
        var front = 0;

        while (front < queue.length) {
          //let direction = [cc.v2(0, -1), cc.v2(0, 1), cc.v2(1, 0), cc.v2(-1, 0)];
          var point = queue[front];
          var cellModel = this.cells[point.y][point.x];
          front++;

          if (!cellModel) {
            continue;
          }

          for (var i = 0; i < direction.length; i++) {
            var tmpX = point.x + direction[i].x;
            var tmpY = point.y + direction[i].y;

            if (tmpX < 1 || tmpX > 9 || tmpY < 1 || tmpY > 9 || vis[tmpX + tmpY * 9] || !this.cells[tmpY][tmpX]) {
              continue;
            }

            if (cellModel.type == this.cells[tmpY][tmpX].type) {
              vis[tmpX + tmpY * 9] = true;
              queue.push(cc.v2(tmpX, tmpY));
            }
          }
        }

        return queue;
      };

      var rowResult = checkWithDirection.call(this, x, y, [cc.v2(1, 0), cc.v2(-1, 0)]);
      var colResult = checkWithDirection.call(this, x, y, [cc.v2(0, -1), cc.v2(0, 1)]);
      var result = [];
      var newCellStatus = "";

      if (rowResult.length >= 5 || colResult.length >= 5) {
        newCellStatus = _ConstValue.CELL_STATUS.BIRD;
      } else if (rowResult.length >= 3 && colResult.length >= 3) {
        newCellStatus = _ConstValue.CELL_STATUS.WRAP;
      } else if (rowResult.length >= 4) {
        newCellStatus = _ConstValue.CELL_STATUS.LINE;
      } else if (colResult.length >= 4) {
        newCellStatus = _ConstValue.CELL_STATUS.COLUMN;
      }

      if (rowResult.length >= 3) {
        result = rowResult;
      }

      if (colResult.length >= 3) {
        var tmp = result.concat();
        colResult.forEach(function (newEle) {
          var flag = false;
          tmp.forEach(function (oldEle) {
            if (newEle.x == oldEle.x && newEle.y == oldEle.y) {
              flag = true;
            }
          }, this);

          if (!flag) {
            result.push(newEle);
          }
        }, this);
      }

      return [result, newCellStatus, this.cells[y][x].type];
    }
  }, {
    key: "printInfo",
    value: function printInfo() {
      for (var i = 1; i <= 9; i++) {
        var printStr = "";

        for (var j = 1; j <= 9; j++) {
          printStr += this.cells[i][j].type + " ";
        }

        console.log(printStr);
      }
    }
  }, {
    key: "getCells",
    value: function getCells() {
      return this.cells;
    } // controller调用的主要入口
    // 点击某个格子

  }, {
    key: "selectCell",
    value: function selectCell(pos) {
      this.changeModels = []; // 发生改变的model，将作为返回值，给view播动作

      this.effectsQueue = []; // 动物消失，爆炸等特效

      var lastPos = this.lastPos;
      var delta = Math.abs(pos.x - lastPos.x) + Math.abs(pos.y - lastPos.y);

      if (delta != 1) {
        //非相邻格子， 直接返回
        this.lastPos = pos;
        return [[], []];
      }

      var curClickCell = this.cells[pos.y][pos.x]; //当前点击的格子

      var lastClickCell = this.cells[lastPos.y][lastPos.x]; // 上一次点击的格式

      this.exchangeCell(lastPos, pos);
      var result1 = this.checkPoint(pos.x, pos.y)[0];
      var result2 = this.checkPoint(lastPos.x, lastPos.y)[0];
      this.curTime = 0; // 动画播放的当前时间

      this.pushToChangeModels(curClickCell);
      this.pushToChangeModels(lastClickCell);
      var isCanBomb = curClickCell.status != _ConstValue.CELL_STATUS.COMMON && // 判断两个是否是特殊的动物
      lastClickCell.status != _ConstValue.CELL_STATUS.COMMON || curClickCell.status == _ConstValue.CELL_STATUS.BIRD || lastClickCell.status == _ConstValue.CELL_STATUS.BIRD;

      if (result1.length < 3 && result2.length < 3 && !isCanBomb) {
        //不会发生消除的情况
        this.exchangeCell(lastPos, pos);
        curClickCell.moveToAndBack(lastPos);
        lastClickCell.moveToAndBack(pos);
        this.lastPos = cc.v2(-1, -1);
        return [this.changeModels];
      } else {
        this.lastPos = cc.v2(-1, -1);
        curClickCell.moveTo(lastPos, this.curTime);
        lastClickCell.moveTo(pos, this.curTime);
        var checkPoint = [pos, lastPos];
        this.curTime += _ConstValue.ANITIME.TOUCH_MOVE;
        this.processCrush(checkPoint);
        return [this.changeModels, this.effectsQueue];
      }
    } // 消除

  }, {
    key: "processCrush",
    value: function processCrush(checkPoint) {
      var cycleCount = 0;

      while (checkPoint.length > 0) {
        var bombModels = [];

        if (cycleCount == 0 && checkPoint.length == 2) {
          //特殊消除
          var pos1 = checkPoint[0];
          var pos2 = checkPoint[1];
          var model1 = this.cells[pos1.y][pos1.x];
          var model2 = this.cells[pos2.y][pos2.x];

          if (model1.status == _ConstValue.CELL_STATUS.BIRD || model2.status == _ConstValue.CELL_STATUS.BIRD) {
            var bombModel = null;

            if (model1.status == _ConstValue.CELL_STATUS.BIRD) {
              model1.type = model2.type;
              bombModels.push(model1);
            } else {
              model2.type = model1.type;
              bombModels.push(model2);
            }
          }
        }

        for (var i in checkPoint) {
          var pos = checkPoint[i];

          if (!this.cells[pos.y][pos.x]) {
            continue;
          }

          var _this$checkPoint = this.checkPoint(pos.x, pos.y),
              _this$checkPoint2 = _slicedToArray(_this$checkPoint, 3),
              result = _this$checkPoint2[0],
              newCellStatus = _this$checkPoint2[1],
              newCellType = _this$checkPoint2[2];

          if (result.length < 3) {
            continue;
          }

          for (var j in result) {
            var model = this.cells[result[j].y][result[j].x];
            this.crushCell(result[j].x, result[j].y, false, cycleCount);

            if (model.status != _ConstValue.CELL_STATUS.COMMON) {
              bombModels.push(model);
            }
          }

          this.createNewCell(pos, newCellStatus, newCellType);
        }

        this.processBomb(bombModels, cycleCount);
        this.curTime += _ConstValue.ANITIME.DIE;
        checkPoint = this.down();
        cycleCount++;
      }
    } //生成新cell

  }, {
    key: "createNewCell",
    value: function createNewCell(pos, status, type) {
      if (status == "") {
        return;
      }

      if (status == _ConstValue.CELL_STATUS.BIRD) {
        type = _ConstValue.CELL_TYPE.BIRD;
      }

      var model = new _CellModel["default"]();
      this.cells[pos.y][pos.x] = model;
      model.init(type);
      model.setStartXY(pos.x, pos.y);
      model.setXY(pos.x, pos.y);
      model.setStatus(status);
      model.setVisible(0, false);
      model.setVisible(this.curTime, true);
      this.changeModels.push(model);
    } // 下落

  }, {
    key: "down",
    value: function down() {
      var newCheckPoint = [];

      for (var i = 1; i <= _ConstValue.GRID_WIDTH; i++) {
        for (var j = 1; j <= _ConstValue.GRID_HEIGHT; j++) {
          if (this.cells[i][j] == null) {
            var curRow = i;

            for (var k = curRow; k <= _ConstValue.GRID_HEIGHT; k++) {
              if (this.cells[k][j]) {
                this.pushToChangeModels(this.cells[k][j]);
                newCheckPoint.push(this.cells[k][j]);
                this.cells[curRow][j] = this.cells[k][j];
                this.cells[k][j] = null;
                this.cells[curRow][j].setXY(j, curRow);
                this.cells[curRow][j].moveTo(cc.v2(j, curRow), this.curTime);
                curRow++;
              }
            }

            var count = 1;

            for (var k = curRow; k <= _ConstValue.GRID_HEIGHT; k++) {
              this.cells[k][j] = new _CellModel["default"]();
              this.cells[k][j].init(this.getRandomCellType());
              this.cells[k][j].setStartXY(j, count + _ConstValue.GRID_HEIGHT);
              this.cells[k][j].setXY(j, count + _ConstValue.GRID_HEIGHT);
              this.cells[k][j].moveTo(cc.v2(j, k), this.curTime);
              count++;
              this.changeModels.push(this.cells[k][j]);
              newCheckPoint.push(this.cells[k][j]);
            }
          }
        }
      }

      this.curTime += _ConstValue.ANITIME.TOUCH_MOVE + 0.3;
      return newCheckPoint;
    }
  }, {
    key: "pushToChangeModels",
    value: function pushToChangeModels(model) {
      if (this.changeModels.indexOf(model) != -1) {
        return;
      }

      this.changeModels.push(model);
    }
  }, {
    key: "cleanCmd",
    value: function cleanCmd() {
      for (var i = 1; i <= _ConstValue.GRID_WIDTH; i++) {
        for (var j = 1; j <= _ConstValue.GRID_HEIGHT; j++) {
          if (this.cells[i][j]) {
            this.cells[i][j].cmd = [];
          }
        }
      }
    }
  }, {
    key: "exchangeCell",
    value: function exchangeCell(pos1, pos2) {
      var tmpModel = this.cells[pos1.y][pos1.x];
      this.cells[pos1.y][pos1.x] = this.cells[pos2.y][pos2.x];
      this.cells[pos1.y][pos1.x].x = pos1.x;
      this.cells[pos1.y][pos1.x].y = pos1.y;
      this.cells[pos2.y][pos2.x] = tmpModel;
      this.cells[pos2.y][pos2.x].x = pos2.x;
      this.cells[pos2.y][pos2.x].y = pos2.y;
    } // 设置种类
    // Todo 改成乱序算法

  }, {
    key: "setCellTypeNum",
    value: function setCellTypeNum(num) {
      console.log("num = ", num);
      this.cellTypeNum = num;
      this.cellCreateType = [];
      var createTypeList = this.cellCreateType;

      for (var i = 1; i <= _ConstValue.CELL_BASENUM; i++) {
        createTypeList.push(i);
      }

      for (var _i2 = 0; _i2 < createTypeList.length; _i2++) {
        var index = Math.floor(Math.random() * (_ConstValue.CELL_BASENUM - _i2)) + _i2;

        createTypeList[_i2], createTypeList[index] = createTypeList[index], createTypeList[_i2];
      }
    } // 随要生成一个类型

  }, {
    key: "getRandomCellType",
    value: function getRandomCellType() {
      var index = Math.floor(Math.random() * this.cellTypeNum);
      return this.cellCreateType[index];
    } // TODO bombModels去重

  }, {
    key: "processBomb",
    value: function processBomb(bombModels, cycleCount) {
      var _this = this;

      var _loop = function _loop() {
        var newBombModel = [];
        var bombTime = _ConstValue.ANITIME.BOMB_DELAY;
        bombModels.forEach(function (model) {
          if (model.status == _ConstValue.CELL_STATUS.LINE) {
            for (var i = 1; i <= _ConstValue.GRID_WIDTH; i++) {
              if (this.cells[model.y][i]) {
                if (this.cells[model.y][i].status != _ConstValue.CELL_STATUS.COMMON) {
                  newBombModel.push(this.cells[model.y][i]);
                }

                this.crushCell(i, model.y, false, cycleCount);
              }
            }

            this.addRowBomb(this.curTime, cc.v2(model.x, model.y));
          } else if (model.status == _ConstValue.CELL_STATUS.COLUMN) {
            for (var _i3 = 1; _i3 <= _ConstValue.GRID_HEIGHT; _i3++) {
              if (this.cells[_i3][model.x]) {
                if (this.cells[_i3][model.x].status != _ConstValue.CELL_STATUS.COMMON) {
                  newBombModel.push(this.cells[_i3][model.x]);
                }

                this.crushCell(model.x, _i3, false, cycleCount);
              }
            }

            this.addColBomb(this.curTime, cc.v2(model.x, model.y));
          } else if (model.status == _ConstValue.CELL_STATUS.WRAP) {
            var x = model.x;
            var y = model.y;

            for (var _i4 = 1; _i4 <= _ConstValue.GRID_HEIGHT; _i4++) {
              for (var j = 1; j <= _ConstValue.GRID_WIDTH; j++) {
                var delta = Math.abs(x - j) + Math.abs(y - _i4);

                if (this.cells[_i4][j] && delta <= 2) {
                  if (this.cells[_i4][j].status != _ConstValue.CELL_STATUS.COMMON) {
                    newBombModel.push(this.cells[_i4][j]);
                  }

                  this.crushCell(j, _i4, false, cycleCount);
                }
              }
            }
          } else if (model.status == _ConstValue.CELL_STATUS.BIRD) {
            var crushType = model.type;

            if (bombTime < _ConstValue.ANITIME.BOMB_BIRD_DELAY) {
              bombTime = _ConstValue.ANITIME.BOMB_BIRD_DELAY;
            }

            if (crushType == _ConstValue.CELL_TYPE.BIRD) {
              crushType = this.getRandomCellType();
            }

            for (var _i5 = 1; _i5 <= _ConstValue.GRID_HEIGHT; _i5++) {
              for (var _j = 1; _j <= _ConstValue.GRID_WIDTH; _j++) {
                if (this.cells[_i5][_j] && this.cells[_i5][_j].type == crushType) {
                  if (this.cells[_i5][_j].status != _ConstValue.CELL_STATUS.COMMON) {
                    newBombModel.push(this.cells[_i5][_j]);
                  }

                  this.crushCell(_j, _i5, true, cycleCount);
                }
              }
            } //this.crushCell(model.x, model.y);

          }
        }, _this);

        if (bombModels.length > 0) {
          _this.curTime += bombTime;
        }

        bombModels = newBombModel;
      };

      while (bombModels.length > 0) {
        _loop();
      }
    }
    /**
     * 
     * @param {开始播放的时间} playTime 
     * @param {*cell位置} pos 
     * @param {*第几次消除，用于播放音效} step 
     */

  }, {
    key: "addCrushEffect",
    value: function addCrushEffect(playTime, pos, step) {
      this.effectsQueue.push({
        playTime: playTime,
        pos: pos,
        action: "crush",
        step: step
      });
    }
  }, {
    key: "addRowBomb",
    value: function addRowBomb(playTime, pos) {
      this.effectsQueue.push({
        playTime: playTime,
        pos: pos,
        action: "rowBomb"
      });
    }
  }, {
    key: "addColBomb",
    value: function addColBomb(playTime, pos) {
      this.effectsQueue.push({
        playTime: playTime,
        pos: pos,
        action: "colBomb"
      });
    }
  }, {
    key: "addWrapBomb",
    value: function addWrapBomb(playTime, pos) {} // TODO
    // cell消除逻辑

  }, {
    key: "crushCell",
    value: function crushCell(x, y, needShake, step) {
      var model = this.cells[y][x];
      this.pushToChangeModels(model);

      if (needShake) {
        model.toShake(this.curTime);
      }

      var shakeTime = needShake ? _ConstValue.ANITIME.DIE_SHAKE : 0;
      model.toDie(this.curTime + shakeTime);
      this.addCrushEffect(this.curTime + shakeTime, cc.v2(model.x, model.y), step);
      this.cells[y][x] = null;
    }
  }]);

  return GameModel;
}();

exports["default"] = GameModel;
module.exports = exports["default"];

cc._RF.pop();
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTW9kZWwvR2FtZU1vZGVsLmpzIl0sIm5hbWVzIjpbIkdhbWVNb2RlbCIsImNlbGxzIiwiY2VsbEJncyIsImxhc3RQb3MiLCJjYyIsInYyIiwiY2VsbFR5cGVOdW0iLCJjZWxsQ3JlYXRlVHlwZSIsInNldENlbGxUeXBlTnVtIiwiaSIsIkdSSURfV0lEVEgiLCJqIiwiR1JJRF9IRUlHSFQiLCJDZWxsTW9kZWwiLCJmbGFnIiwiaW5pdCIsImdldFJhbmRvbUNlbGxUeXBlIiwicmVzdWx0IiwiY2hlY2tQb2ludCIsImxlbmd0aCIsInNldFhZIiwic2V0U3RhcnRYWSIsImRhdGEiLCJ4IiwieSIsImNoZWNrV2l0aERpcmVjdGlvbiIsImRpcmVjdGlvbiIsInF1ZXVlIiwidmlzIiwicHVzaCIsImZyb250IiwicG9pbnQiLCJjZWxsTW9kZWwiLCJ0bXBYIiwidG1wWSIsInR5cGUiLCJyb3dSZXN1bHQiLCJjYWxsIiwiY29sUmVzdWx0IiwibmV3Q2VsbFN0YXR1cyIsIkNFTExfU1RBVFVTIiwiQklSRCIsIldSQVAiLCJMSU5FIiwiQ09MVU1OIiwidG1wIiwiY29uY2F0IiwiZm9yRWFjaCIsIm5ld0VsZSIsIm9sZEVsZSIsInByaW50U3RyIiwiY29uc29sZSIsImxvZyIsInBvcyIsImNoYW5nZU1vZGVscyIsImVmZmVjdHNRdWV1ZSIsImRlbHRhIiwiTWF0aCIsImFicyIsImN1ckNsaWNrQ2VsbCIsImxhc3RDbGlja0NlbGwiLCJleGNoYW5nZUNlbGwiLCJyZXN1bHQxIiwicmVzdWx0MiIsImN1clRpbWUiLCJwdXNoVG9DaGFuZ2VNb2RlbHMiLCJpc0NhbkJvbWIiLCJzdGF0dXMiLCJDT01NT04iLCJtb3ZlVG9BbmRCYWNrIiwibW92ZVRvIiwiQU5JVElNRSIsIlRPVUNIX01PVkUiLCJwcm9jZXNzQ3J1c2giLCJjeWNsZUNvdW50IiwiYm9tYk1vZGVscyIsInBvczEiLCJwb3MyIiwibW9kZWwxIiwibW9kZWwyIiwiYm9tYk1vZGVsIiwibmV3Q2VsbFR5cGUiLCJtb2RlbCIsImNydXNoQ2VsbCIsImNyZWF0ZU5ld0NlbGwiLCJwcm9jZXNzQm9tYiIsIkRJRSIsImRvd24iLCJDRUxMX1RZUEUiLCJzZXRTdGF0dXMiLCJzZXRWaXNpYmxlIiwibmV3Q2hlY2tQb2ludCIsImN1clJvdyIsImsiLCJjb3VudCIsImluZGV4T2YiLCJjbWQiLCJ0bXBNb2RlbCIsIm51bSIsImNyZWF0ZVR5cGVMaXN0IiwiQ0VMTF9CQVNFTlVNIiwiaW5kZXgiLCJmbG9vciIsInJhbmRvbSIsIm5ld0JvbWJNb2RlbCIsImJvbWJUaW1lIiwiQk9NQl9ERUxBWSIsImFkZFJvd0JvbWIiLCJhZGRDb2xCb21iIiwiY3J1c2hUeXBlIiwiQk9NQl9CSVJEX0RFTEFZIiwicGxheVRpbWUiLCJzdGVwIiwiYWN0aW9uIiwibmVlZFNoYWtlIiwidG9TaGFrZSIsInNoYWtlVGltZSIsIkRJRV9TSEFLRSIsInRvRGllIiwiYWRkQ3J1c2hFZmZlY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVxQkE7QUFDakIsdUJBQWM7QUFBQTs7QUFDVixTQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxJQUFmO0FBQ0EsU0FBS0MsT0FBTCxHQUFlQyxFQUFFLENBQUNDLEVBQUgsQ0FBTSxDQUFDLENBQVAsRUFBVSxDQUFDLENBQVgsQ0FBZjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsQ0FBbkI7QUFDQSxTQUFLQyxjQUFMLEdBQXNCLEVBQXRCLENBTFUsQ0FLZ0I7QUFDN0I7Ozs7eUJBRUlELGFBQWE7QUFDZCxXQUFLTCxLQUFMLEdBQWEsRUFBYjtBQUNBLFdBQUtPLGNBQUwsQ0FBb0JGLFdBQVcsSUFBSSxLQUFLQSxXQUF4Qzs7QUFDQSxXQUFLLElBQUlHLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLElBQUlDLHNCQUFyQixFQUFpQ0QsQ0FBQyxFQUFsQyxFQUFzQztBQUNsQyxhQUFLUixL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Sjs7Ozs4QkFDVTlCLEdBQUdDLEdBQUcwRixXQUFXRixNQUFNO0FBQzdCLFVBQUk5QixLQUFLLEdBQUcsS0FBS2pGLEtBQUwsQ0FBV3VCLENBQVgsRUFBY0QsQ0FBZCxDQUFaO0FBQ0EsV0FBSzBDLGtCQUFMLENBQXdCaUIsS0FBeEI7O0FBQ0EsVUFBSWdDLFNBQUosRUFBZTtBQUNYaEMsUUFBQUEsS0FBSyxDQUFDaUMsT0FBTixDQUFjLEtBQUtuRCxPQUFuQjtBQUNIOztBQUVELFVBQUlvRCxTQUFTLEdBQUdGLFNBQVMsR0FBRzNDLG9CQUFROEMsU0FBWCxHQUF1QixDQUFoRDtBQUNBbkMsTUFBQUEsS0FBSyxDQUFDb0MsS0FBTixDQUFZLEtBQUt0RCxPQUFMLEdBQWVvRCxTQUEzQjtBQUNBLFdBQUtHLGNBQUwsQ0FBb0IsS0FBS3ZELE9BQUwsR0FBZW9ELFNBQW5DLEVBQThDaEgsRUFBRSxDQUFDQyxFQUFILENBQU02RSxLQUFLLENBQUMzRCxDQUFaLEVBQWUyRCxLQUFLLENBQUMxRCxDQUFyQixDQUE5QyxFQUF1RXdGLElBQXZFO0FBQ0EsV0FBSy9HLEtBQUwsQ0FBV3VCLENBQVgsRUFBY0QsQ0FBZCxJQUFtQixJQUFuQjtBQUNIIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ2VsbE1vZGVsIGZyb20gXCIuL0NlbGxNb2RlbFwiO1xuaW1wb3J0IHsgQ0VMTF9UWVBFLCBDRUxMX0JBU0VOVU0sIENFTExfU1RBVFVTLCBHUklEX1dJRFRILCBHUklEX0hFSUdIVCwgQU5JVElNRSB9IGZyb20gXCIuL0NvbnN0VmFsdWVcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgR2FtZU1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5jZWxscyA9IG51bGw7XG4gICAgICAgIHRoaXMuY2VsbEJncyA9IG51bGw7XG4gICAgICAgIHRoaXMubGFzdFBvcyA9IGNjLnYyKC0xLCAtMSk7XG4gICAgICAgIHRoaXMuY2VsbFR5cGVOdW0gPSA1O1xuICAgICAgICB0aGlzLmNlbGxDcmVhdGVUeXBlID0gW107IC8vIOWNh+aIkOenjeexu+WPquWcqOi/meS4quaVsOe7hOmHjOmdouafpeaJvlxuICAgIH1cblxuICAgIGluaXQoY2VsbFR5cGVOdW0pIHtcbiAgICAgICAgdGhpcy5jZWxscyA9IFtdO1xuICAgICAgICB0aGlzLnNldENlbGxUeXBlTnVtKGNlbGxUeXBlTnVtIHx8IHRoaXMuY2VsbFR5cGVOdW0pO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBHUklEX1dJRFRIOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuY2VsbHNbaV0gPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDw9IEdSSURfSEVJR0hUOyBqKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW2pdID0gbmV3IENlbGxNb2RlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPD0gR1JJRF9XSURUSDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8PSBHUklEX0hFSUdIVDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHdoaWxlIChmbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZsYWcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtqXS5pbml0KHRoaXMuZ2V0UmFuZG9tQ2VsbFR5cGUoKSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0aGlzLmNoZWNrUG9pbnQoaiwgaSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmxhZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtqXS5zZXRYWShqLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tpXVtqXS5zZXRTdGFydFhZKGosIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaW5pdFdpdGhEYXRhKGRhdGEpIHtcbiAgICAgICAgLy8gdG8gZG9cbiAgICB9XG5cbiAgICBjaGVja1BvaW50KHgsIHkpIHtcbiAgICAgICAgbGV0IGNoZWNrV2l0aERpcmVjdGlvbiA9IGZ1bmN0aW9uICh4LCB5LCBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGxldCBxdWV1ZSA9IFtdO1xuICAgICAgICAgICAgbGV0IHZpcyA9IFtdO1xuICAgICAgICAgICAgdmlzW3ggKyB5ICogOV0gPSB0cnVlO1xuICAgICAgICAgICAgcXVldWUucHVzaChjYy52Mih4LCB5KSk7XG4gICAgICAgICAgICBsZXQgZnJvbnQgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGZyb250IDwgcXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgLy9sZXQgZGlyZWN0aW9uID0gW2NjLnYyKDAsIC0xKSwgY2MudjIoMCwgMSksIGNjLnYyKDEsIDApLCBjYy52MigtMSwgMCldO1xuICAgICAgICAgICAgICAgIGxldCBwb2ludCA9IHF1ZXVlW2Zyb250XTtcbiAgICAgICAgICAgICAgICBsZXQgY2VsbE1vZGVsID0gdGhpcy5jZWxsc1twb2ludC55XVtwb2ludC54XTtcbiAgICAgICAgICAgICAgICBmcm9udCsrO1xuICAgICAgICAgICAgICAgIGlmICghY2VsbE1vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpcmVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdG1wWCA9IHBvaW50LnggKyBkaXJlY3Rpb25baV0ueDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRtcFkgPSBwb2ludC55ICsgZGlyZWN0aW9uW2ldLnk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0bXBYIDwgMSB8fCB0bXBYID4gOVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgdG1wWSA8IDEgfHwgdG1wWSA+IDlcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IHZpc1t0bXBYICsgdG1wWSAqIDldXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCAhdGhpcy5jZWxsc1t0bXBZXVt0bXBYXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNlbGxNb2RlbC50eXBlID09IHRoaXMuY2VsbHNbdG1wWV1bdG1wWF0udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlzW3RtcFggKyB0bXBZICogOV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcXVldWUucHVzaChjYy52Mih0bXBYLCB0bXBZKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcXVldWU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJvd1Jlc3VsdCA9IGNoZWNrV2l0aERpcmVjdGlvbi5jYWxsKHRoaXMsIHgsIHksIFtjYy52MigxLCAwKSwgY2MudjIoLTEsIDApXSk7XG4gICAgICAgIGxldCBjb2xSZXN1bHQgPSBjaGVja1dpdGhEaXJlY3Rpb24uY2FsbCh0aGlzLCB4LCB5LCBbY2MudjIoMCwgLTEpLCBjYy52MigwLCAxKV0pO1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGxldCBuZXdDZWxsU3RhdHVzID0gXCJcIjtcbiAgICAgICAgaWYgKHJvd1Jlc3VsdC5sZW5ndGggPj0gNSB8fCBjb2xSZXN1bHQubGVuZ3RoID49IDUpIHtcbiAgICAgICAgICAgIG5ld0NlbGxTdGF0dXMgPSBDRUxMX1NUQVRVUy5CSVJEO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvd1Jlc3VsdC5sZW5ndGggPj0gMyAmJiBjb2xSZXN1bHQubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgIG5ld0NlbGxTdGF0dXMgPSBDRUxMX1NUQVRVUy5XUkFQO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJvd1Jlc3VsdC5sZW5ndGggPj0gNCkge1xuICAgICAgICAgICAgbmV3Q2VsbFN0YXR1cyA9IENFTExfU1RBVFVTLkxJTkU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY29sUmVzdWx0Lmxlbmd0aCA+PSA0KSB7XG4gICAgICAgICAgICBuZXdDZWxsU3RhdHVzID0gQ0VMTF9TVEFUVVMuQ09MVU1OO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb3dSZXN1bHQubGVuZ3RoID49IDMpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJvd1Jlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29sUmVzdWx0Lmxlbmd0aCA+PSAzKSB7XG4gICAgICAgICAgICBsZXQgdG1wID0gcmVzdWx0LmNvbmNhdCgpO1xuICAgICAgICAgICAgY29sUmVzdWx0LmZvckVhY2goZnVuY3Rpb24gKG5ld0VsZSkge1xuICAgICAgICAgICAgICAgIGxldCBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdG1wLmZvckVhY2goZnVuY3Rpb24gKG9sZEVsZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3RWxlLnggPT0gb2xkRWxlLnggJiYgbmV3RWxlLnkgPT0gb2xkRWxlLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKCFmbGFnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKG5ld0VsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtyZXN1bHQsIG5ld0NlbGxTdGF0dXMsIHRoaXMuY2VsbHNbeV1beF0udHlwZV07XG4gICAgfVxuXG4gICAgcHJpbnRJbmZvKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSA5OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwcmludFN0ciA9IFwiXCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8PSA5OyBqKyspIHtcbiAgICAgICAgICAgICAgICBwcmludFN0ciArPSB0aGlzLmNlbGxzW2ldW2pdLnR5cGUgKyBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHByaW50U3RyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENlbGxzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jZWxscztcbiAgICB9XG4gICAgLy8gY29udHJvbGxlcuiwg+eUqOeahOS4u+imgeWFpeWPo1xuICAgIC8vIOeCueWHu+afkOS4quagvOWtkFxuICAgIHNlbGVjdENlbGwocG9zKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlTW9kZWxzID0gW107Ly8g5Y+R55Sf5pS55Y+Y55qEbW9kZWzvvIzlsIbkvZzkuLrov5Tlm57lgLzvvIznu5l2aWV35pKt5Yqo5L2cXG4gICAgICAgIHRoaXMuZWZmZWN0c1F1ZXVlID0gW107IC8vIOWKqOeJqea2iOWkse+8jOeIhueCuOetieeJueaViFxuICAgICAgICB2YXIgbGFzdFBvcyA9IHRoaXMubGFzdFBvcztcbiAgICAgICAgdmFyIGRlbHRhID0gTWF0aC5hYnMocG9zLnggLSBsYXN0UG9zLngpICsgTWF0aC5hYnMocG9zLnkgLSBsYXN0UG9zLnkpO1xuICAgICAgICBpZiAoZGVsdGEgIT0gMSkgeyAvL+mdnuebuOmCu+agvOWtkO+8jCDnm7TmjqXov5Tlm55cbiAgICAgICAgICAgIHRoaXMubGFzdFBvcyA9IHBvcztcbiAgICAgICAgICAgIHJldHVybiBbW10sIFtdXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY3VyQ2xpY2tDZWxsID0gdGhpcy5jZWxsc1twb3MueV1bcG9zLnhdOyAvL+W9k+WJjeeCueWHu+eahOagvOWtkFxuICAgICAgICBsZXQgbGFzdENsaWNrQ2VsbCA9IHRoaXMuY2VsbHNbbGFzdFBvcy55XVtsYXN0UG9zLnhdOyAvLyDkuIrkuIDmrKHngrnlh7vnmoTmoLzlvI9cbiAgICAgICAgdGhpcy5leGNoYW5nZUNlbGwobGFzdFBvcywgcG9zKTtcbiAgICAgICAgdmFyIHJlc3VsdDEgPSB0aGlzLmNoZWNrUG9pbnQocG9zLngsIHBvcy55KVswXTtcbiAgICAgICAgdmFyIHJlc3VsdDIgPSB0aGlzLmNoZWNrUG9pbnQobGFzdFBvcy54LCBsYXN0UG9zLnkpWzBdO1xuICAgICAgICB0aGlzLmN1clRpbWUgPSAwOyAvLyDliqjnlLvmkq3mlL7nmoTlvZPliY3ml7bpl7RcbiAgICAgICAgdGhpcy5wdXNoVG9DaGFuZ2VNb2RlbHMoY3VyQ2xpY2tDZWxsKTtcbiAgICAgICAgdGhpcy5wdXNoVG9DaGFuZ2VNb2RlbHMobGFzdENsaWNrQ2VsbCk7XG4gICAgICAgIGxldCBpc0NhbkJvbWIgPSAoY3VyQ2xpY2tDZWxsLnN0YXR1cyAhPSBDRUxMX1NUQVRVUy5DT01NT04gJiYgLy8g5Yik5pat5Lik5Liq5piv5ZCm5piv54m55q6K55qE5Yqo54mpXG4gICAgICAgICAgICBsYXN0Q2xpY2tDZWxsLnN0YXR1cyAhPSBDRUxMX1NUQVRVUy5DT01NT04pIHx8XG4gICAgICAgICAgICBjdXJDbGlja0NlbGwuc3RhdHVzID09IENFTExfU1RBVFVTLkJJUkQgfHxcbiAgICAgICAgICAgIGxhc3RDbGlja0NlbGwuc3RhdHVzID09IENFTExfU1RBVFVTLkJJUkQ7XG4gICAgICAgIGlmIChyZXN1bHQxLmxlbmd0aCA8IDMgJiYgcmVzdWx0Mi5sZW5ndGggPCAzICYmICFpc0NhbkJvbWIpIHsvL+S4jeS8muWPkeeUn+a2iOmZpOeahOaDheWGtVxuICAgICAgICAgICAgdGhpcy5leGNoYW5nZUNlbGwobGFzdFBvcywgcG9zKTtcbiAgICAgICAgICAgIGN1ckNsaWNrQ2VsbC5tb3ZlVG9BbmRCYWNrKGxhc3RQb3MpO1xuICAgICAgICAgICAgbGFzdENsaWNrQ2VsbC5tb3ZlVG9BbmRCYWNrKHBvcyk7XG4gICAgICAgICAgICB0aGlzLmxhc3RQb3MgPSBjYy52MigtMSwgLTEpO1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmNoYW5nZU1vZGVsc107XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RQb3MgPSBjYy52MigtMSwgLTEpO1xuICAgICAgICAgICAgY3VyQ2xpY2tDZWxsLm1vdmVUbyhsYXN0UG9zLCB0aGlzLmN1clRpbWUpO1xuICAgICAgICAgICAgbGFzdENsaWNrQ2VsbC5tb3ZlVG8ocG9zLCB0aGlzLmN1clRpbWUpO1xuICAgICAgICAgICAgdmFyIGNoZWNrUG9pbnQgPSBbcG9zLCBsYXN0UG9zXTtcbiAgICAgICAgICAgIHRoaXMuY3VyVGltZSArPSBBTklUSU1FLlRPVUNIX01PVkU7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NDcnVzaChjaGVja1BvaW50KTtcbiAgICAgICAgICAgIHJldHVybiBbdGhpcy5jaGFuZ2VNb2RlbHMsIHRoaXMuZWZmZWN0c1F1ZXVlXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDmtojpmaRcbiAgICBwcm9jZXNzQ3J1c2goY2hlY2tQb2ludCkge1xuICAgICAgICBsZXQgY3ljbGVDb3VudCA9IDA7XG4gICAgICAgIHdoaWxlIChjaGVja1BvaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldCBib21iTW9kZWxzID0gW107XG4gICAgICAgICAgICBpZiAoY3ljbGVDb3VudCA9PSAwICYmIGNoZWNrUG9pbnQubGVuZ3RoID09IDIpIHsgLy/nibnmrormtojpmaRcbiAgICAgICAgICAgICAgICBsZXQgcG9zMSA9IGNoZWNrUG9pbnRbMF07XG4gICAgICAgICAgICAgICAgbGV0IHBvczIgPSBjaGVja1BvaW50WzFdO1xuICAgICAgICAgICAgICAgIGxldCBtb2RlbDEgPSB0aGlzLmNlbGxzW3BvczEueV1bcG9zMS54XTtcbiAgICAgICAgICAgICAgICBsZXQgbW9kZWwyID0gdGhpcy5jZWxsc1twb3MyLnldW3BvczIueF07XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsMS5zdGF0dXMgPT0gQ0VMTF9TVEFUVVMuQklSRCB8fCBtb2RlbDIuc3RhdHVzID09IENFTExfU1RBVFVTLkJJUkQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGJvbWJNb2RlbCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtb2RlbDEuc3RhdHVzID09IENFTExfU1RBVFVTLkJJUkQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsMS50eXBlID0gbW9kZWwyLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBib21iTW9kZWxzLnB1c2gobW9kZWwxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGVsMi50eXBlID0gbW9kZWwxLnR5cGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBib21iTW9kZWxzLnB1c2gobW9kZWwyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjaGVja1BvaW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IGNoZWNrUG9pbnRbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNlbGxzW3Bvcy55XVtwb3MueF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBbcmVzdWx0LCBuZXdDZWxsU3RhdHVzLCBuZXdDZWxsVHlwZV0gPSB0aGlzLmNoZWNrUG9pbnQocG9zLngsIHBvcy55KTtcblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQubGVuZ3RoIDwgMykge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiByZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vZGVsID0gdGhpcy5jZWxsc1tyZXN1bHRbal0ueV1bcmVzdWx0W2pdLnhdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNydXNoQ2VsbChyZXN1bHRbal0ueCwgcmVzdWx0W2pdLnksIGZhbHNlLCBjeWNsZUNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vZGVsLnN0YXR1cyAhPSBDRUxMX1NUQVRVUy5DT01NT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvbWJNb2RlbHMucHVzaChtb2RlbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVOZXdDZWxsKHBvcywgbmV3Q2VsbFN0YXR1cywgbmV3Q2VsbFR5cGUpO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NCb21iKGJvbWJNb2RlbHMsIGN5Y2xlQ291bnQpO1xuICAgICAgICAgICAgdGhpcy5jdXJUaW1lICs9IEFOSVRJTUUuRElFO1xuICAgICAgICAgICAgY2hlY2tQb2ludCA9IHRoaXMuZG93bigpO1xuICAgICAgICAgICAgY3ljbGVDb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/nlJ/miJDmlrBjZWxsXG4gICAgY3JlYXRlTmV3Q2VsbChwb3MsIHN0YXR1cywgdHlwZSkge1xuICAgICAgICBpZiAoc3RhdHVzID09IFwiXCIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhdHVzID09IENFTExfU1RBVFVTLkJJUkQpIHtcbiAgICAgICAgICAgIHR5cGUgPSBDRUxMX1RZUEUuQklSRFxuICAgICAgICB9XG4gICAgICAgIGxldCBtb2RlbCA9IG5ldyBDZWxsTW9kZWwoKTtcbiAgICAgICAgdGhpcy5jZWxsc1twb3MueV1bcG9zLnhdID0gbW9kZWxcbiAgICAgICAgbW9kZWwuaW5pdCh0eXBlKTtcbiAgICAgICAgbW9kZWwuc2V0U3RhcnRYWShwb3MueCwgcG9zLnkpO1xuICAgICAgICBtb2RlbC5zZXRYWShwb3MueCwgcG9zLnkpO1xuICAgICAgICBtb2RlbC5zZXRTdGF0dXMoc3RhdHVzKTtcbiAgICAgICAgbW9kZWwuc2V0VmlzaWJsZSgwLCBmYWxzZSk7XG4gICAgICAgIG1vZGVsLnNldFZpc2libGUodGhpcy5jdXJUaW1lLCB0cnVlKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VNb2RlbHMucHVzaChtb2RlbCk7XG4gICAgfVxuICAgIC8vIOS4i+iQvVxuICAgIGRvd24oKSB7XG4gICAgICAgIGxldCBuZXdDaGVja1BvaW50ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IEdSSURfV0lEVEg7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPD0gR1JJRF9IRUlHSFQ7IGorKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW2pdID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1clJvdyA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSBjdXJSb3c7IGsgPD0gR1JJRF9IRUlHSFQ7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2VsbHNba11bal0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnB1c2hUb0NoYW5nZU1vZGVscyh0aGlzLmNlbGxzW2tdW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdDaGVja1BvaW50LnB1c2godGhpcy5jZWxsc1trXVtqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1tjdXJSb3ddW2pdID0gdGhpcy5jZWxsc1trXVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2tdW2pdID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2N1clJvd11bal0uc2V0WFkoaiwgY3VyUm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2N1clJvd11bal0ubW92ZVRvKGNjLnYyKGosIGN1clJvdyksIHRoaXMuY3VyVGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyUm93Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IGN1clJvdzsgayA8PSBHUklEX0hFSUdIVDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2tdW2pdID0gbmV3IENlbGxNb2RlbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1trXVtqXS5pbml0KHRoaXMuZ2V0UmFuZG9tQ2VsbFR5cGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2tdW2pdLnNldFN0YXJ0WFkoaiwgY291bnQgKyBHUklEX0hFSUdIVCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2tdW2pdLnNldFhZKGosIGNvdW50ICsgR1JJRF9IRUlHSFQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZWxsc1trXVtqXS5tb3ZlVG8oY2MudjIoaiwgayksIHRoaXMuY3VyVGltZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VNb2RlbHMucHVzaCh0aGlzLmNlbGxzW2tdW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0NoZWNrUG9pbnQucHVzaCh0aGlzLmNlbGxzW2tdW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3VyVGltZSArPSBBTklUSU1FLlRPVUNIX01PVkUgKyAwLjNcbiAgICAgICAgcmV0dXJuIG5ld0NoZWNrUG9pbnQ7XG4gICAgfVxuXG4gICAgcHVzaFRvQ2hhbmdlTW9kZWxzKG1vZGVsKSB7XG4gICAgICAgIGlmICh0aGlzLmNoYW5nZU1vZGVscy5pbmRleE9mKG1vZGVsKSAhPSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlTW9kZWxzLnB1c2gobW9kZWwpO1xuICAgIH1cblxuICAgIGNsZWFuQ21kKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSBHUklEX1dJRFRIOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDw9IEdSSURfSEVJR0hUOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtqXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNlbGxzW2ldW2pdLmNtZCA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4Y2hhbmdlQ2VsbChwb3MxLCBwb3MyKSB7XG4gICAgICAgIHZhciB0bXBNb2RlbCA9IHRoaXMuY2VsbHNbcG9zMS55XVtwb3MxLnhdO1xuICAgICAgICB0aGlzLmNlbGxzW3BvczEueV1bcG9zMS54XSA9IHRoaXMuY2VsbHNbcG9zMi55XVtwb3MyLnhdO1xuICAgICAgICB0aGlzLmNlbGxzW3BvczEueV1bcG9zMS54XS54ID0gcG9zMS54O1xuICAgICAgICB0aGlzLmNlbGxzW3BvczEueV1bcG9zMS54XS55ID0gcG9zMS55O1xuICAgICAgICB0aGlzLmNlbGxzW3BvczIueV1bcG9zMi54XSA9IHRtcE1vZGVsO1xuICAgICAgICB0aGlzLmNlbGxzW3BvczIueV1bcG9zMi54XS54ID0gcG9zMi54O1xuICAgICAgICB0aGlzLmNlbGxzW3BvczIueV1bcG9zMi54XS55ID0gcG9zMi55O1xuICAgIH1cbiAgICAvLyDorr7nva7np43nsbtcbiAgICAvLyBUb2RvIOaUueaIkOS5seW6j+eul+azlVxuICAgIHNldENlbGxUeXBlTnVtKG51bSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIm51bSA9IFwiLCBudW0pO1xuICAgICAgICB0aGlzLmNlbGxUeXBlTnVtID0gbnVtO1xuICAgICAgICB0aGlzLmNlbGxDcmVhdGVUeXBlID0gW107XG4gICAgICAgIGxldCBjcmVhdGVUeXBlTGlzdCA9IHRoaXMuY2VsbENyZWF0ZVR5cGU7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IENFTExfQkFTRU5VTTsgaSsrKSB7XG4gICAgICAgICAgICBjcmVhdGVUeXBlTGlzdC5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3JlYXRlVHlwZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChDRUxMX0JBU0VOVU0gLSBpKSkgKyBpO1xuICAgICAgICAgICAgY3JlYXRlVHlwZUxpc3RbaV0sIGNyZWF0ZVR5cGVMaXN0W2luZGV4XSA9IGNyZWF0ZVR5cGVMaXN0W2luZGV4XSwgY3JlYXRlVHlwZUxpc3RbaV1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyDpmo/opoHnlJ/miJDkuIDkuKrnsbvlnotcbiAgICBnZXRSYW5kb21DZWxsVHlwZSgpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jZWxsVHlwZU51bSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNlbGxDcmVhdGVUeXBlW2luZGV4XTtcbiAgICB9XG4gICAgLy8gVE9ETyBib21iTW9kZWxz5Y676YeNXG4gICAgcHJvY2Vzc0JvbWIoYm9tYk1vZGVscywgY3ljbGVDb3VudCkge1xuICAgICAgICB3aGlsZSAoYm9tYk1vZGVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbmV3Qm9tYk1vZGVsID0gW107XG4gICAgICAgICAgICBsZXQgYm9tYlRpbWUgPSBBTklUSU1FLkJPTUJfREVMQVk7XG4gICAgICAgICAgICBib21iTW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1vZGVsLnN0YXR1cyA9PSBDRUxMX1NUQVRVUy5MSU5FKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IEdSSURfV0lEVEg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2VsbHNbbW9kZWwueV1baV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jZWxsc1ttb2RlbC55XVtpXS5zdGF0dXMgIT0gQ0VMTF9TVEFUVVMuQ09NTU9OKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0JvbWJNb2RlbC5wdXNoKHRoaXMuY2VsbHNbbW9kZWwueV1baV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNydXNoQ2VsbChpLCBtb2RlbC55LCBmYWxzZSwgY3ljbGVDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSb3dCb21iKHRoaXMuY3VyVGltZSwgY2MudjIobW9kZWwueCwgbW9kZWwueSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtb2RlbC5zdGF0dXMgPT0gQ0VMTF9TVEFUVVMuQ09MVU1OKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IEdSSURfSEVJR0hUOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW21vZGVsLnhdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bbW9kZWwueF0uc3RhdHVzICE9IENFTExfU1RBVFVTLkNPTU1PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdCb21iTW9kZWwucHVzaCh0aGlzLmNlbGxzW2ldW21vZGVsLnhdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcnVzaENlbGwobW9kZWwueCwgaSwgZmFsc2UsIGN5Y2xlQ291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ29sQm9tYih0aGlzLmN1clRpbWUsIGNjLnYyKG1vZGVsLngsIG1vZGVsLnkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobW9kZWwuc3RhdHVzID09IENFTExfU1RBVFVTLldSQVApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBtb2RlbC54O1xuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IG1vZGVsLnk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IEdSSURfSEVJR0hUOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IEdSSURfV0lEVEg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkZWx0YSA9IE1hdGguYWJzKHggLSBqKSArIE1hdGguYWJzKHkgLSBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jZWxsc1tpXVtqXSAmJiBkZWx0YSA8PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW2pdLnN0YXR1cyAhPSBDRUxMX1NUQVRVUy5DT01NT04pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld0JvbWJNb2RlbC5wdXNoKHRoaXMuY2VsbHNbaV1bal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3J1c2hDZWxsKGosIGksIGZhbHNlLCBjeWNsZUNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobW9kZWwuc3RhdHVzID09IENFTExfU1RBVFVTLkJJUkQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNydXNoVHlwZSA9IG1vZGVsLnR5cGVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvbWJUaW1lIDwgQU5JVElNRS5CT01CX0JJUkRfREVMQVkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvbWJUaW1lID0gQU5JVElNRS5CT01CX0JJUkRfREVMQVk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNydXNoVHlwZSA9PSBDRUxMX1RZUEUuQklSRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3J1c2hUeXBlID0gdGhpcy5nZXRSYW5kb21DZWxsVHlwZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IEdSSURfSEVJR0hUOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDw9IEdSSURfV0lEVEg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNlbGxzW2ldW2pdICYmIHRoaXMuY2VsbHNbaV1bal0udHlwZSA9PSBjcnVzaFR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2VsbHNbaV1bal0uc3RhdHVzICE9IENFTExfU1RBVFVTLkNPTU1PTikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Qm9tYk1vZGVsLnB1c2godGhpcy5jZWxsc1tpXVtqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jcnVzaENlbGwoaiwgaSwgdHJ1ZSwgY3ljbGVDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jcnVzaENlbGwobW9kZWwueCwgbW9kZWwueSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgICAgICBpZiAoYm9tYk1vZGVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJUaW1lICs9IGJvbWJUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9tYk1vZGVscyA9IG5ld0JvbWJNb2RlbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge+W8gOWni+aSreaUvueahOaXtumXtH0gcGxheVRpbWUgXG4gICAgICogQHBhcmFtIHsqY2VsbOS9jee9rn0gcG9zIFxuICAgICAqIEBwYXJhbSB7KuesrOWHoOasoea2iOmZpO+8jOeUqOS6juaSreaUvumfs+aViH0gc3RlcCBcbiAgICAgKi9cbiAgICBhZGRDcnVzaEVmZmVjdChwbGF5VGltZSwgcG9zLCBzdGVwKSB7XG4gICAgICAgIHRoaXMuZWZmZWN0c1F1ZXVlLnB1c2goe1xuICAgICAgICAgICAgcGxheVRpbWUsXG4gICAgICAgICAgICBwb3MsXG4gICAgICAgICAgICBhY3Rpb246IFwiY3J1c2hcIixcbiAgICAgICAgICAgIHN0ZXBcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUm93Qm9tYihwbGF5VGltZSwgcG9zKSB7XG4gICAgICAgIHRoaXMuZWZmZWN0c1F1ZXVlLnB1c2goe1xuICAgICAgICAgICAgcGxheVRpbWUsXG4gICAgICAgICAgICBwb3MsXG4gICAgICAgICAgICBhY3Rpb246IFwicm93Qm9tYlwiXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZENvbEJvbWIocGxheVRpbWUsIHBvcykge1xuICAgICAgICB0aGlzLmVmZmVjdHNRdWV1ZS5wdXNoKHtcbiAgICAgICAgICAgIHBsYXlUaW1lLFxuICAgICAgICAgICAgcG9zLFxuICAgICAgICAgICAgYWN0aW9uOiBcImNvbEJvbWJcIlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRXcmFwQm9tYihwbGF5VGltZSwgcG9zKSB7XG4gICAgICAgIC8vIFRPRE9cbiAgICB9XG4gICAgLy8gY2VsbOa2iOmZpOmAu+i+kVxuICAgIGNydXNoQ2VsbCh4LCB5LCBuZWVkU2hha2UsIHN0ZXApIHtcbiAgICAgICAgbGV0IG1vZGVsID0gdGhpcy5jZWxsc1t5XVt4XTtcbiAgICAgICAgdGhpcy5wdXNoVG9DaGFuZ2VNb2RlbHMobW9kZWwpO1xuICAgICAgICBpZiAobmVlZFNoYWtlKSB7XG4gICAgICAgICAgICBtb2RlbC50b1NoYWtlKHRoaXMuY3VyVGltZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzaGFrZVRpbWUgPSBuZWVkU2hha2UgPyBBTklUSU1FLkRJRV9TSEFLRSA6IDA7XG4gICAgICAgIG1vZGVsLnRvRGllKHRoaXMuY3VyVGltZSArIHNoYWtlVGltZSk7XG4gICAgICAgIHRoaXMuYWRkQ3J1c2hFZmZlY3QodGhpcy5jdXJUaW1lICsgc2hha2VUaW1lLCBjYy52Mihtb2RlbC54LCBtb2RlbC55KSwgc3RlcCk7XG4gICAgICAgIHRoaXMuY2VsbHNbeV1beF0gPSBudWxsO1xuICAgIH1cblxufVxuXG4iXX0=