module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/pages/home.tsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/layout/header.tsx":
/*!******************************************!*\
  !*** ./src/components/layout/header.tsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Header; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ \"styled-components\");\n/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);\n\nvar _jsxFileName = \"/Users/franklin/Desktop/enjoy_life/space_frank/src/components/layout/header.tsx\";\n\nfunction Header() {\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Wrapper, {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Logo, {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 5,\n      columnNumber: 9\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(Nav, {\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(NavItem, {\n        children: \"Blog\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 7,\n        columnNumber: 13\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(NavItem, {\n        children: \"PortFolio\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 8,\n        columnNumber: 13\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(NavItem, {\n        children: \"About Me\"\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 9,\n        columnNumber: 13\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 6,\n      columnNumber: 9\n    }, this)]\n  }, void 0, true, {\n    fileName: _jsxFileName,\n    lineNumber: 4,\n    columnNumber: 12\n  }, this);\n}\nconst Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div`\n    background-color: #eee;\n    height: 75px;\n    position: relative;\n    overflow: hidden;\n`;\nconst Logo = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div`\n    float: left;\n    margin-left: 2.5vw;\n    width: 125px;\n    height: 75px;\n    border: none;\n    background-image: url(\"/images/website_logo_frank_signature.png\");\n    background-position: center;\n    background-size: cover;\n    background-repeat: no-repeat;\n`;\nconst Nav = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div`\n    margin-right: 2.5vw;\n    display: flex;\n    float: right;\n    flex-direction: row-reverse;\n    flex-wrap: nowrap;\n    justify-content: space-between;\n    height: 75px;\n    border: none;\n    overflow-y: hidden;\n`;\nconst NavItem = styled_components__WEBPACK_IMPORTED_MODULE_1___default.a.div`\n    height: 100%;\n    border: none;\n    color: #000;\n    font-size: 14px;\n    padding: 0 20px;\n    line-height: 75px;\n    &:hover {\n        color: #555\n    }\n    cursor: pointer;\n`;//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9sYXlvdXQvaGVhZGVyLnRzeD8xNDQ3Il0sIm5hbWVzIjpbIkhlYWRlciIsIldyYXBwZXIiLCJzdHlsZWQiLCJkaXYiLCJMb2dvIiwiTmF2IiwiTmF2SXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtBQUVlLFNBQVNBLE1BQVQsR0FBbUI7QUFDOUIsc0JBQU8scUVBQUMsT0FBRDtBQUFBLDRCQUNILHFFQUFDLElBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQURHLGVBRUgscUVBQUMsR0FBRDtBQUFBLDhCQUNJLHFFQUFDLE9BQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FESixlQUVJLHFFQUFDLE9BQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FGSixlQUdJLHFFQUFDLE9BQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsY0FISjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFGRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFBUDtBQVNIO0FBRUQsTUFBTUMsT0FBTyxHQUFHQyx3REFBTSxDQUFDQyxHQUFJO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FMQTtBQU9BLE1BQU1DLElBQUksR0FBR0Ysd0RBQU0sQ0FBQ0MsR0FBSTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQVZBO0FBWUEsTUFBTUUsR0FBRyxHQUFHSCx3REFBTSxDQUFDQyxHQUFJO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBVkE7QUFZQSxNQUFNRyxPQUFPLEdBQUdKLHdEQUFNLENBQUNDLEdBQUk7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQVhBIiwiZmlsZSI6Ii4vc3JjL2NvbXBvbmVudHMvbGF5b3V0L2hlYWRlci50c3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gXCJzdHlsZWQtY29tcG9uZW50c1wiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEhlYWRlciAoKSB7XG4gICAgcmV0dXJuIDxXcmFwcGVyPlxuICAgICAgICA8TG9nby8+XG4gICAgICAgIDxOYXY+XG4gICAgICAgICAgICA8TmF2SXRlbT5CbG9nPC9OYXZJdGVtPlxuICAgICAgICAgICAgPE5hdkl0ZW0+UG9ydEZvbGlvPC9OYXZJdGVtPlxuICAgICAgICAgICAgPE5hdkl0ZW0+QWJvdXQgTWU8L05hdkl0ZW0+XG4gICAgICAgIDwvTmF2PlxuICAgIDwvV3JhcHBlcj5cblxufVxuXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xuICAgIGhlaWdodDogNzVweDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbmBcblxuY29uc3QgTG9nbyA9IHN0eWxlZC5kaXZgXG4gICAgZmxvYXQ6IGxlZnQ7XG4gICAgbWFyZ2luLWxlZnQ6IDIuNXZ3O1xuICAgIHdpZHRoOiAxMjVweDtcbiAgICBoZWlnaHQ6IDc1cHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi9pbWFnZXMvd2Vic2l0ZV9sb2dvX2ZyYW5rX3NpZ25hdHVyZS5wbmdcIik7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAgIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbmBcblxuY29uc3QgTmF2ID0gc3R5bGVkLmRpdmBcbiAgICBtYXJnaW4tcmlnaHQ6IDIuNXZ3O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxvYXQ6IHJpZ2h0O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgaGVpZ2h0OiA3NXB4O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBvdmVyZmxvdy15OiBoaWRkZW47XG5gXG5cbmNvbnN0IE5hdkl0ZW0gPSBzdHlsZWQuZGl2YFxuICAgIGhlaWdodDogMTAwJTtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgY29sb3I6ICMwMDA7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIHBhZGRpbmc6IDAgMjBweDtcbiAgICBsaW5lLWhlaWdodDogNzVweDtcbiAgICAmOmhvdmVyIHtcbiAgICAgICAgY29sb3I6ICM1NTVcbiAgICB9XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuYCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/layout/header.tsx\n");

/***/ }),

/***/ "./src/pages/home.tsx":
/*!****************************!*\
  !*** ./src/pages/home.tsx ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _src_components_layout_header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @src/components/layout/header */ \"./src/components/layout/header.tsx\");\n\n\nvar _jsxFileName = \"/Users/franklin/Desktop/enjoy_life/space_frank/src/pages/home.tsx\";\n\nfunction Home(props) {\n  const {\n    title,\n    type\n  } = props;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"Fragment\"], {\n    children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(_src_components_layout_header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 6,\n      columnNumber: 9\n    }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n      children: [title ? title : \"Welcome To Frank's Space\", `type: ${type ? type : 'Articles'}`]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 7,\n      columnNumber: 9\n    }, this)]\n  }, void 0, true);\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvcGFnZXMvaG9tZS50c3g/ZDU0YyJdLCJuYW1lcyI6WyJIb21lIiwicHJvcHMiLCJ0aXRsZSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFFZSxTQUFTQSxJQUFULENBQWdCQyxLQUFoQixFQUFpQztBQUM1QyxRQUFNO0FBQUVDLFNBQUY7QUFBU0M7QUFBVCxNQUFrQkYsS0FBeEI7QUFDQSxzQkFBTztBQUFBLDRCQUNILHFFQUFDLHFFQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsWUFERyxlQUVIO0FBQUEsaUJBQU1DLEtBQUssR0FBQ0EsS0FBRCxHQUFPLDBCQUFsQixFQUErQyxTQUFRQyxJQUFJLEdBQUNBLElBQUQsR0FBTSxVQUFXLEVBQTVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxZQUZHO0FBQUEsa0JBQVA7QUFJSCIsImZpbGUiOiIuL3NyYy9wYWdlcy9ob21lLnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBIZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL2xheW91dC9oZWFkZXInO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lICggcHJvcHM6IElBcnRpY2xlKSB7XG4gICAgY29uc3QgeyB0aXRsZSwgdHlwZSB9ID0gcHJvcHNcbiAgICByZXR1cm4gPD5cbiAgICAgICAgPEhlYWRlciAvPlxuICAgICAgICA8ZGl2Pnt0aXRsZT90aXRsZTpcIldlbGNvbWUgVG8gRnJhbmsncyBTcGFjZVwifXtgdHlwZTogJHt0eXBlP3R5cGU6J0FydGljbGVzJ31gfTwvZGl2PlxuICAgIDwvPlxufVxuXG5pbnRlcmZhY2UgSUFydGljbGUge1xuICAgIHRpdGxlOiBzdHJpbmdcbiAgICB0eXBlOiBzdHJpbmdcbn0iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/pages/home.tsx\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"styled-components\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJzdHlsZWQtY29tcG9uZW50c1wiP2Y1YWQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoic3R5bGVkLWNvbXBvbmVudHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///styled-components\n");

/***/ })

/******/ });