'use strict';
module.exports = {
  plugins: [
    'plugins/markdown',
    "plugins/summarize",
    "plugins/shout"
  ],
  "recurseDepth": 10,
  "templates": {
    "default": {
      "includeDate": false,
      "layoutFile": "layout.tmpl"
    }
  }
};