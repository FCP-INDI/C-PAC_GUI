(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_brainfuck"],{

/***/ "./node_modules/highlight.js/lib/languages/brainfuck.js":
/*!**************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/brainfuck.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Brainfuck\nAuthor: Evgeny Stepanischev <imbolk@gmail.com>\nWebsite: https://esolangs.org/wiki/Brainfuck\n*/\n\n/** @type LanguageFn */\nfunction brainfuck(hljs) {\n  var LITERAL = {\n    className: 'literal',\n    begin: '[\\\\+\\\\-]',\n    relevance: 0\n  };\n  return {\n    name: 'Brainfuck',\n    aliases: ['bf'],\n    contains: [\n      hljs.COMMENT(\n        '[^\\\\[\\\\]\\\\.,\\\\+\\\\-<> \\r\\n]',\n        '[\\\\[\\\\]\\\\.,\\\\+\\\\-<> \\r\\n]',\n        {\n          returnEnd: true,\n          relevance: 0\n        }\n      ),\n      {\n        className: 'title',\n        begin: '[\\\\[\\\\]]',\n        relevance: 0\n      },\n      {\n        className: 'string',\n        begin: '[\\\\.,]',\n        relevance: 0\n      },\n      {\n        // this mode works as the only relevance counter\n        begin: /(?:\\+\\+|\\-\\-)/,\n        contains: [LITERAL]\n      },\n      LITERAL\n    ]\n  };\n}\n\nmodule.exports = brainfuck;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/brainfuck.js?");

/***/ })

}]);