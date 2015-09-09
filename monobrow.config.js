var babelify = require('babelify')
var path = require('path')
var fs = require('fs')
var through = require('through2')

// - first run "render" to get the manifest
// - then hijack `cmify` so that it has exactly the information it needs

var cmifyPlugin = function (b, opts) {
  b.on('bundle', function () {
    var cssData = require('./src/render-css')

    fs.writeFileSync(__dirname + '/dist/main.css', cssData.css)

    b.pipeline.get('deps').push(through.obj(function (row, enc, next) {
      // swap out the cmify module
      if (row.file.indexOf('node_modules/cmify/browser.js') !== -1) {
        row.source = 'var manifest = ' + JSON.stringify(cssData.manifest) + '; module.exports=function (f) { return manifest[f] }';
        this.push(row)
      }
      else {
        this.push(row)
      }

      next()
    }))
  })
}

module.exports = {
  entry: 'src/index.js',
  outfile: 'dist/index.js',
  verbose: true,

  watch: !!process.env.WATCH,
  minify: !!process.env.MINIFY,

  setup: function (b) {
    b.transform(babelify)
    b.plugin(cmifyPlugin)
  }
}
