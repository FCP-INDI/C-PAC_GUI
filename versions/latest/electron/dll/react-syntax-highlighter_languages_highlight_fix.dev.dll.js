(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_fix"],{

/***/ "./node_modules/highlight.js/lib/languages/fix.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/fix.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: FIX\nAuthor: Brent Bradbury <brent@brentium.com>\n*/\n\nfunction fix(hljs) {\n  return {\n    name: 'FIX',\n    contains: [\n    {\n      begin: /[^\\u2401\\u0001]+/,\n      end: /[\\u2401\\u0001]/,\n      excludeEnd: true,\n      returnBegin: true,\n      returnEnd: false,\n      contains: [\n      {\n        begin: /([^\\u2401\\u0001=]+)/,\n        end: /=([^\\u2401\\u0001=]+)/,\n        returnEnd: true,\n        returnBegin: false,\n        className: 'attr'\n      },\n      {\n        begin: /=/,\n        end: /([\\u2401\\u0001])/,\n        excludeEnd: true,\n        excludeBegin: true,\n        className: 'string'\n      }]\n    }],\n    case_insensitive: true\n  };\n}\n\nmodule.exports = fix;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/fix.js?");

/***/ })

}]);