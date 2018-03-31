const fs = require("fs")
const path = require("path")
const shell = require("shelljs")
const babelify = require("babelify")
const uglifyjs = require("uglify-es")
const browserify = require("browserify")

const { pp } = require('./clr')
const paths = require("./paths")
const conf = require("./corona_conf")

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

  pp.dashes()
  pp.info("Compiling plugin...")

  let corona_conf = conf()
  let plugin = corona_conf.plugin
  let app_name = corona_conf.appName

  let ws = fs.createWriteStream(path.join(paths.output_plugin, plugin+"_js.js"), {encoding: 'utf-8'})

  browserify(path.join(paths.plugin_src, plugin+"_js.js"))
    .transform(babelify.configure({
      presets: [ 
        [ "env", { "targets": targets, "modules": false, "loose": true } ],
        [ "minify" ]
      ]
    }))
    .bundle()
    .pipe(ws)

    ws.on('error', (err) => {
      console.log(err)
      pp.error("A compilation error occurred. See console log.")
      pp.dashes()
    })

    ws.on('finish', () => {
      fs.writeFileSync(path.join(paths.project, app_name, plugin+"_js.js"), uglifyjs.minify({
        [plugin+"_js.js"]: fs.readFileSync(path.join(paths.output_plugin, plugin+"_js.js"), "utf8")
      }).code, "utf8");

      shell.cp(path.join(paths.project, app_name, plugin+".lua"), path.join(paths.output_plugin, plugin+".lua"))
      shell.cp(path.join(paths.project, app_name, plugin+"_js.js"), path.join(paths.output_plugin, plugin+"_js.js"))

      pp.ok("All Done!")
      pp.dashes()
    })

}

module.exports = run