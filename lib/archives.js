//-----------------------------------------------------------------------------
// Archive Util
//-----------------------------------------------------------------------------
const fs = require("fs")
const archiver = require("archiver")
const path = require("path")
const paths = require("./paths")
const conf = require("./corona_conf")

function createDemoArchive(config) {
  let demo_zip = config.appName+'.zip'
  let output = fs.createWriteStream(path.join(paths.base, demo_zip))

  let archive = archiver('zip', {
    zlib: { level: 9 }
  })

  output.on('close', () => {
    console.log('Demo archive is complete')
  })

  archive.on('error', (err) => {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output);

  archive.directory(path.join(config.projectPath, '/'), false )

  archive.finalize()
}

function createPluginArchive(config) {
  let plugin_zip = config.plugin+'Plugin.zip'
  let output = fs.createWriteStream(path.join(paths.base, plugin_zip))

  let archive = archiver('zip', {
    zlib: { level: 9 }
  })

  output.on('close', () => {
    console.log('Plugin archive complete')
  })

  archive.on('error', (err) => {
    throw err
  })

  // pipe archive data to the file
  archive.pipe(output);

  archive.directory(path.join(paths.output_plugin, '/'), false )

  archive.finalize()
}

function run() {
  let config = conf()
  createDemoArchive(config)
  createPluginArchive(config)
}

module.exports = run