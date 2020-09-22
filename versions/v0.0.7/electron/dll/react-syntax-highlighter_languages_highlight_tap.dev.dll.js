(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_tap"],{

/***/ "./node_modules/highlight.js/lib/languages/tap.js":
/*!********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/tap.js ***!
  \********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Test Anything Protocol\nDescription: TAP, the Test Anything Protocol, is a simple text-based interface between testing modules in a test harness.\nRequires: yaml.js\nAuthor: Sergey Bronnikov <sergeyb@bronevichok.ru>\nWebsite: https://testanything.org\n*/\n\nfunction tap(hljs) {\n  return {\n    name: 'Test Anything Protocol',\n    case_insensitive: true,\n    contains: [\n      hljs.HASH_COMMENT_MODE,\n      // version of format and total amount of testcases\n      {\n        className: 'meta',\n        variants: [\n          { begin: '^TAP version (\\\\d+)$' },\n          { begin: '^1\\\\.\\\\.(\\\\d+)$' }\n        ],\n      },\n      // YAML block\n      {\n        begin: '(\\s+)?---$', end: '\\\\.\\\\.\\\\.$',\n        subLanguage: 'yaml',\n        relevance: 0\n      },\n\t  // testcase number\n      {\n        className: 'number',\n        begin: ' (\\\\d+) '\n      },\n\t  // testcase status and description\n      {\n        className: 'symbol',\n        variants: [\n          { begin: '^ok' },\n          { begin: '^not ok' }\n        ],\n      },\n    ]\n  };\n}\n\nmodule.exports = tap;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/tap.js?");

/***/ })

}]);