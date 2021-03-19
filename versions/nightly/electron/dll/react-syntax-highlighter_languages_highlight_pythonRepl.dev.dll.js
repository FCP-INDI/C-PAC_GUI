(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_pythonRepl"],{

/***/ "./node_modules/highlight.js/lib/languages/python-repl.js":
/*!****************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/python-repl.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Python REPL\nRequires: python.js\nAuthor: Josh Goebel <hello@joshgoebel.com>\nCategory: common\n*/\n\nfunction pythonRepl(hljs) {\n  return {\n    aliases: ['pycon'],\n    contains: [\n      {\n        className: 'meta',\n        starts: {\n          // a space separates the REPL prefix from the actual code\n          // this is purely for cleaner HTML output\n          end: / |$/,\n          starts: {\n            end: '$', subLanguage: 'python'\n          }\n        },\n        variants: [\n          { begin: /^>>>(?=[ ]|$)/ },\n          { begin: /^\\.\\.\\.(?=[ ]|$)/ }\n        ]\n      },\n    ]\n  }\n}\n\nmodule.exports = pythonRepl;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/python-repl.js?");

/***/ })

}]);