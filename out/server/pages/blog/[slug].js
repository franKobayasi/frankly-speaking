(function() {
var exports = {};
exports.id = 492;
exports.ids = [492];
exports.modules = {

/***/ 4408:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ArticlePage; },
/* harmony export */   "getServerSideProps": function() { return /* binding */ getServerSideProps; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(701);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2582);
/* harmony import */ var _data_posts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7739);







function ArticlePage({
  post,
  darkMode,
  toggleDarkMode
}) {
  if (!post) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
          children: "404 - Post Not Found"
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Header__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z, {
        darkMode: darkMode,
        toggleDarkMode: toggleDarkMode
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
        className: "main-content",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "text-center py-12",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
            className: "text-2xl font-bold mb-4",
            children: "Post Not Found"
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__.default, {
            href: "/blog",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
              className: "text-accent hover:underline",
              children: "\u2190 Back to Blog"
            })
          })]
        })
      })]
    });
  }

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }; // Simple markdown-like rendering


  const renderContent = content => {
    const lines = content.trim().split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';
    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = '';
        } else {
          inCodeBlock = false;
          elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("pre", {
            className: "bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-x-auto my-4 text-sm",
            children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("code", {
              children: codeContent.trim()
            })
          }, index));
        }

        return;
      }

      if (inCodeBlock) {
        codeContent += line + '\n';
        return;
      }

      if (line.startsWith('# ')) {
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
          className: "text-2xl font-bold mt-8 mb-4 text-text-primary dark:text-text-dark-primary",
          children: line.slice(2)
        }, index));
      } else if (line.startsWith('## ')) {
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
          className: "text-xl font-bold mt-6 mb-3 text-text-primary dark:text-text-dark-primary",
          children: line.slice(3)
        }, index));
      } else if (line.startsWith('### ')) {
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
          className: "text-lg font-semibold mt-4 mb-2 text-text-primary dark:text-text-dark-primary",
          children: line.slice(4)
        }, index));
      } else if (line.startsWith('- ')) {
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
          className: "ml-4 text-text-secondary dark:text-text-dark-secondary",
          children: line.slice(2)
        }, index));
      } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
          className: "ml-4 text-text-secondary dark:text-text-dark-secondary list-decimal",
          children: line.slice(3)
        }, index));
      } else if (line.startsWith('> ')) {
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("blockquote", {
          className: "border-l-4 border-accent pl-4 my-4 italic text-text-secondary dark:text-text-dark-secondary",
          children: line.slice(2)
        }, index));
      } else if (line.trim() === '') {
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("br", {}, index));
      } else {
        // Handle inline code
        const parts = line.split(/(`[^`]+`)/);
        elements.push( /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
          className: "my-3 text-text-secondary dark:text-text-dark-secondary",
          children: parts.map((part, i) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("code", {
                className: "bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm",
                children: part.slice(1, -1)
              }, i);
            }

            return part;
          })
        }, index));
      }
    });
    return elements;
  };

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("title", {
        children: [post.title, " | Blog"]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
        name: "description",
        content: post.summary
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap",
        rel: "stylesheet"
      })]
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Header__WEBPACK_IMPORTED_MODULE_3__/* .default */ .Z, {
      darkMode: darkMode,
      toggleDarkMode: toggleDarkMode
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
      className: "main-content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("article", {
        className: "article-detail",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(next_link__WEBPACK_IMPORTED_MODULE_2__.default, {
          href: "/blog",
          children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            className: "back-link",
            children: "\u2190 Back to Blog"
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
          className: "article-detail-header",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
            className: "article-detail-title",
            children: post.title
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
            className: "article-detail-date",
            children: formatDate(post.date)
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex gap-2",
            children: post.tags.map(tag => /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
              className: "article-tag",
              children: tag
            }, tag))
          })]
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
          className: "article-detail-content",
          children: renderContent(post.content)
        })]
      })
    })]
  });
}
const getServerSideProps = async ({
  params
}) => {
  const slug = params === null || params === void 0 ? void 0 : params.slug;
  const post = (0,_data_posts__WEBPACK_IMPORTED_MODULE_4__/* .getPostBySlug */ .zQ)(slug);
  return {
    props: {
      post: post || null,
      posts: _data_posts__WEBPACK_IMPORTED_MODULE_4__/* .posts */ .xu
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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
var __webpack_exports__ = __webpack_require__.X(0, [664,582,739], function() { return __webpack_exec__(4408); });
module.exports = __webpack_exports__;

})();