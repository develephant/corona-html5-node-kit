#! /usr/bin/env node

//-----------------------------------------------------------------------------
// Corona HTML5 ES6 Plugin CLI
//-----------------------------------------------------------------------------
const core = require('./lib/core')
const compile = require('./lib/compile')
const build = require('./lib/build')
const watch = require('./lib/watch')

const pkg = require('./package')
const ArgParser = require('argparse').ArgumentParser

const { pp } = require("./lib/clr")

const parser = new ArgParser({
  description: "Corona HTML5 Watcher",
  version: pkg.version,
  allowAbbrev: false,
  epilog: '(c)2018 C. Byerley [develephant]'
})

parser.addArgument('action', {
  help: "Corona HTML5 Watcher",
  choices: [
    'init',
    'compile',
    'build',
    'watch',
    'debug'
  ]
})

parser.addArgument('--app',
{help: 'The application name.',
metavar: 'APP_NAME'})

parser.addArgument('--plugin',
{help: 'The application name.',
metavar: 'PLUGIN'})

parser.addArgument('--id',
{help: 'The html output directory.',
metavar: 'HTML_DIR'})

const args = parser.parseArgs()

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
    watch()
    break
  case 'debug':
    watch(true)
    break
}