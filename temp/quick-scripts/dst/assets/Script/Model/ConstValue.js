
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Model/ConstValue.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'f9088esGbNBtJmNaJsz0Gq4', 'ConstValue');
// Script/Model/ConstValue.js

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ANITIME = exports.GRID_PIXEL_HEIGHT = exports.GRID_PIXEL_WIDTH = exports.CELL_HEIGHT = exports.CELL_WIDTH = exports.GRID_HEIGHT = exports.GRID_WIDTH = exports.CELL_STATUS = exports.CELL_BASENUM = exports.CELL_TYPE = void 0;
var CELL_TYPE = {
  EMPTY: 0,
  A: 1,
  B: 2,
  C: 3,
  D: 4,
  E: 5,
  F: 6,
  BIRD: 7
};
exports.CELL_TYPE = CELL_TYPE;
var CELL_BASENUM = 6;
exports.CELL_BASENUM = CELL_BASENUM;
var CELL_STATUS = {
  COMMON: 0,
  CLICK: "click",
  LINE: "line",
  COLUMN: "column",
  WRAP: "wrap",
  BIRD: "bird"
};
exports.CELL_STATUS = CELL_STATUS;
var GRID_WIDTH = 9;
exports.GRID_WIDTH = GRID_WIDTH;
var GRID_HEIGHT = 9;
exports.GRID_HEIGHT = GRID_HEIGHT;
var CELL_WIDTH = 70;
exports.CELL_WIDTH = CELL_WIDTH;
var CELL_HEIGHT = 70;
exports.CELL_HEIGHT = CELL_HEIGHT;
var GRID_PIXEL_WIDTH = GRID_WIDTH * CELL_WIDTH;
exports.GRID_PIXEL_WIDTH = GRID_PIXEL_WIDTH;
var GRID_PIXEL_HEIGHT = GRID_HEIGHT * CELL_HEIGHT; // ********************   时间表  animation time **************************

exports.GRID_PIXEL_HEIGHT = GRID_PIXEL_HEIGHT;
var ANITIME = {
  TOUCH_MOVE: 0.3,
  DIE: 0.2,
  DOWN: 0.5,
  BOMB_DELAY: 0.3,
  BOMB_BIRD_DELAY: 0.7,
  DIE_SHAKE: 0.4 // 死前抖动

};
exports.ANITIME = ANITIME;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvTW9kZWwvQ29uc3RWYWx1ZS5qcyJdLCJuYW1lcyI6WyJDRUxMX1RZUEUiLCJFTVBUWSIsIkEiLCJCIiwiQyIsIkQiLCJFIiwiRiIsIkJJUkQiLCJDRUxMX0JBU0VOVU0iLCJDRUxMX1NUQVRVUyIsIkNPTU1PTiIsIkNMSUNLIiwiTElORSIsIkNPTFVNTiIsIldSQVAiLCJHUklEX1dJRFRIIiwiR1JJRF9IRUlHSFQiLCJDRUxMX1dJRFRIIiwiQ0VMTF9IRUlHSFQiLCJHUklEX1BJWEVMX1dJRFRIIiwiR1JJRF9QSVhFTF9IRUlHSFQiLCJBTklUSU1FIiwiVE9VQ0hfTU9WRSIsIkRJRSIsIkRPV04iLCJCT01CX0RFTEFZIiwiQk9NQl9CSVJEX0RFTEFZIiwiRElFX1NIQUtFIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDTyxJQUFNQSxTQUFTLEdBQUc7QUFDckJDLEVBQUFBLEtBQUssRUFBRyxDQURhO0FBRXJCQyxFQUFBQSxDQUFDLEVBQUcsQ0FGaUI7QUFHckJDLEVBQUFBLENBQUMsRUFBRyxDQUhpQjtBQUlyQkMsRUFBQUEsQ0FBQyxFQUFHLENBSmlCO0FBS3JCQyxFQUFBQSxDQUFDLEVBQUcsQ0FMaUI7QUFNckJDLEVBQUFBLENBQUMsRUFBRyxDQU5pQjtBQU9yQkMsRUFBQUEsQ0FBQyxFQUFHLENBUGlCO0FBUXJCQyxFQUFBQSxJQUFJLEVBQUc7QUFSYyxDQUFsQjs7QUFVQSxJQUFNQyxZQUFZLEdBQUcsQ0FBckI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHO0FBQ3ZCQyxFQUFBQSxNQUFNLEVBQUUsQ0FEZTtBQUV2QkMsRUFBQUEsS0FBSyxFQUFFLE9BRmdCO0FBR3ZCQyxFQUFBQSxJQUFJLEVBQUUsTUFIaUI7QUFJdkJDLEVBQUFBLE1BQU0sRUFBRSxRQUplO0FBS3ZCQyxFQUFBQSxJQUFJLEVBQUUsTUFMaUI7QUFNdkJQLEVBQUFBLElBQUksRUFBRTtBQU5pQixDQUFwQjs7QUFTQSxJQUFNUSxVQUFVLEdBQUcsQ0FBbkI7O0FBQ0EsSUFBTUMsV0FBVyxHQUFHLENBQXBCOztBQUVBLElBQU1DLFVBQVUsR0FBRyxFQUFuQjs7QUFDQSxJQUFNQyxXQUFXLEdBQUcsRUFBcEI7O0FBRUEsSUFBTUMsZ0JBQWdCLEdBQUdKLFVBQVUsR0FBR0UsVUFBdEM7O0FBQ0EsSUFBTUcsaUJBQWlCLEdBQUdKLFdBQVcsR0FBR0UsV0FBeEMsRUFHUDs7O0FBQ08sSUFBTUcsT0FBTyxHQUFHO0FBQ25CQyxFQUFBQSxVQUFVLEVBQUUsR0FETztBQUVuQkMsRUFBQUEsR0FBRyxFQUFFLEdBRmM7QUFHbkJDLEVBQUFBLElBQUksRUFBRSxHQUhhO0FBSW5CQyxFQUFBQSxVQUFVLEVBQUUsR0FKTztBQUtuQkMsRUFBQUEsZUFBZSxFQUFFLEdBTEU7QUFNbkJDLEVBQUFBLFNBQVMsRUFBRSxHQU5RLENBTUo7O0FBTkksQ0FBaEIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbIlxuZXhwb3J0IGNvbnN0IENFTExfVFlQRSA9IHtcbiAgICBFTVBUWSA6IDAsXG4gICAgQSA6IDEsXG4gICAgQiA6IDIsXG4gICAgQyA6IDMsXG4gICAgRCA6IDQsXG4gICAgRSA6IDUsXG4gICAgRiA6IDYsXG4gICAgQklSRCA6IDdcbn1cbmV4cG9ydCBjb25zdCBDRUxMX0JBU0VOVU0gPSA2O1xuZXhwb3J0IGNvbnN0IENFTExfU1RBVFVTID0ge1xuICAgIENPTU1PTjogMCAsXG4gICAgQ0xJQ0s6IFwiY2xpY2tcIixcbiAgICBMSU5FOiBcImxpbmVcIixcbiAgICBDT0xVTU46IFwiY29sdW1uXCIsXG4gICAgV1JBUDogXCJ3cmFwXCIsXG4gICAgQklSRDogXCJiaXJkXCJcbn0gXG5cbmV4cG9ydCBjb25zdCBHUklEX1dJRFRIID0gOTtcbmV4cG9ydCBjb25zdCBHUklEX0hFSUdIVCA9IDk7XG5cbmV4cG9ydCBjb25zdCBDRUxMX1dJRFRIID0gNzA7XG5leHBvcnQgY29uc3QgQ0VMTF9IRUlHSFQgPSA3MDtcblxuZXhwb3J0IGNvbnN0IEdSSURfUElYRUxfV0lEVEggPSBHUklEX1dJRFRIICogQ0VMTF9XSURUSDtcbmV4cG9ydCBjb25zdCBHUklEX1BJWEVMX0hFSUdIVCA9IEdSSURfSEVJR0hUICogQ0VMTF9IRUlHSFQ7XG5cblxuLy8gKioqKioqKioqKioqKioqKioqKiogICDml7bpl7TooaggIGFuaW1hdGlvbiB0aW1lICoqKioqKioqKioqKioqKioqKioqKioqKioqXG5leHBvcnQgY29uc3QgQU5JVElNRSA9IHtcbiAgICBUT1VDSF9NT1ZFOiAwLjMsXG4gICAgRElFOiAwLjIsXG4gICAgRE9XTjogMC41LFxuICAgIEJPTUJfREVMQVk6IDAuMyxcbiAgICBCT01CX0JJUkRfREVMQVk6IDAuNyxcbiAgICBESUVfU0hBS0U6IDAuNCAvLyDmrbvliY3mipbliqhcbn1cblxuXG4iXX0=