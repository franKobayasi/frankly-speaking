exports.id = 561;
exports.ids = [561];
exports.modules = {

/***/ 6949:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ ArticleList; }
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
;// CONCATENATED MODULE: ./src/components/ArticleCard.tsx




function ArticleCard({
  post
}) {
  const {
    0: expanded,
    1: setExpanded
  } = (0,external_react_.useState)(false);

  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)("article", {
    className: "article-card",
    onClick: () => setExpanded(!expanded),
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "article-card-header",
      children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "article-date",
        children: formatDate(post.date)
      }), /*#__PURE__*/jsx_runtime_.jsx("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        className: `article-expand-icon ${expanded ? 'expanded' : ''}`,
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        children: /*#__PURE__*/jsx_runtime_.jsx("path", {
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeWidth: 2,
          d: "M19 9l-7 7-7-7"
        })
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
      href: `/blog/${post.slug}`,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        className: "article-title hover:underline",
        onClick: e => e.stopPropagation(),
        children: post.title
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "accordion-content",
      style: {
        maxHeight: expanded ? '200px' : '0',
        opacity: expanded ? 1 : 0
      },
      children: /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "article-summary mt-2",
        children: post.summary
      })
    }), /*#__PURE__*/jsx_runtime_.jsx("div", {
      className: "article-tags",
      children: post.tags.map(tag => /*#__PURE__*/jsx_runtime_.jsx("span", {
        className: "article-tag",
        children: tag
      }, tag))
    })]
  });
}
;// CONCATENATED MODULE: ./src/components/ArticleList.tsx



function ArticleList({
  posts
}) {
  if (posts.length === 0) {
    return /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      className: "no-posts-message",
      children: [/*#__PURE__*/jsx_runtime_.jsx("p", {
        children: "No articles found matching your filters."
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        className: "mt-2",
        children: "Try selecting different tags or clear all filters."
      })]
    });
  }

  return /*#__PURE__*/jsx_runtime_.jsx("div", {
    children: posts.map(post => /*#__PURE__*/jsx_runtime_.jsx(ArticleCard, {
      post: post
    }, post.id))
  });
}

/***/ }),

/***/ 6552:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": function() { return /* binding */ Sidebar; }
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _data_posts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7739);




function Sidebar({
  selectedTags,
  onTagToggle,
  onClearAll,
  isOpen,
  onClose
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
    children: [isOpen && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
      className: "sidebar-overlay md:hidden",
      onClick: onClose
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("aside", {
      className: `sidebar ${isOpen ? 'open' : ''}`,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex justify-between items-center mb-4",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
          className: "sidebar-title mb-0",
          children: "Filter by Tags"
        }), selectedTags.length > 0 && /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
          onClick: onClearAll,
          className: "text-xs text-text-secondary hover:text-text-primary dark:text-text-dark-secondary dark:hover:text-text-dark-primary",
          children: "Clear all"
        })]
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "space-y-1",
        children: _data_posts__WEBPACK_IMPORTED_MODULE_1__/* .allTags.map */ .iF.map(tag => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
          className: "tag-checkbox",
          children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
            type: "checkbox",
            id: `tag-${tag}`,
            checked: selectedTags.includes(tag),
            onChange: () => onTagToggle(tag)
          }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("label", {
            htmlFor: `tag-${tag}`,
            children: tag
          })]
        }, tag))
      }), selectedTags.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "mt-6 pt-4 border-t border-border-light dark:border-border-dark",
        children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
          className: "text-xs text-text-secondary dark:text-text-dark-secondary mb-2",
          children: "Active filters:"
        }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
          className: "flex flex-wrap gap-2",
          children: selectedTags.map(tag => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
            className: "inline-flex items-center gap-1 text-xs px-2 py-1 rounded bg-accent text-white",
            children: [tag, /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
              onClick: () => onTagToggle(tag),
              className: "hover:text-gray-200",
              children: "\xD7"
            })]
          }, tag))
        })]
      })]
    })]
  });
}

/***/ })

};
;