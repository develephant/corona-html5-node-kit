const luaparse = require('luaparse')
const read = require("read-file")
const path = require("path")
const paths = require("./paths")

function run() {
  //Get Corona package config
  var corona_conf = {};
  var luapackage = path.join(paths.base, 'package.lua');
  var luabuild = read.sync(luapackage).toString();
  var ast = luaparse.parse(luabuild);
  var fields = ast.body[0].init[0].fields;
  fields.map((val, idx) => {
    corona_conf[val.key.name] = val.value.value;
  });

  return corona_conf
}

module.exports = run