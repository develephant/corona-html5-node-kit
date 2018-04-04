//-----------------------------------------------------------------------------
// Corona HTML5 Node Kit - Plugin Builder
// (c)2018 C. Byerley (develephant)
//-----------------------------------------------------------------------------
const path = require('path')
const bs = require("browser-sync").create()

const { pp } = require('./clr')
const paths = require('./paths')
const conf = require('./corona_conf')

function run(withDebug, proxy) {

  let corona_conf = conf()

  if (!corona_conf) { //conf not found
    return
  }

  let debugPage = null
  if (withDebug) {
    debugPage = 'index-debug.html'
  }

  bs.watch(path.join(corona_conf.dstPath, corona_conf.appName, '/*.data'), function(event, file) {
    if (event == 'change' || event == 'add') {
      bs.reload()
    }
  })

  if (proxy) {
    bs.init({
      proxy: proxy,
      serveStatic: [path.join(corona_conf.dstPath, corona_conf.appName)],
      startPath: debugPage || '/',
      injectChanges: false,
      reloadDelay: 1000,
      notify: false,
      ui: false
    })
  } else {
    bs.init({
      server: path.join(corona_conf.dstPath, corona_conf.appName),
      startPath: debugPage || '/',
      injectChanges: false,
      reloadDelay: 1000,
      notify: false,
      ui: false
    })
  }

}

module.exports = run
