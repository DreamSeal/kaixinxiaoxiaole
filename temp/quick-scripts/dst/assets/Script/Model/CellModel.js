
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Model/CellModel.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'dae88GCevBMaK7lQqhume8G', 'CellModel');
// Script/Model/CellModel.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ConstValue = require("./ConstValue");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CellModel = /*#__PURE__*/function () {
  function CellModel() {
    _classCallCheck(this, CellModel);

    this.type = null;
    this.status = _ConstValue.CELL_STATUS.COMMON;
    this.x = 1;
    this.y = 1;
    this.startX = 1;
    this.startY = 1;
    this.cmd = [];
    this.isDeath = false;
    this.objecCount = Math.floor(Math.random() * 1000);
  }

  _createClass(CellModel, [{
    key: "init",
    value: function init(type) {
      this.type = type;
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.type == _ConstValue.CELL_TYPE.EMPTY;
    }
  }, {
    key: "setEmpty",
    value: function setEmpty() {
      this.type = _ConstValue.CELL_TYPE.EMPTY;
    }
  }, {
    key: "setXY",
    value: function setXY(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "setStartXY",
    value: function setStartXY(x, y) {
      this.startX = x;
      this.startY = y;
    }
  }, {
    key: "setStatus",
    value: function setStatus(status) {
      this.status = status;
    }
  }, {
    key: "moveToAndBack",
    value: function moveToAndBack(pos) {
      var srcPos = cc.v2(this.x, this.y);
      this.cmd.push({
        action: "moveTo",
        keepTime: _ConstValue.ANITIME.TOUCH_MOVE,
        playTime: 0,
        pos: pos
      });
      this.cmd.push({
        action: "moveTo",
        keepTime: _ConstValue.ANITIME.TOUCH_MOVE,
        playTime: _ConstValue.ANITIME.TOUCH_MOVE,
        pos: srcPos
      });
    }
  }, {
    key: "moveTo",
    value: function moveTo(pos, playTime) {
      var srcPos = cc.v2(this.x, this.y);
      this.cmd.push({
        action: "moveTo",
        keepTime: _ConstValue.ANITIME.TOUCH_MOVE,
        playTime: playTime,
        pos: pos
      });
      this.x = pos.x;
      this.y = pos.y;
    }
  }, {
    key: "toDie",
    value: function toDie(playTime) {
      this.cmd.push({
        action: "toDie",
        playTime: playTime,
        keepTime: _ConstValue.ANITIME.DIE
      });
      this.isDeath = true;
    }
  }, {
    key: "toShake",
    value: function toShake(playTime) {
      this.cmd.push({
        action: "toShake",
        playTime: playTime,
        keepTime: _ConstValue.ANITIME.DIE_SHAKE
      });
    }
  }, {
    key: "setVisible",
    value: function setVisible(playTime, isVisible) {
      this.cmd.push({
        action: "setVisible",
        playTime: playTime,
        keepTime: 0,
        isVisible: isVisible
      });
    }
  }, {
    key: "moveToAndDie",
    value: function moveToAndDie(pos) {}
  }, {
    key: "isBird",
    value: function isBird() {
      return this.type == _ConstValue.CELL_TYPE.G;
    }
  }]);

  return CellModel;
}();

exports["default"] = CellModel;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTW9kZWwvQ2VsbE1vZGVsLmpzIl0sIm5hbWVzIjpbIkNlbGxNb2RlbCIsInR5cGUiLCJzdGF0dXMiLCJDRUxMX1NUQVRVUyIsIkNPTU1PTiIsIngiLCJ5Iiwic3RhcnRYIiwic3RhcnRZIiwiY21kIiwiaXNEZWF0aCIsIm9iamVjQ291bnQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJDRUxMX1RZUEUiLCJFTVBUWSIsInBvcyIsInNyY1BvcyIsImNjIiwidjIiLCJwdXNoIiwiYWN0aW9uIiwia2VlcFRpbWUiLCJBTklUSU1FIiwiVE9VQ0hfTU9WRSIsInBsYXlUaW1lIiwiRElFIiwiRElFX1NIQUtFIiwiaXNWaXNpYmxlIiwiRyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7OztJQUNxQkE7QUFDakIsdUJBQWM7QUFBQTs7QUFDVixTQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFNBQUtDLE1BQUwsR0FBY0Msd0JBQVlDLE1BQTFCO0FBQ0EsU0FBS0MsQ0FBTCxHQUFTLENBQVQ7QUFDQSxTQUFLQyxDQUFMLEdBQVMsQ0FBVDtBQUNBLFNBQUtDLE1BQUwsR0FBYyxDQUFkO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLENBQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFmO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkMsSUFBSSxDQUFDQyxLQUFMLENBQVdELElBQUksQ0FBQ0UsTUFBTCxLQUFnQixJQUEzQixDQUFsQjtBQUNIOzs7O3lCQUVJYixNQUFNO0FBQ1AsV0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBQ0g7Ozs4QkFFUztBQUNOLGFBQU8sS0FBS0EsSUFBTCxJQUFhYyxzQkFBVUMsS0FBOUI7QUFDSDs7OytCQUVVO0FBQ1AsV0FBS2YsSUFBTCxHQUFZYyxzQkFBVUMsS0FBdEI7QUFDSDs7OzBCQUNLWCxHQUFHQyxHQUFHO0FBQ1IsV0FBS0QsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsV0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0g7OzsrQkFFVUQsR0FBR0MsR0FBRztBQUNiLFdBQUtDLE1BQUwsR0FBY0YsQ0FBZDtBQUNBLFdBQUtHLE1BQUwsR0FBY0YsQ0FBZDtBQUNIOzs7OEJBRVNKLFFBQVE7QUFDZCxXQUFLQSxNQUFMLEdBQWNBLE1BQWQ7QUFDSDs7O2tDQUVhZSxLQUFLO0FBQ2YsVUFBSUMsTUFBTSxHQUFHQyxFQUFFLENBQUNDLEVBQUgsQ0FBTSxLQUFLZixDQUFYLEVBQWMsS0FBS0MsQ0FBbkIsQ0FBYjtBQUNBLFdBQUtHLEdBQUwsQ0FBU1ksSUFBVCxDQUFjO0FBQ1ZDLFFBQUFBLE1BQU0sRUFBRSxRQURFO0FBRVZDLFFBQUFBLFFBQVEsRUFBRUMsb0JBQVFDLFVBRlI7QUFHVkMsUUFBQUEsUUFBUSxFQUFFLENBSEE7QUFJVlQsUUFBQUEsR0FBRyxFQUFFQTtBQUpLLE9BQWQ7QUFNQSxXQUFLUixHQUFMLENBQVNZLElBQVQsQ0FBYztBQUNWQyxRQUFBQSxNQUFNLEVBQUUsUUFERTtBQUVWQyxRQUFBQSxRQUFRLEVBQUVDLG9CQUFRQyxVQUZSO0FBR1ZDLFFBQUFBLFFBQVEsRUFBRUYsb0JBQVFDLFVBSFI7QUFJVlIsUUFBQUEsR0FBRyxFQUFFQztBQUpLLE9BQWQ7QUFNSDs7OzJCQUVNRCxLQUFLUyxVQUFVO0FBQ2xCLFVBQUlSLE1BQU0sR0FBR0MsRUFBRSxDQUFDQyxFQUFILENBQU0sS0FBS2YsQ0FBWCxFQUFjLEtBQUtDLENBQW5CLENBQWI7QUFDQSxXQUFLRyxHQUFMLENBQVNZLElBQVQsQ0FBYztBQUNWQyxRQUFBQSxNQUFNLEVBQUUsUUFERTtBQUVWQyxRQUFBQSxRQUFRLEVBQUVDLG9CQUFRQyxVQUZSO0FBR1ZDLFFBQUFBLFFBQVEsRUFBRUEsUUFIQTtBQUlWVCxRQUFBQSxHQUFHLEVBQUVBO0FBSkssT0FBZDtBQU1BLFdBQUtaLENBQUwsR0FBU1ksR0FBRyxDQUFDWixDQUFiO0FBQ0EsV0FBS0MsQ0FBTCxHQUFTVyxHQUFHLENBQUNYLENBQWI7QUFDSDs7OzBCQUVLb0IsVUFBVTtBQUNaLFdBQUtqQixHQUFMLENBQVNZLElBQVQsQ0FBYztBQUNWQyxRQUFBQSxNQUFNLEVBQUUsT0FERTtBQUVWSSxRQUFBQSxRQUFRLEVBQUVBLFFBRkE7QUFHVkgsUUFBQUEsUUFBUSxFQUFFQyxvQkFBUUc7QUFIUixPQUFkO0FBS0EsV0FBS2pCLE9BQUwsR0FBZSxJQUFmO0FBQ0g7Ozs0QkFFT2dCLFVBQVU7QUFDZCxXQUFLakIsR0FBTCxDQUFTWSxJQUFULENBQWM7QUFDVkMsUUFBQUEsTUFBTSxFQUFFLFNBREU7QUFFVkksUUFBQUEsUUFBUSxFQUFFQSxRQUZBO0FBR1ZILFFBQUFBLFFBQVEsRUFBRUMsb0JBQVFJO0FBSFIsT0FBZDtBQUtIOzs7K0JBRVVGLFVBQVVHLFdBQVc7QUFDNUIsV0FBS3BCLEdBQUwsQ0FBU1ksSUFBVCxDQUFjO0FBQ1ZDLFFBQUFBLE1BQU0sRUFBRSxZQURFO0FBRVZJLFFBQUFBLFFBQVEsRUFBRUEsUUFGQTtBQUdWSCxRQUFBQSxRQUFRLEVBQUUsQ0FIQTtBQUlWTSxRQUFBQSxTQUFTLEVBQUVBO0FBSkQsT0FBZDtBQU1IOzs7aUNBRVlaLEtBQUssQ0FFakI7Ozs2QkFFUTtBQUNMLGFBQU8sS0FBS2hCLElBQUwsSUFBYWMsc0JBQVVlLENBQTlCO0FBQ0giLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENFTExfVFlQRSwgQU5JVElNRSwgQ0VMTF9TVEFUVVMsIEdSSURfSEVJR0hUIH0gZnJvbSBcIi4vQ29uc3RWYWx1ZVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2VsbE1vZGVsIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy50eXBlID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdGF0dXMgPSBDRUxMX1NUQVRVUy5DT01NT047XG4gICAgICAgIHRoaXMueCA9IDE7XG4gICAgICAgIHRoaXMueSA9IDE7XG4gICAgICAgIHRoaXMuc3RhcnRYID0gMTtcbiAgICAgICAgdGhpcy5zdGFydFkgPSAxO1xuICAgICAgICB0aGlzLmNtZCA9IFtdO1xuICAgICAgICB0aGlzLmlzRGVhdGggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vYmplY0NvdW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCk7XG4gICAgfVxuXG4gICAgaW5pdCh0eXBlKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgaXNFbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PSBDRUxMX1RZUEUuRU1QVFk7XG4gICAgfVxuXG4gICAgc2V0RW1wdHkoKSB7XG4gICAgICAgIHRoaXMudHlwZSA9IENFTExfVFlQRS5FTVBUWTtcbiAgICB9XG4gICAgc2V0WFkoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cblxuICAgIHNldFN0YXJ0WFkoeCwgeSkge1xuICAgICAgICB0aGlzLnN0YXJ0WCA9IHg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0geTtcbiAgICB9XG5cbiAgICBzZXRTdGF0dXMoc3RhdHVzKSB7XG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIH1cblxuICAgIG1vdmVUb0FuZEJhY2socG9zKSB7XG4gICAgICAgIHZhciBzcmNQb3MgPSBjYy52Mih0aGlzLngsIHRoaXMueSk7XG4gICAgICAgIHRoaXMuY21kLnB1c2goe1xuICAgICAgICAgICAgYWN0aW9uOiBcIm1vdmVUb1wiLFxuICAgICAgICAgICAga2VlcFRpbWU6IEFOSVRJTUUuVE9VQ0hfTU9WRSxcbiAgICAgICAgICAgIHBsYXlUaW1lOiAwLFxuICAgICAgICAgICAgcG9zOiBwb3NcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY21kLnB1c2goe1xuICAgICAgICAgICAgYWN0aW9uOiBcIm1vdmVUb1wiLFxuICAgICAgICAgICAga2VlcFRpbWU6IEFOSVRJTUUuVE9VQ0hfTU9WRSxcbiAgICAgICAgICAgIHBsYXlUaW1lOiBBTklUSU1FLlRPVUNIX01PVkUsXG4gICAgICAgICAgICBwb3M6IHNyY1Bvc1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBtb3ZlVG8ocG9zLCBwbGF5VGltZSkge1xuICAgICAgICB2YXIgc3JjUG9zID0gY2MudjIodGhpcy54LCB0aGlzLnkpOyBcbiAgICAgICAgdGhpcy5jbWQucHVzaCh7XG4gICAgICAgICAgICBhY3Rpb246IFwibW92ZVRvXCIsXG4gICAgICAgICAgICBrZWVwVGltZTogQU5JVElNRS5UT1VDSF9NT1ZFLFxuICAgICAgICAgICAgcGxheVRpbWU6IHBsYXlUaW1lLFxuICAgICAgICAgICAgcG9zOiBwb3NcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMueCA9IHBvcy54O1xuICAgICAgICB0aGlzLnkgPSBwb3MueTtcbiAgICB9XG5cbiAgICB0b0RpZShwbGF5VGltZSkge1xuICAgICAgICB0aGlzLmNtZC5wdXNoKHtcbiAgICAgICAgICAgIGFjdGlvbjogXCJ0b0RpZVwiLFxuICAgICAgICAgICAgcGxheVRpbWU6IHBsYXlUaW1lLFxuICAgICAgICAgICAga2VlcFRpbWU6IEFOSVRJTUUuRElFXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmlzRGVhdGggPSB0cnVlO1xuICAgIH1cblxuICAgIHRvU2hha2UocGxheVRpbWUpIHtcbiAgICAgICAgdGhpcy5jbWQucHVzaCh7XG4gICAgICAgICAgICBhY3Rpb246IFwidG9TaGFrZVwiLFxuICAgICAgICAgICAgcGxheVRpbWU6IHBsYXlUaW1lLFxuICAgICAgICAgICAga2VlcFRpbWU6IEFOSVRJTUUuRElFX1NIQUtFXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFZpc2libGUocGxheVRpbWUsIGlzVmlzaWJsZSkge1xuICAgICAgICB0aGlzLmNtZC5wdXNoKHtcbiAgICAgICAgICAgIGFjdGlvbjogXCJzZXRWaXNpYmxlXCIsXG4gICAgICAgICAgICBwbGF5VGltZTogcGxheVRpbWUsXG4gICAgICAgICAgICBrZWVwVGltZTogMCxcbiAgICAgICAgICAgIGlzVmlzaWJsZTogaXNWaXNpYmxlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG1vdmVUb0FuZERpZShwb3MpIHtcblxuICAgIH1cblxuICAgIGlzQmlyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHlwZSA9PSBDRUxMX1RZUEUuRztcbiAgICB9XG5cbn1cbiJdfQ==