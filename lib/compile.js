const fs = require("fs")
const path = require("path")
const browserify = require("browserify")
const babelify = require("babelify")
const uglifyjs = require("uglify-es")
const shell = require("shelljs")

const paths = require("./paths")
const conf = require("./corona_conf")
const { pp } = require('./clr')

let targets = {
  "ie": 11,
  "edge": 16,
  "firefox": 58,
  "chrome": 65,
  "safari": 11,
  "opera": 50,
  "ios": "11.2",
  "android": 64  
}

function run() {

  pp.info("Compiling plugin...")

  let corona_conf = conf()
  let plugin = corona_conf.plugin
  let app_name = corona_conf.appName

  let ws = fs.createWriteStream(path.join(paths.output_plugin, plugin+"_js.js"))

  browserify(path.join(paths.plugin_src, plugin+"_js.js"))
    .transform(babelify.configure({
      presets: [ 
        [ "env", { "targets": targets, "modules": false, "loose": true } ],
        [ "minify" ]
      ]
    }))
    .bundle()
    .pipe(ws)

    ws.on('finish', () => {
      fs.writeFileSync(path.join(paths.project, app_name, plugin+"_js.js"), uglifyjs.minify({
        [plugin+"_js.js"]: fs.readFileSync(path.join(paths.output_plugin, plugin+"_js.js"), "utf8")
      }).code, "utf8");

      pp.ok("All Done!")
    })

}

module.exports = run