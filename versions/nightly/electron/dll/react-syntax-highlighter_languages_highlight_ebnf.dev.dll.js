(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_ebnf"],{

/***/ "./node_modules/highlight.js/lib/languages/ebnf.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/ebnf.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Extended Backus-Naur Form\nAuthor: Alex McKibben <alex@nullscope.net>\nWebsite: https://en.wikipedia.org/wiki/Extended_Backus–Naur_form\n*/\n\nfunction ebnf(hljs) {\n    var commentMode = hljs.COMMENT(/\\(\\*/, /\\*\\)/);\n\n    var nonTerminalMode = {\n        className: \"attribute\",\n        begin: /^[ ]*[a-zA-Z][a-zA-Z-_]*([\\s-_]+[a-zA-Z][a-zA-Z]*)*/\n    };\n\n    var specialSequenceMode = {\n        className: \"meta\",\n        begin: /\\?.*\\?/\n    };\n\n    var ruleBodyMode = {\n        begin: /=/, end: /[.;]/,\n        contains: [\n            commentMode,\n            specialSequenceMode,\n            {\n              // terminals\n              className: 'string',\n              variants: [\n                hljs.APOS_STRING_MODE,\n                hljs.QUOTE_STRING_MODE,\n                {begin: '`', end: '`'},\n              ]\n            },\n        ]\n    };\n\n    return {\n        name: 'Extended Backus-Naur Form',\n        illegal: /\\S/,\n        contains: [\n            commentMode,\n            nonTerminalMode,\n            ruleBodyMode\n        ]\n    };\n}\n\nmodule.exports = ebnf;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/ebnf.js?");

/***/ })

}]);