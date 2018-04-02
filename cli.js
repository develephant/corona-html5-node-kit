#! /usr/bin/env node

//-----------------------------------------------------------------------------
// Corona HTML5 Node Kit - Plugin Builder
// (c)2018 C. Byerley (develephant)
//-----------------------------------------------------------------------------
const core = require('./lib/core')
const compile = require('./lib/compile')
const build = require('./lib/build')
const watch = require('./lib/watch')

const pkg = require('./package')
const ArgParser = require('argparse').ArgumentParser

const { pp } = require("./lib/clr")

const parser = new ArgParser({
  description: "Corona HTML5 Node Kit",
  version: pkg.version,
  allowAbbrev: false,
  epilog: '(c)2018 C. Byerley [develephant]'
})

let subparsers = parser.addSubparsers({
  title: "commands",
  dest: "action",
  addHelp: true,
  help: "Use {command} -h for argument details."
})

let init_parser = subparsers.addParser('init', {
  help: "Initialize a new Corona HTML5 Node Kit project.",
})
init_parser.addArgument('--app', {
  action: 'store',
  help: "Name of the demo application to test your plugin.",
  required: true,
  metavar: "APP_NAME"
})

init_parser.addArgument('--plugin', {
  action: 'store',
  help: "Full path to the HTML5 output directory.",
  required: true,
  metavar: "PLUGIN_NAME"
})

init_parser.addArgument('--id', {
  action: 'store',
  help: "Plugin publisherId in reverse domain form.",
  required: true,
  metavar: "PUBLISHER_ID"
})

let compile_parser = subparsers.addParser('compile', { 
  help: "Compile the JS sources to plugin format.",
})

let build_parser = subparsers.addParser('build', { 
  help: "Build the Corona HTML5 demo project output."
})

let watch_parser = subparsers.addParser('watch', {
  help: "Start a live browser session of the project."
})
watch_parser.addArgument(['-d', '--debug'], {
  action: 'storeTrue',
  help: "Open as debug session (index-debug.html).",
  defaultValue: false
})
watch_parser.addArgument('--proxy', {
  action: 'store',
  help: "A proxy address for the session.",
  metavar: "PROXY_ADDR"
})

// parser.addArgument('action', {
//   help: "Corona HTML5 Watcher",
//   choices: [
//     'init',
//     'compile',
//     'build',
//     'watch',
//     'debug'
//   ]
// })

// parser.addArgument('--app',
// {help: 'The application name.',
// metavar: 'APP_NAME'})

// parser.addArgument('--plugin',
// {help: 'The application name.',
// metavar: 'PLUGIN'})

// parser.addArgument('--id',
// {help: 'The html output directory.',
// metavar: 'HTML_DIR'})

// parser.addArgument('--proxy',
// {help: 'Proxy address. For watch and debug command.',
// metavar: 'PROXY_ADDR'})

let args = parser.parseArgs()

switch(args.action) {
  case 'init':
    pp.dashes()
    pp.title()
    pp.dashes()
    core(args.app, args.plugin, args.id)
    break
  case 'compile':
    compile()
    break
  case 'build':
    build()
    break
  case 'watch':
    watch(args.debug, args.proxy)
    break
}