(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_scilab"],{

/***/ "./node_modules/highlight.js/lib/languages/scilab.js":
/*!***********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/scilab.js ***!
  \***********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Scilab\nAuthor: Sylvestre Ledru <sylvestre.ledru@scilab-enterprises.com>\nOrigin: matlab.js\nDescription: Scilab is a port from Matlab\nWebsite: https://www.scilab.org\nCategory: scientific\n*/\n\nfunction scilab(hljs) {\n\n  var COMMON_CONTAINS = [\n    hljs.C_NUMBER_MODE,\n    {\n      className: 'string',\n      begin: '\\'|\\\"', end: '\\'|\\\"',\n      contains: [hljs.BACKSLASH_ESCAPE, {begin: '\\'\\''}]\n    }\n  ];\n\n  return {\n    name: 'Scilab',\n    aliases: ['sci'],\n    keywords: {\n      $pattern: /%?\\w+/,\n      keyword: 'abort break case clear catch continue do elseif else endfunction end for function '+\n        'global if pause return resume select try then while',\n      literal:\n        '%f %F %t %T %pi %eps %inf %nan %e %i %z %s',\n      built_in: // Scilab has more than 2000 functions. Just list the most commons\n       'abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error '+\n       'exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty '+\n       'isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log '+\n       'max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real '+\n       'round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan '+\n       'type typename warning zeros matrix'\n    },\n    illegal: '(\"|#|/\\\\*|\\\\s+/\\\\w+)',\n    contains: [\n      {\n        className: 'function',\n        beginKeywords: 'function', end: '$',\n        contains: [\n          hljs.UNDERSCORE_TITLE_MODE,\n          {\n            className: 'params',\n            begin: '\\\\(', end: '\\\\)'\n          }\n        ]\n      },\n      {\n        begin: '[a-zA-Z_][a-zA-Z_0-9]*(\\'+[\\\\.\\']*|[\\\\.\\']+)', end: '',\n        relevance: 0\n      },\n      {\n        begin: '\\\\[', end: '\\\\]\\'*[\\\\.\\']*',\n        relevance: 0,\n        contains: COMMON_CONTAINS\n      },\n      hljs.COMMENT('//', '$')\n    ].concat(COMMON_CONTAINS)\n  };\n}\n\nmodule.exports = scilab;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/scilab.js?");

/***/ })

}]);