(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_roboconf"],{

/***/ "./node_modules/highlight.js/lib/languages/roboconf.js":
/*!*************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/roboconf.js ***!
  \*************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Roboconf\nAuthor: Vincent Zurczak <vzurczak@linagora.com>\nDescription: Syntax highlighting for Roboconf's DSL\nWebsite: http://roboconf.net\nCategory: config\n*/\n\nfunction roboconf(hljs) {\n  var IDENTIFIER = '[a-zA-Z-_][^\\\\n{]+\\\\{';\n\n  var PROPERTY = {\n    className: 'attribute',\n    begin: /[a-zA-Z-_]+/, end: /\\s*:/, excludeEnd: true,\n    starts: {\n      end: ';',\n      relevance: 0,\n      contains: [\n        {\n          className: 'variable',\n          begin: /\\.[a-zA-Z-_]+/\n        },\n        {\n          className: 'keyword',\n          begin: /\\(optional\\)/\n        }\n      ]\n    }\n  };\n\n  return {\n    name: 'Roboconf',\n    aliases: ['graph', 'instances'],\n    case_insensitive: true,\n    keywords: 'import',\n    contains: [\n      // Facet sections\n      {\n        begin: '^facet ' + IDENTIFIER,\n        end: '}',\n        keywords: 'facet',\n        contains: [\n          PROPERTY,\n          hljs.HASH_COMMENT_MODE\n        ]\n      },\n\n      // Instance sections\n      {\n        begin: '^\\\\s*instance of ' + IDENTIFIER,\n        end: '}',\n        keywords: 'name count channels instance-data instance-state instance of',\n        illegal: /\\S/,\n        contains: [\n          'self',\n          PROPERTY,\n          hljs.HASH_COMMENT_MODE\n        ]\n      },\n\n      // Component sections\n      {\n        begin: '^' + IDENTIFIER,\n        end: '}',\n        contains: [\n          PROPERTY,\n          hljs.HASH_COMMENT_MODE\n        ]\n      },\n\n      // Comments\n      hljs.HASH_COMMENT_MODE\n    ]\n  };\n}\n\nmodule.exports = roboconf;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/roboconf.js?");

/***/ })

}]);