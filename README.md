# Corona HTML5 Node Kit

___Build Corona HTML5 plugins using NodeJS, NPM, and Modern Javascript.___

## Installation

### NodeJS

Install __[NodeJS](https://nodejs.org)__ for _macOS_ or _Windows_.

### Corona HTML5 Node Kit

```
npm install -g @develephant/corona-html5-node-kit
```

The CLI will available globally via command line as `coronakit`.

## Overview

## Workflow

### Initialization

  - Create a new plugin project directory on your system.
  - Point your commnand line program at the new plugin directory.
  - On the command line run `coronakit init <args>` (see [init](#init) below).

### JavaScript

  - Work on your JavaScript in the __js_plugin_src__ directory in the project directory.
  - Compile when needed using `coronakit compile` (see [compile](#compile) below).
  - Compiled JS is output to your demo project directory and the __output_plugin__ directory.

### Build Plugin

  - When you are ready to build the plugin use `coronakit build` (see [build](#build) below).
  - The build output will be added to the __output_html/<project\>__ directory.
  - Upload the __output_html/<project\>__ files or start a [watch](#watch)/[debug](#debug) session.

### Watch / Debug

  - After your first [build](#build) open a new command line session.
  - Point your commnand line program at the plugin directory.
  - On the command line run `coronakit debug` (see [debug](#debug) below).
  - A browser session will start and automatically update on each [build](#build)
  - Use your original command line session to issue [compile](#compile) and [build](#build) commands.

## CLI Commands

### init

Initialize a new _Corona HTML5 Node Kit_ framework.

```
coronakit init --app DemoApp --plugin myplugin --id com.me
```

### compile

Compile the JS sources to plugin form.

```
coronakit compile
```

### build

Generate an HTML5 build of your demo project.

```
coronakit build
```

### watch

Start a live browser session with your demo build.

```
coronakit watch
```

### debug

Start a live browser session with your debug demo build.

```
coronakit debug
```

---

&copy;2018 C.Byerley ([develephant](https://develephant.com))