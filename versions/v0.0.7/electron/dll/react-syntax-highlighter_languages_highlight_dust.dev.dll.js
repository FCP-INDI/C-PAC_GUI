(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_dust"],{

/***/ "./node_modules/highlight.js/lib/languages/dust.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/dust.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Dust\nRequires: xml.js\nAuthor: Michael Allen <michael.allen@benefitfocus.com>\nDescription: Matcher for dust.js templates.\nWebsite: https://www.dustjs.com\nCategory: template\n*/\n\nfunction dust(hljs) {\n  var EXPRESSION_KEYWORDS = 'if eq ne lt lte gt gte select default math sep';\n  return {\n    name: 'Dust',\n    aliases: ['dst'],\n    case_insensitive: true,\n    subLanguage: 'xml',\n    contains: [\n      {\n        className: 'template-tag',\n        begin: /\\{[#\\/]/, end: /\\}/, illegal: /;/,\n        contains: [\n          {\n            className: 'name',\n            begin: /[a-zA-Z\\.-]+/,\n            starts: {\n              endsWithParent: true, relevance: 0,\n              contains: [\n                hljs.QUOTE_STRING_MODE\n              ]\n            }\n          }\n        ]\n      },\n      {\n        className: 'template-variable',\n        begin: /\\{/, end: /\\}/, illegal: /;/,\n        keywords: EXPRESSION_KEYWORDS\n      }\n    ]\n  };\n}\n\nmodule.exports = dust;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/dust.js?");

/***/ })

}]);