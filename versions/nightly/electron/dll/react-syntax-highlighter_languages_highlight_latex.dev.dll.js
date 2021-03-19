(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_latex"],{

/***/ "./node_modules/highlight.js/lib/languages/latex.js":
/*!**********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/latex.js ***!
  \**********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: LaTeX\nAuthor: Vladimir Moskva <vladmos@gmail.com>\nWebsite: https://www.latex-project.org\nCategory: markup\n*/\n\nfunction latex(hljs) {\n  var COMMAND = {\n    className: 'tag',\n    begin: /\\\\/,\n    relevance: 0,\n    contains: [\n      {\n        className: 'name',\n        variants: [\n          {begin: /[a-zA-Z\\u0430-\\u044f\\u0410-\\u042f]+[*]?/},\n          {begin: /[^a-zA-Z\\u0430-\\u044f\\u0410-\\u042f0-9]/}\n        ],\n        starts: {\n          endsWithParent: true,\n          relevance: 0,\n          contains: [\n            {\n              className: 'string', // because it looks like attributes in HTML tags\n              variants: [\n                {begin: /\\[/, end: /\\]/},\n                {begin: /\\{/, end: /\\}/}\n              ]\n            },\n            {\n              begin: /\\s*=\\s*/, endsWithParent: true,\n              relevance: 0,\n              contains: [\n                {\n                  className: 'number',\n                  begin: /-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?/\n                }\n              ]\n            }\n          ]\n        }\n      }\n    ]\n  };\n\n  return {\n    name: 'LaTeX',\n    aliases: ['tex'],\n    contains: [\n      COMMAND,\n      {\n        className: 'formula',\n        contains: [COMMAND],\n        relevance: 0,\n        variants: [\n          {begin: /\\$\\$/, end: /\\$\\$/},\n          {begin: /\\$/, end: /\\$/}\n        ]\n      },\n      hljs.COMMENT(\n        '%',\n        '$',\n        {\n          relevance: 0\n        }\n      )\n    ]\n  };\n}\n\nmodule.exports = latex;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/latex.js?");

/***/ })

}]);