const fs = require("fs")
const path = require("path")
const luaparse = require("luaparse")
// const read = require("read-file")

const paths = require("./paths")

function run() {
  //Get Corona package config
  let corona_conf = {}
  //let luapackage = path.join(paths.base, 'package.lua')

  let luabuild = fs.readFileSync(path.join(paths.base, 'package.lua'), "utf8")
  // var luabuild = read.sync(luapackage).toString();

  let ast = luaparse.parse(luabuild)
  let fields = ast.body[0].init[0].fields
  fields.map((val, idx) => {
    corona_conf[val.key.name] = val.value.value
  });

  return corona_conf
}

module.exports = run