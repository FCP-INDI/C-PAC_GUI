(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_erlangRepl"],{

/***/ "./node_modules/highlight.js/lib/languages/erlang-repl.js":
/*!****************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/erlang-repl.js ***!
  \****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Erlang REPL\nAuthor: Sergey Ignatov <sergey@ignatov.spb.su>\nWebsite: https://www.erlang.org\nCategory: functional\n*/\n\nfunction erlangRepl(hljs) {\n  return {\n    name: 'Erlang REPL',\n    keywords: {\n      built_in:\n        'spawn spawn_link self',\n      keyword:\n        'after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if ' +\n        'let not of or orelse|10 query receive rem try when xor'\n    },\n    contains: [\n      {\n        className: 'meta', begin: '^[0-9]+> ',\n        relevance: 10\n      },\n      hljs.COMMENT('%', '$'),\n      {\n        className: 'number',\n        begin: '\\\\b(\\\\d+(_\\\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\\\d+(_\\\\d+)*(\\\\.\\\\d+(_\\\\d+)*)?([eE][-+]?\\\\d+)?)',\n        relevance: 0\n      },\n      hljs.APOS_STRING_MODE,\n      hljs.QUOTE_STRING_MODE,\n      {\n        begin: '\\\\?(::)?([A-Z]\\\\w*(::)?)+'\n      },\n      {\n        begin: '->'\n      },\n      {\n        begin: 'ok'\n      },\n      {\n        begin: '!'\n      },\n      {\n        begin: '(\\\\b[a-z\\'][a-zA-Z0-9_\\']*:[a-z\\'][a-zA-Z0-9_\\']*)|(\\\\b[a-z\\'][a-zA-Z0-9_\\']*)',\n        relevance: 0\n      },\n      {\n        begin: '[A-Z][a-zA-Z0-9_\\']*',\n        relevance: 0\n      }\n    ]\n  };\n}\n\nmodule.exports = erlangRepl;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/erlang-repl.js?");

/***/ })

}]);