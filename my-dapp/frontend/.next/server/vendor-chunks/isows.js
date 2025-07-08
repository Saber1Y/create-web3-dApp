"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/isows";
exports.ids = ["vendor-chunks/isows"];
exports.modules = {

/***/ "(ssr)/./node_modules/isows/_cjs/index.js":
/*!******************************************!*\
  !*** ./node_modules/isows/_cjs/index.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.WebSocket = void 0;\nconst WebSocket_ = __webpack_require__(/*! ws */ \"(ssr)/./node_modules/ws/index.js\");\nconst utils_js_1 = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/isows/_cjs/utils.js\");\nexports.WebSocket = (() => {\n    try {\n        return (0, utils_js_1.getNativeWebSocket)();\n    }\n    catch {\n        if (WebSocket_.WebSocket)\n            return WebSocket_.WebSocket;\n        return WebSocket_;\n    }\n})();\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXNvd3MvX2Nqcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIsbUJBQW1CLG1CQUFPLENBQUMsNENBQUk7QUFDL0IsbUJBQW1CLG1CQUFPLENBQUMsNERBQVk7QUFDdkMsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9pc293cy9fY2pzL2luZGV4LmpzPzQyMGEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldlYlNvY2tldCA9IHZvaWQgMDtcbmNvbnN0IFdlYlNvY2tldF8gPSByZXF1aXJlKFwid3NcIik7XG5jb25zdCB1dGlsc19qc18xID0gcmVxdWlyZShcIi4vdXRpbHMuanNcIik7XG5leHBvcnRzLldlYlNvY2tldCA9ICgoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuICgwLCB1dGlsc19qc18xLmdldE5hdGl2ZVdlYlNvY2tldCkoKTtcbiAgICB9XG4gICAgY2F0Y2gge1xuICAgICAgICBpZiAoV2ViU29ja2V0Xy5XZWJTb2NrZXQpXG4gICAgICAgICAgICByZXR1cm4gV2ViU29ja2V0Xy5XZWJTb2NrZXQ7XG4gICAgICAgIHJldHVybiBXZWJTb2NrZXRfO1xuICAgIH1cbn0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/isows/_cjs/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/isows/_cjs/utils.js":
/*!******************************************!*\
  !*** ./node_modules/isows/_cjs/utils.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getNativeWebSocket = void 0;\nfunction getNativeWebSocket() {\n    if (typeof WebSocket !== \"undefined\")\n        return WebSocket;\n    if (typeof global.WebSocket !== \"undefined\")\n        return global.WebSocket;\n    if (typeof window.WebSocket !== \"undefined\")\n        return window.WebSocket;\n    if (typeof self.WebSocket !== \"undefined\")\n        return self.WebSocket;\n    throw new Error(\"`WebSocket` is not supported in this environment\");\n}\nexports.getNativeWebSocket = getNativeWebSocket;\n//# sourceMappingURL=utils.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXNvd3MvX2Nqcy91dGlscy5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4vbm9kZV9tb2R1bGVzL2lzb3dzL19janMvdXRpbHMuanM/YzczZSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2V0TmF0aXZlV2ViU29ja2V0ID0gdm9pZCAwO1xuZnVuY3Rpb24gZ2V0TmF0aXZlV2ViU29ja2V0KCkge1xuICAgIGlmICh0eXBlb2YgV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gV2ViU29ja2V0O1xuICAgIGlmICh0eXBlb2YgZ2xvYmFsLldlYlNvY2tldCAhPT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgcmV0dXJuIGdsb2JhbC5XZWJTb2NrZXQ7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gd2luZG93LldlYlNvY2tldDtcbiAgICBpZiAodHlwZW9mIHNlbGYuV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gc2VsZi5XZWJTb2NrZXQ7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiYFdlYlNvY2tldGAgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGVudmlyb25tZW50XCIpO1xufVxuZXhwb3J0cy5nZXROYXRpdmVXZWJTb2NrZXQgPSBnZXROYXRpdmVXZWJTb2NrZXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/isows/_cjs/utils.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/isows/_esm/index.js":
/*!******************************************!*\
  !*** ./node_modules/isows/_esm/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("var ws__WEBPACK_IMPORTED_MODULE_0___namespace_cache;\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WebSocket: () => (/* binding */ WebSocket)\n/* harmony export */ });\n/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ \"(ssr)/./node_modules/ws/index.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ \"(ssr)/./node_modules/isows/_esm/utils.js\");\n\n\nconst WebSocket = (() => {\n    try {\n        return (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.getNativeWebSocket)();\n    }\n    catch {\n        if (ws__WEBPACK_IMPORTED_MODULE_0__.WebSocket)\n            return ws__WEBPACK_IMPORTED_MODULE_0__.WebSocket;\n        return /*#__PURE__*/ (ws__WEBPACK_IMPORTED_MODULE_0___namespace_cache || (ws__WEBPACK_IMPORTED_MODULE_0___namespace_cache = __webpack_require__.t(ws__WEBPACK_IMPORTED_MODULE_0__, 2)));\n    }\n})();\n//# sourceMappingURL=index.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXNvd3MvX2VzbS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQWlDO0FBQ2U7QUFDekM7QUFDUDtBQUNBLGVBQWUsNkRBQWtCO0FBQ2pDO0FBQ0E7QUFDQSxZQUFZLHlDQUFvQjtBQUNoQyxtQkFBbUIseUNBQW9CO0FBQ3ZDLGVBQWUsZ0xBQVU7QUFDekI7QUFDQSxDQUFDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL25vZGVfbW9kdWxlcy9pc293cy9fZXNtL2luZGV4LmpzPzJmNTYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgV2ViU29ja2V0XyBmcm9tIFwid3NcIjtcbmltcG9ydCB7IGdldE5hdGl2ZVdlYlNvY2tldCB9IGZyb20gXCIuL3V0aWxzLmpzXCI7XG5leHBvcnQgY29uc3QgV2ViU29ja2V0ID0gKCgpID0+IHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZ2V0TmF0aXZlV2ViU29ja2V0KCk7XG4gICAgfVxuICAgIGNhdGNoIHtcbiAgICAgICAgaWYgKFdlYlNvY2tldF8uV2ViU29ja2V0KVxuICAgICAgICAgICAgcmV0dXJuIFdlYlNvY2tldF8uV2ViU29ja2V0O1xuICAgICAgICByZXR1cm4gV2ViU29ja2V0XztcbiAgICB9XG59KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/isows/_esm/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/isows/_esm/utils.js":
/*!******************************************!*\
  !*** ./node_modules/isows/_esm/utils.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getNativeWebSocket: () => (/* binding */ getNativeWebSocket)\n/* harmony export */ });\nfunction getNativeWebSocket() {\n    if (typeof WebSocket !== \"undefined\")\n        return WebSocket;\n    if (typeof global.WebSocket !== \"undefined\")\n        return global.WebSocket;\n    if (typeof window.WebSocket !== \"undefined\")\n        return window.WebSocket;\n    if (typeof self.WebSocket !== \"undefined\")\n        return self.WebSocket;\n    throw new Error(\"`WebSocket` is not supported in this environment\");\n}\n//# sourceMappingURL=utils.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXNvd3MvX2VzbS91dGlscy5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9ub2RlX21vZHVsZXMvaXNvd3MvX2VzbS91dGlscy5qcz81NmQ3Il0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBnZXROYXRpdmVXZWJTb2NrZXQoKSB7XG4gICAgaWYgKHR5cGVvZiBXZWJTb2NrZXQgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHJldHVybiBXZWJTb2NrZXQ7XG4gICAgaWYgKHR5cGVvZiBnbG9iYWwuV2ViU29ja2V0ICE9PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICByZXR1cm4gZ2xvYmFsLldlYlNvY2tldDtcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5XZWJTb2NrZXQgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHJldHVybiB3aW5kb3cuV2ViU29ja2V0O1xuICAgIGlmICh0eXBlb2Ygc2VsZi5XZWJTb2NrZXQgIT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIHJldHVybiBzZWxmLldlYlNvY2tldDtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJgV2ViU29ja2V0YCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgZW52aXJvbm1lbnRcIik7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD11dGlscy5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/isows/_esm/utils.js\n");

/***/ })

};
;