const os = require('os')
const shell = require('shelljs')
const path = require('path')
const paths = require('./paths')
const { pp } = require('./clr')

let scaffold  = require('./scaffold')

function create_package_lua(app_name, plugin) {
  pp.info("Creating package.lua...")

  let package_lua = path.join(paths.base, 'package.lua')

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
}

function run(app_name, plugin, publisher) {
  create_package_lua(app_name, plugin)
  scaffold(app_name, plugin, publisher)
}

module.exports = run