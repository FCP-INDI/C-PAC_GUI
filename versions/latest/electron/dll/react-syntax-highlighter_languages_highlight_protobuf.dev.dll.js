(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_protobuf"],{

/***/ "./node_modules/highlight.js/lib/languages/protobuf.js":
/*!*************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/protobuf.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Protocol Buffers\nAuthor: Dan Tao <daniel.tao@gmail.com>\nDescription: Protocol buffer message definition format\nWebsite: https://developers.google.com/protocol-buffers/docs/proto3\nCategory: protocols\n*/\n\nfunction protobuf(hljs) {\n  return {\n    name: 'Protocol Buffers',\n    keywords: {\n      keyword: 'package import option optional required repeated group oneof',\n      built_in: 'double float int32 int64 uint32 uint64 sint32 sint64 ' +\n        'fixed32 fixed64 sfixed32 sfixed64 bool string bytes',\n      literal: 'true false'\n    },\n    contains: [\n      hljs.QUOTE_STRING_MODE,\n      hljs.NUMBER_MODE,\n      hljs.C_LINE_COMMENT_MODE,\n      hljs.C_BLOCK_COMMENT_MODE,\n      {\n        className: 'class',\n        beginKeywords: 'message enum service', end: /\\{/,\n        illegal: /\\n/,\n        contains: [\n          hljs.inherit(hljs.TITLE_MODE, {\n            starts: {endsWithParent: true, excludeEnd: true} // hack: eating everything after the first title\n          })\n        ]\n      },\n      {\n        className: 'function',\n        beginKeywords: 'rpc',\n        end: /[{;]/, excludeEnd: true,\n        keywords: 'rpc returns'\n      },\n      {\n        begin: /^\\s*[A-Z_]+/,\n        end: /\\s*=/, excludeEnd: true\n      }\n    ]\n  };\n}\n\nmodule.exports = protobuf;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/protobuf.js?");

/***/ })

}]);