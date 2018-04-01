//-----------------------------------------------------------------------------
// Corona HTML5 Node Kit - Plugin Builder
// (c)2018 C. Byerley (develephant)
//-----------------------------------------------------------------------------
const path = require('path')

const clibase = path.resolve(__dirname, '..')
const libbase = path.join(clibase, 'lib')
const appbase = process.cwd()

module.exports = {
  base: appbase,
  utils: path.join(appbase, 'utils'),
  project: path.join(appbase, 'corona_project'),
  plugin_src: path.join(appbase, 'js_plugin_src'),
  output_html5: path.join(appbase, 'output_html5'),
  output_plugin: path.join(appbase, 'output_plugin'),
  cli: {
    base: clibase,
    tpl: path.join(clibase, 'tpl'),
    utils: path.join(clibase, 'utils'),
    project: path.join(clibase, 'tpl', 'project'),
    plugin_src: path.join(clibase, 'tpl', 'js_plugin_src')
  }
}
