(function() {
var exports = {};
exports.id = 195;
exports.ids = [195];
exports.modules = {

/***/ 1781:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ BlogPage; },
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2582);
/* harmony import */ var _components_Sidebar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6552);
/* harmony import */ var _components_ArticleList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6949);
/* harmony import */ var _data_posts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7739);









function BlogPage({
  darkMode,
  toggleDarkMode
}) {
  const {
    0: selectedTags,
    1: setSelectedTags
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const {
    0: sidebarOpen,
    1: setSidebarOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  const {
    0: mounted,
    1: setMounted
  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    setMounted(true); // Read tags from URL query params

    const params = new URLSearchParams(window.location.search);
    const tags = params.get('tags');

    if (tags) {
      setSelectedTags(tags.split(','));
    }
  }, []);
  const filteredPosts = (0,_data_posts__WEBPACK_IMPORTED_MODULE_6__/* .filterPostsByTags */ .Ut)(selectedTags);

  const handleTagToggle = tag => {
    setSelectedTags(prev => {
      const newTags = prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]; // Update URL

      const url = new URL(window.location.href);

      if (newTags.length > 0) {
        url.searchParams.set('tags', newTags.join(','));
      } else {
        url.searchParams.delete('tags');
      }

      window.history.pushState({}, '', url.toString());
      return newTags;
    });
  };

  const handleClearAll = () => {
    setSelectedTags([]);
    const url = new URL(window.location.href);
    url.searchParams.delete('tags');
    window.history.pushState({}, '', url.toString());
  };

  if (!mounted) {
    return null;
  }

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
        children: "Blog | frankly-speaking"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
        name: "description",
        content: "A personal blog about technology, development, and thoughts"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
        rel: "stylesheet"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Header__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z, {
      darkMode: darkMode,
      toggleDarkMode: toggleDarkMode,
      onMenuToggle: () => setSidebarOpen(!sidebarOpen)
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Sidebar__WEBPACK_IMPORTED_MODULE_4__/* .default */ .Z, {
      selectedTags: selectedTags,
      onTagToggle: handleTagToggle,
      onClearAll: handleClearAll,
      isOpen: sidebarOpen,
      onClose: () => setSidebarOpen(false)
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
      className: "main-content",
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
        className: "text-2xl font-bold mb-6 text-text-primary dark:text-text-dark-primary",
        children: "All Posts"
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_ArticleList__WEBPACK_IMPORTED_MODULE_5__/* .default */ .Z, {
        posts: filteredPosts
      })]
    })]
  });
}
const getServerSideProps = async () => {
  return {
    props: {
      posts: _data_posts__WEBPACK_IMPORTED_MODULE_6__/* .posts */ .xu
    }
  };
};

/***/ }),

/***/ 8417:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router-context.js");;

/***/ }),

/***/ 2238:
/***/ (function(module) {

"use strict";
module.exports = require("next/dist/next-server/lib/router/utils/get-asset-path-from-route.js");;

/***/ }),

/***/ 701:
/***/ (function(module) {

"use strict";
module.exports = require("next/head");;

/***/ }),

/***/ 6731:
/***/ (function(module) {

"use strict";
module.exports = require("next/router");;

/***/ }),

/***/ 9297:
/***/ (function(module) {

"use strict";
module.exports = require("react");;

/***/ }),

/***/ 5282:
/***/ (function(module) {

"use strict";
module.exports = require("react/jsx-runtime");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664,582,739,561], function() { return __webpack_exec__(1781); });
module.exports = __webpack_exports__;

})();