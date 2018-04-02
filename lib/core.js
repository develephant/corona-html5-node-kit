//-----------------------------------------------------------------------------
// Corona HTML5 Node Kit - Plugin Builder
// (c)2018 C. Byerley (develephant)
//-----------------------------------------------------------------------------
const os = require('os')
const path = require('path')
const shell = require('shelljs')

const { pp } = require('./clr')
const paths = require('./paths')
const scaffold  = require('./scaffold')

function create_package_lua(app_name, plugin) {

  let package_lua = path.join(paths.base, 'package.lua')

  if (shell.test('-f', package_lua)) {
    pp.dashes()
    pp.warn("package.lua already exists. Exiting.")
    pp.dashes()
    return 1
  } else {
    pp.dashes()
    pp.info("Creating package.lua...") 
  }

  shell.cp(path.join(paths.cli.tpl, 'package_tpl.lua'), package_lua)

  let output_html5_path = paths.output_html5
  let project_path = path.join(paths.project, app_name)

  if (os.platform == 'win32') {
    output_html5_path = output_html5_path.replace(/\\/g, "\\\\")
    project_path = project_path.replace(/\\/g, "\\\\")
  }

  shell.sed('-i', 'PLUGIN', plugin, package_lua)
  shell.sed('-i', 'APPNAME', app_name, package_lua)
  shell.sed('-i', 'DESTDIR', output_html5_path, package_lua)
  shell.sed('-i', 'PROJECTPATH', project_path, package_lua)

  pp.log("Done")
  pp.dashes()

  return 0
}

function run(app_name, plugin, publisher) {
  let code = create_package_lua(app_name, plugin)
  if (code === 0) {
    scaffold(app_name, plugin, publisher)
  }
}

module.exports = run
