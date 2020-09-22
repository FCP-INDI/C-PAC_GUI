(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_leaf"],{

/***/ "./node_modules/highlight.js/lib/languages/leaf.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/leaf.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Leaf\nAuthor: Hale Chan <halechan@qq.com>\nDescription: Based on the Leaf reference from https://vapor.github.io/documentation/guide/leaf.html.\n*/\n\nfunction leaf (hljs) {\n  return {\n    name: 'Leaf',\n    contains: [\n      {\n        className: 'function',\n        begin: '#+' + '[A-Za-z_0-9]*' + '\\\\(',\n        end:' {',\n        returnBegin: true,\n        excludeEnd: true,\n        contains : [\n          {\n            className: 'keyword',\n            begin: '#+'\n          },\n          {\n            className: 'title',\n            begin: '[A-Za-z_][A-Za-z_0-9]*'\n          },\n          {\n            className: 'params',\n            begin: '\\\\(', end: '\\\\)',\n            endsParent: true,\n            contains: [\n              {\n                className: 'string',\n                begin: '\"',\n                end: '\"'\n              },\n              {\n                className: 'variable',\n                begin: '[A-Za-z_][A-Za-z_0-9]*'\n              }\n            ]\n          }\n        ]\n      }\n    ]\n  };\n}\n\nmodule.exports = leaf;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/leaf.js?");

/***/ })

}]);