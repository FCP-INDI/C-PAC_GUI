(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_parser3"],{

/***/ "./node_modules/highlight.js/lib/languages/parser3.js":
/*!************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/parser3.js ***!
  \************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Parser3\nRequires: xml.js\nAuthor: Oleg Volchkov <oleg@volchkov.net>\nWebsite: https://www.parser.ru/en/\nCategory: template\n*/\n\nfunction parser3(hljs) {\n  var CURLY_SUBCOMMENT = hljs.COMMENT(\n    '{',\n    '}',\n    {\n      contains: ['self']\n    }\n  );\n  return {\n    name: 'Parser3',\n    subLanguage: 'xml', relevance: 0,\n    contains: [\n      hljs.COMMENT('^#', '$'),\n      hljs.COMMENT(\n        '\\\\^rem{',\n        '}',\n        {\n          relevance: 10,\n          contains: [\n            CURLY_SUBCOMMENT\n          ]\n        }\n      ),\n      {\n        className: 'meta',\n        begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',\n        relevance: 10\n      },\n      {\n        className: 'title',\n        begin: '@[\\\\w\\\\-]+\\\\[[\\\\w^;\\\\-]*\\\\](?:\\\\[[\\\\w^;\\\\-]*\\\\])?(?:.*)$'\n      },\n      {\n        className: 'variable',\n        begin: '\\\\$\\\\{?[\\\\w\\\\-\\\\.\\\\:]+\\\\}?'\n      },\n      {\n        className: 'keyword',\n        begin: '\\\\^[\\\\w\\\\-\\\\.\\\\:]+'\n      },\n      {\n        className: 'number',\n        begin: '\\\\^#[0-9a-fA-F]+'\n      },\n      hljs.C_NUMBER_MODE\n    ]\n  };\n}\n\nmodule.exports = parser3;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/parser3.js?");

/***/ })

}]);