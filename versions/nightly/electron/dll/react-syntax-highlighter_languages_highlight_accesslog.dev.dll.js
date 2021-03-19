(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_accesslog"],{

/***/ "./node_modules/highlight.js/lib/languages/accesslog.js":
/*!**************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/accesslog.js ***!
  \**************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\n Language: Apache Access Log\n Author: Oleg Efimov <efimovov@gmail.com>\n Description: Apache/Nginx Access Logs\n Website: https://httpd.apache.org/docs/2.4/logs.html#accesslog\n */\n\n /** @type LanguageFn */\nfunction accesslog(hljs) {\n  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods\n  var HTTP_VERBS = [\n    \"GET\", \"POST\", \"HEAD\", \"PUT\", \"DELETE\", \"CONNECT\", \"OPTIONS\", \"PATCH\", \"TRACE\"\n  ];\n  return {\n    name: 'Apache Access Log',\n    contains: [\n      // IP\n      {\n        className: 'number',\n        begin: '^\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}\\\\.\\\\d{1,3}(:\\\\d{1,5})?\\\\b',\n        relevance:5\n      },\n      // Other numbers\n      {\n        className: 'number',\n        begin: '\\\\b\\\\d+\\\\b',\n        relevance: 0\n      },\n      // Requests\n      {\n        className: 'string',\n        begin: '\"(' + HTTP_VERBS.join(\"|\") + ')', end: '\"',\n        keywords: HTTP_VERBS.join(\" \"),\n        illegal: '\\\\n',\n        relevance: 5,\n        contains: [{\n          begin: 'HTTP/[12]\\\\.\\\\d',\n          relevance:5\n        }]\n      },\n      // Dates\n      {\n        className: 'string',\n        // dates must have a certain length, this prevents matching\n        // simple array accesses a[123] and [] and other common patterns\n        // found in other languages\n        begin: /\\[\\d[^\\]\\n]{8,}\\]/,\n        illegal: '\\\\n',\n        relevance: 1\n      },\n      {\n        className: 'string',\n        begin: /\\[/, end: /\\]/,\n        illegal: '\\\\n',\n        relevance: 0\n      },\n      // User agent / relevance boost\n      {\n        className: 'string',\n        begin: '\"Mozilla/\\\\d\\\\.\\\\d \\\\\\(', end: '\"',\n        illegal: '\\\\n',\n        relevance: 3\n      },\n      // Strings\n      {\n        className: 'string',\n        begin: '\"', end: '\"',\n        illegal: '\\\\n',\n        relevance: 0\n      }\n    ]\n  };\n}\n\nmodule.exports = accesslog;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/accesslog.js?");

/***/ })

}]);