"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/wagmi";
exports.ids = ["vendor-chunks/wagmi"];
exports.modules = {

/***/ "(ssr)/./node_modules/wagmi/dist/esm/context.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/context.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   WagmiContext: () => (/* binding */ WagmiContext),\n/* harmony export */   WagmiProvider: () => (/* binding */ WagmiProvider)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* harmony import */ var _hydrate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hydrate.js */ \"(ssr)/./node_modules/wagmi/dist/esm/hydrate.js\");\n/* __next_internal_client_entry_do_not_use__ WagmiContext,WagmiProvider auto */ \n\nconst WagmiContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(undefined);\nfunction WagmiProvider(parameters) {\n    const { children, config } = parameters;\n    const props = {\n        value: config\n    };\n    return /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_hydrate_js__WEBPACK_IMPORTED_MODULE_1__.Hydrate, parameters, /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(WagmiContext.Provider, props, children));\n} //# sourceMappingURL=context.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vY29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7O2dGQUdvRDtBQUNkO0FBRS9CLE1BQU1HLDZCQUFlSCxvREFBQUEsQ0FFMUJJLFdBQVU7QUFRTixTQUFVQyxjQUNkQyxVQUF1RDtJQUV2RCxNQUFNLEVBQUVDLFFBQVEsRUFBRUMsTUFBTSxFQUFFLEdBQUdGO0lBRTdCLE1BQU1HLFFBQVE7UUFBRUMsT0FBT0Y7SUFBTTtJQUM3QixxQkFBT1Asb0RBQUFBLENBQ0xDLGdEQUFBQSxFQUNBSSwwQkFDQUwsb0RBQUFBLENBQWNFLGFBQWFRLFFBQVEsRUFBRUYsT0FBT0Y7QUFFaEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uLi8uLi9zcmMvY29udGV4dC50cz9iZjZmIl0sIm5hbWVzIjpbImNyZWF0ZUNvbnRleHQiLCJjcmVhdGVFbGVtZW50IiwiSHlkcmF0ZSIsIldhZ21pQ29udGV4dCIsInVuZGVmaW5lZCIsIldhZ21pUHJvdmlkZXIiLCJwYXJhbWV0ZXJzIiwiY2hpbGRyZW4iLCJjb25maWciLCJwcm9wcyIsInZhbHVlIiwiUHJvdmlkZXIiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/context.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/wagmi/dist/esm/hydrate.js":
/*!************************************************!*\
  !*** ./node_modules/wagmi/dist/esm/hydrate.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Hydrate: () => (/* binding */ Hydrate)\n/* harmony export */ });\n/* harmony import */ var _wagmi_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wagmi/core */ \"(ssr)/./node_modules/@wagmi/core/dist/esm/hydrate.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/* __next_internal_client_entry_do_not_use__ Hydrate auto */ \n\nfunction Hydrate(parameters) {\n    const { children, config, initialState, reconnectOnMount = true } = parameters;\n    const { onMount } = (0,_wagmi_core__WEBPACK_IMPORTED_MODULE_1__.hydrate)(config, {\n        initialState,\n        reconnectOnMount\n    });\n    // Hydrate for non-SSR\n    if (!config._internal.ssr) onMount();\n    // Hydrate for SSR\n    const active = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(true);\n    // biome-ignore lint/correctness/useExhaustiveDependencies: `queryKey` not required\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!active.current) return;\n        if (!config._internal.ssr) return;\n        onMount();\n        return ()=>{\n            active.current = false;\n        };\n    }, []);\n    return children;\n} //# sourceMappingURL=hydrate.js.map\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2FnbWkvZGlzdC9lc20vaHlkcmF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7NkRBRXdFO0FBQ1o7QUFRdEQsU0FBVUcsUUFBUUMsVUFBaUQ7SUFDdkUsTUFBTSxFQUFFQyxRQUFRLEVBQUVDLE1BQU0sRUFBRUMsWUFBWSxFQUFFQyxtQkFBbUIsSUFBSSxFQUFFLEdBQUdKO0lBRXBFLE1BQU0sRUFBRUssT0FBTyxFQUFFLEdBQUdULG9EQUFBQSxDQUFRTSxRQUFRO1FBQ2xDQztRQUNBQzs7SUFHRixzQkFBc0I7SUFDdEIsSUFBSSxDQUFDRixPQUFPSSxTQUFTLENBQUNDLEdBQUcsRUFBRUY7SUFFM0Isa0JBQWtCO0lBQ2xCLE1BQU1HLFNBQVNWLDZDQUFBQSxDQUFPO0lBQ3RCLG1GQUFtRjtJQUNuRkQsZ0RBQUFBLENBQVU7UUFDUixJQUFJLENBQUNXLE9BQU9DLE9BQU8sRUFBRTtRQUNyQixJQUFJLENBQUNQLE9BQU9JLFNBQVMsQ0FBQ0MsR0FBRyxFQUFFO1FBQzNCRjtRQUNBLE9BQU87WUFDTEcsT0FBT0MsT0FBTyxHQUFHO1FBQ25CO0lBQ0YsR0FBRyxFQUFFO0lBRUwsT0FBT1I7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250ZW5kLy4uLy4uL3NyYy9oeWRyYXRlLnRzPzI1M2IiXSwibmFtZXMiOlsiaHlkcmF0ZSIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkh5ZHJhdGUiLCJwYXJhbWV0ZXJzIiwiY2hpbGRyZW4iLCJjb25maWciLCJpbml0aWFsU3RhdGUiLCJyZWNvbm5lY3RPbk1vdW50Iiwib25Nb3VudCIsIl9pbnRlcm5hbCIsInNzciIsImFjdGl2ZSIsImN1cnJlbnQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/wagmi/dist/esm/hydrate.js\n");

/***/ })

};
;