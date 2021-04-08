"use strict";
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