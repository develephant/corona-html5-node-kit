//-----------------------------------------------------------------------------
// Corona HTML5 Node Kit - Plugin Builder
// (c)2018 C. Byerley (develephant)
//-----------------------------------------------------------------------------
const fs = require("fs")
const path = require("path")
const shell = require("shelljs")
const luaparse = require("luaparse")

const paths = require("./paths")
const { pp } = require("./clr")

function run() {
  //Get Corona package config

  //check if package.lua exists
  if (!shell.test('-f', path.join(paths.base, 'package.lua'))) {
    pp.dashes()
    pp.err("package.lua was not found, aborting. Are you in the root directory?")
    pp.dashes()
    return false
  }

  let corona_conf = {}

  let luabuild = fs.readFileSync(path.join(paths.base, 'package.lua'), "utf8")

  let ast = luaparse.parse(luabuild)
  let fields = ast.body[0].init[0].fields
  fields.map((val, idx) => {
    corona_conf[val.key.name] = val.value.value
  });

  return corona_conf
}

module.exports = run