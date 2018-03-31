const os = require("os")
const path = require("path")
const shell = require("shelljs")

const { pp } = require("./clr")
const paths = require("./paths")

function run() {

  let luapackage = path.join(paths.base, 'package.lua');

  if (os.platform() == 'darwin') {

    shell.cd(path.join(paths.cli.utils, 'macos'))
    
    pp.info("Sent Build Request...")
    
    shell.exec('./make.sh '+luapackage, function(code) {
      if (code === 0) {
        pp.ok("Build Request Done.")
      }
    })

  } else if (os.platform() == 'win32') {

    shell.cd(path.join(paths.cli.utils, 'win32'))
    
    pp.info("Sent Build Request...")
    
    shell.exec('make.bat "'+luapackage+'"', function(code) {
      if (code === 0) {
        pp.ok("Build Request Done.")
      }
    })      

  } else {
    pp.err('Not available on this platform.')
  }
}

module.exports = run
