(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_prolog"],{

/***/ "./node_modules/highlight.js/lib/languages/prolog.js":
/*!***********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/prolog.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Prolog\nDescription: Prolog is a general purpose logic programming language associated with artificial intelligence and computational linguistics.\nAuthor: Raivo Laanemets <raivo@infdot.com>\nWebsite: https://en.wikipedia.org/wiki/Prolog\n*/\n\nfunction prolog(hljs) {\n\n  var ATOM = {\n\n    begin: /[a-z][A-Za-z0-9_]*/,\n    relevance: 0\n  };\n\n  var VAR = {\n\n    className: 'symbol',\n    variants: [\n      {begin: /[A-Z][a-zA-Z0-9_]*/},\n      {begin: /_[A-Za-z0-9_]*/},\n    ],\n    relevance: 0\n  };\n\n  var PARENTED = {\n\n    begin: /\\(/,\n    end: /\\)/,\n    relevance: 0\n  };\n\n  var LIST = {\n\n    begin: /\\[/,\n    end: /\\]/\n  };\n\n  var LINE_COMMENT = {\n\n    className: 'comment',\n    begin: /%/, end: /$/,\n    contains: [hljs.PHRASAL_WORDS_MODE]\n  };\n\n  var BACKTICK_STRING = {\n\n    className: 'string',\n    begin: /`/, end: /`/,\n    contains: [hljs.BACKSLASH_ESCAPE]\n  };\n\n  var CHAR_CODE = {\n\n    className: 'string', // 0'a etc.\n    begin: /0\\'(\\\\\\'|.)/\n  };\n\n  var SPACE_CODE = {\n\n    className: 'string',\n    begin: /0\\'\\\\s/ // 0'\\s\n  };\n\n  var PRED_OP = { // relevance booster\n    begin: /:-/\n  };\n\n  var inner = [\n\n    ATOM,\n    VAR,\n    PARENTED,\n    PRED_OP,\n    LIST,\n    LINE_COMMENT,\n    hljs.C_BLOCK_COMMENT_MODE,\n    hljs.QUOTE_STRING_MODE,\n    hljs.APOS_STRING_MODE,\n    BACKTICK_STRING,\n    CHAR_CODE,\n    SPACE_CODE,\n    hljs.C_NUMBER_MODE\n  ];\n\n  PARENTED.contains = inner;\n  LIST.contains = inner;\n\n  return {\n    name: 'Prolog',\n    contains: inner.concat([\n      {begin: /\\.$/} // relevance booster\n    ])\n  };\n}\n\nmodule.exports = prolog;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/prolog.js?");

/***/ })

}]);