// - run this before we run browserify
// - produces final css bundle and manifest for browser version of `cmify` module

require('babel/register')
var cmify = require('cmify')
cmify.init({ rootDir: __dirname })

var html = require('./index.js')

module.exports = {
  manifest: cmify.getManifest(),
  css: cmify.getCss(),
  html: html
}
