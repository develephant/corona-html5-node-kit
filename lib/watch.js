//-----------------------------------------------------------------------------
// Corona HTML5 Watcher
//-----------------------------------------------------------------------------
const bs = require("browser-sync").create()

const path = require('path')
const paths = require('./paths')
const { pp } = require('./clr')

const conf = require('./corona_conf')

function run(withDebug) {

  let corona_conf = conf()

  let debugPage = null
  if (withDebug) {
    debugPage = 'index-debug.html'
  }

  bs.watch(path.join(corona_conf.dstPath, corona_conf.appName, '/*.data'), function(event, file) {
    if (event == 'change') {
      pp.info("Reloading Browser...")
      bs.reload()
    }
  })

  bs.init({
    server: path.join(corona_conf.dstPath, corona_conf.appName),
    startPath: debugPage || '/',
    files: path.join(corona_conf.dstPath, corona_conf.appName),
    injectChanges: false,
    reloadDelay: 2000,
    ui: false,
  })
}

module.exports = run
