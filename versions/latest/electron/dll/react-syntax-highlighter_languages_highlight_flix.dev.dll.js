(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_flix"],{

/***/ "./node_modules/highlight.js/lib/languages/flix.js":
/*!*********************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/flix.js ***!
  \*********************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\n Language: Flix\n Category: functional\n Author: Magnus Madsen <mmadsen@uwaterloo.ca>\n Website: https://flix.dev/\n */\n\nfunction flix (hljs) {\n\n    var CHAR = {\n        className: 'string',\n        begin: /'(.|\\\\[xXuU][a-zA-Z0-9]+)'/\n    };\n\n    var STRING = {\n        className: 'string',\n        variants: [\n            {\n                begin: '\"', end: '\"'\n            }\n        ]\n    };\n\n    var NAME = {\n        className: 'title',\n        begin: /[^0-9\\n\\t \"'(),.`{}\\[\\]:;][^\\n\\t \"'(),.`{}\\[\\]:;]+|[^0-9\\n\\t \"'(),.`{}\\[\\]:;=]/\n    };\n\n    var METHOD = {\n        className: 'function',\n        beginKeywords: 'def',\n        end: /[:={\\[(\\n;]/,\n        excludeEnd: true,\n        contains: [NAME]\n    };\n\n    return {\n        name: 'Flix',\n        keywords: {\n            literal: 'true false',\n            keyword: 'case class def else enum if impl import in lat rel index let match namespace switch type yield with'\n        },\n        contains: [\n            hljs.C_LINE_COMMENT_MODE,\n            hljs.C_BLOCK_COMMENT_MODE,\n            CHAR,\n            STRING,\n            METHOD,\n            hljs.C_NUMBER_MODE\n        ]\n    };\n}\n\nmodule.exports = flix;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/flix.js?");

/***/ })

}]);