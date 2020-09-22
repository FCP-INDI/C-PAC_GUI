(window["webpackJsonp_name_"] = window["webpackJsonp_name_"] || []).push([["react-syntax-highlighter_languages_highlight_taggerscript"],{

/***/ "./node_modules/highlight.js/lib/languages/taggerscript.js":
/*!*****************************************************************!*\
  !*** ./node_modules/highlight.js/lib/languages/taggerscript.js ***!
  \*****************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/*\nLanguage: Tagger Script\nAuthor: Philipp Wolfer <ph.wolfer@gmail.com>\nDescription: Syntax Highlighting for the Tagger Script as used by MusicBrainz Picard.\nWebsite: https://picard.musicbrainz.org\n */\nfunction taggerscript(hljs) {\n\n  var COMMENT = {\n    className: 'comment',\n    begin: /\\$noop\\(/,\n    end: /\\)/,\n    contains: [{\n      begin: /\\(/,\n      end: /\\)/,\n      contains: ['self', {\n        begin: /\\\\./\n      }]\n    }],\n    relevance: 10\n  };\n\n  var FUNCTION = {\n    className: 'keyword',\n    begin: /\\$(?!noop)[a-zA-Z][_a-zA-Z0-9]*/,\n    end: /\\(/,\n    excludeEnd: true\n  };\n\n  var VARIABLE = {\n    className: 'variable',\n    begin: /%[_a-zA-Z0-9:]*/,\n    end: '%'\n  };\n\n  var ESCAPE_SEQUENCE = {\n    className: 'symbol',\n    begin: /\\\\./\n  };\n\n  return {\n    name: 'Tagger Script',\n    contains: [\n      COMMENT,\n      FUNCTION,\n      VARIABLE,\n      ESCAPE_SEQUENCE\n    ]\n  };\n}\n\nmodule.exports = taggerscript;\n\n\n//# sourceURL=webpack://%5Bname%5D/./node_modules/highlight.js/lib/languages/taggerscript.js?");

/***/ })

}]);