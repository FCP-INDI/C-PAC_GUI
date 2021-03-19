(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_diff"],{

/***/ "./node_modules/highlight.js/lib/languages/diff.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/diff.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Diff\nDescription: Unified and context diff\nAuthor: Vasily Polovnyov <vast@whiteants.net>\nWebsite: https://www.gnu.org/software/diffutils/\nCategory: common\n*/\n\n/** @type LanguageFn */\nfunction diff(hljs) {\n  return {\n    name: 'Diff',\n    aliases: ['patch'],\n    contains: [\n      {\n        className: 'meta',\n        relevance: 10,\n        variants: [\n          {begin: /^@@ +\\-\\d+,\\d+ +\\+\\d+,\\d+ +@@$/},\n          {begin: /^\\*\\*\\* +\\d+,\\d+ +\\*\\*\\*\\*$/},\n          {begin: /^\\-\\-\\- +\\d+,\\d+ +\\-\\-\\-\\-$/}\n        ]\n      },\n      {\n        className: 'comment',\n        variants: [\n          {begin: /Index: /, end: /$/},\n          {begin: /={3,}/, end: /$/},\n          {begin: /^\\-{3}/, end: /$/},\n          {begin: /^\\*{3} /, end: /$/},\n          {begin: /^\\+{3}/, end: /$/},\n          {begin: /^\\*{15}$/ }\n        ]\n      },\n      {\n        className: 'addition',\n        begin: '^\\\\+', end: '$'\n      },\n      {\n        className: 'deletion',\n        begin: '^\\\\-', end: '$'\n      },\n      {\n        className: 'addition',\n        begin: '^\\\\!', end: '$'\n      }\n    ]\n  };\n}\n\nmodule.exports = diff;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/diff.js?");

/***/ })

}]);