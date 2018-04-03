//-----------------------------------------------------------------------------
// Corona HTML5 Node Kit - Plugin Builder
// (c)2018 C. Byerley (develephant)
//-----------------------------------------------------------------------------
const os = require("os")
const path = require("path")
const shell = require("shelljs")

const { pp } = require("./clr")
const paths = require("./paths")
const conf = require('./corona_conf')

function run(doClean) {
  let corona_conf = conf()
  let luapackage = path.join(paths.base, 'package.lua');

  if (os.platform() == 'darwin') {

    if (doClean) {
      shell.rm('-rf', path.join(corona_conf.dstPath, corona_conf.appName, '/*'))
    }

    shell.cd(path.join(paths.cli.utils, 'macos'))
   
    pp.dashes()
    pp.info("Sending Build Request...")
    pp.dashes()
    
    let code = shell.exec('./make.sh '+luapackage).code

    if (code !== 0) {
      pp.dashes()
      pp.err("Build Request Failed!")
      pp.dashes()
    } else {
      pp.dashes()
      pp.ok("Build Request Done.")
      pp.dashes()
    }

  } else if (os.platform() == 'win32') {

    if (doClean) {
      shell.rm('-rf', path.join(corona_conf.dstPath, corona_conf.appName, '/*'))
    }

    shell.cd(path.join(paths.cli.utils, 'win32'))
    
    pp.dashes()
    pp.info("Sending Build Request...")
    pp.dashes()

    let code = shell.exec('make.cmd "'+luapackage+'"').code 
    
    if (code !== 0) {
      pp.dashes()
      pp.err("Build Request Failed!")
      pp.dashes()
    } else {
      pp.dashes()
      pp.ok("Build Request Done.")
      pp.dashes()
    }     

  } else {
    pp.dashes()
    pp.err('Not available on this platform.')
    pp.dashes()
  }
}

module.exports = run
