(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_bnf"],{

/***/ "./node_modules/highlight.js/lib/languages/bnf.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/bnf.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Backus–Naur Form\nWebsite: https://en.wikipedia.org/wiki/Backus–Naur_form\nAuthor: Oleg Efimov <efimovov@gmail.com>\n*/\n\n/** @type LanguageFn */\nfunction bnf(hljs) {\n  return {\n    name: 'Backus–Naur Form',\n    contains: [\n      // Attribute\n      {\n        className: 'attribute',\n        begin: /</, end: />/\n      },\n      // Specific\n      {\n        begin: /::=/,\n        end: /$/,\n        contains: [\n          {\n            begin: /</, end: />/\n          },\n          // Common\n          hljs.C_LINE_COMMENT_MODE,\n          hljs.C_BLOCK_COMMENT_MODE,\n          hljs.APOS_STRING_MODE,\n          hljs.QUOTE_STRING_MODE\n        ]\n      }\n    ]\n  };\n}\n\nmodule.exports = bnf;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/bnf.js?");

/***/ })

}]);