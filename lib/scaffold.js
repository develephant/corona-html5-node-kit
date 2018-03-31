//-----------------------------------------------------------------------------
// Corona HTML5 Plugin Scaffold
//-----------------------------------------------------------------------------
const path = require('path')
const shell = require('shelljs')

const { pp } = require('./clr')
const paths = require('./paths')

function build(app_name) {
  //create ouput_html5 dir
  shell.mkdir('-p', paths.output_html5)

  //create output_plugin dir
  shell.mkdir('-p', paths.output_plugin)

  //create app dir
  shell.mkdir('-p', paths.project)

  //copy corona_project
  shell.cp('-R', paths.cli.project, paths.project)

  //copy js_source
  shell.cp('-R', paths.cli.plugin_src, paths.plugin_src)

  //copy USAGE.md
  shell.cp(path.join(paths.cli.tpl, 'USAGE.md'), paths.base)

  //copy .gitignore
  shell.cp(path.join(paths.cli.tpl, 'gitignore'), path.join(paths.base, '.gitignore'))

  //copy package.json
  shell.cp('-R', path.join(paths.cli.tpl, 'package.json'), path.join(paths.base, 'package.json'))

}

function rename(app_name, plugin) {
  //project dir
  shell.mv(path.join(paths.project, 'project'), path.join(paths.project, app_name))
  //plugin_js
  shell.mv(path.join(paths.plugin_src, 'myplugin_js.js'), path.join(paths.plugin_src, plugin+'_js.js'))
  //plugin stub
  shell.mv(path.join(paths.project, app_name, 'myplugin.lua'), path.join(paths.project, app_name, plugin+'.lua'))
}

function replace(app_name, plugin, publisher) {
  //pacage json
  shell.sed('-i', 'APPNAME', app_name, path.join(paths.base, 'package.json'))
  //plugin stub
  shell.sed('-i', 'PUBLISHER_ID', publisher, path.join(paths.project, app_name, plugin+'.lua'))
  shell.sed('-i', 'myplugin', plugin, path.join(paths.project, app_name, plugin+'.lua'))
  //plugin_js
  shell.sed('-i', 'myplugin', plugin, path.join(paths.plugin_src, plugin+'_js.js'))
  //main.lua
  shell.sed('-i', 'myplugin', plugin, path.join(paths.project, app_name, 'main.lua'))
  shell.sed('-i', '\"myplugin\"', '"'+plugin+'"', path.join(paths.project, app_name, 'main.lua'))
  shell.sed('-i', '\"myplugin is alive!\"', '"'+plugin+' is alive!"', path.join(paths.project, app_name, 'main.lua'))
}
 
function run(app_name, plugin, publisher) {
  pp.info("Building directories...")

  build(app_name)
  rename(app_name, plugin)
  replace(app_name, plugin, publisher)

  pp.log("Done")

  //run npm
  pp.info("Installing dependencies...")

  shell.cd(paths.base)
  shell.exec('npm i', {silent:true})

  pp.dashes()
  pp.ok("Initialzation is all Done!")
  pp.dashes()
}

module.exports = run
