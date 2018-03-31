# Corona HTML5 Node Kit

___Build Corona HTML5 plugins using NodeJS, NPM, and modern JavaScript.___

## Installation

### NodeJS

Install __[NodeJS](https://nodejs.org)__ for _macOS_ or _Windows_.

### Corona HTML5 Node Kit

```
npm install -g @develephant/corona-html5-node-kit
```

The CLI will available globally via command line as `coronakit`.

## Overview

The _Corona HTML5 Node Kit_ is a framework for creating [Corona HTML5](https://coronalabs.com) plugins using NodeJS and modern JavaScript (ES6). 

As a developer, you also have access to the __[npm](https://npm.org)__ package library that can be used in your plugin development.

The "Kit" is geared toward developers who have a background in writing modern JavaScript, and working with NodeJS in particular.

The "Kit" has been setup to compile your plugin source down to ES5 against the most used versions of browser engines ___that will work with Corona HTML5 projects___*.

The current compilation targets are:

 - IE (11)
 - Edge (16)
 - Firefox (58)
 - Chrome (65)
 - Safari (11.2)
 - Opera (50)
 - iOS Safari (11)
 - Chrome Android (64)

* _Targets are determined from [this chart](https://caniuse.com/#search=webgl), under the "Usage relative" section._

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
  - A browser _debug_ session will start and automatically update on each [build](#build)


From this point on, use your original command line session to issue [compile](#compile) and [build](#build) commands as you work on your plugin.

## CLI Commands

### init

Initialize a new _Corona HTML5 Node Kit_ framework.

```
coronakit init --app <DemoAppName> --plugin <myplugin> --id <com.me>
```

__Arguments__

|Name|Description|Required|
|----|-----------|--------|
|`--app`|Name of the demo application that will be created to test your plugin.|__Y__|
|`--plugin`|Name of the plugin. Lowercase alpha-numeric, no spaces, no dashes.|__Y__|
|`--id`|Your plugin _publisherId_ in reverse domain form (EX: com.develephant)|__Y__|

__Example__

```
coronakit init --app FortuneCookie --plugin fortune --id com.develephant
```

### compile

Compile the JS sources to plugin form. Compiled JS is output to your demo project directory and the __output_plugin__ directory.

```
coronakit compile
```

### build

Generate an HTML5 build of your demo project. Build output will be added to the __output_html/<project\>__ directory.

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

## Support

Visit the __[Corona HTML5 Forums](https://forums.coronalabs.com/forum/637-html5/)__ for help and discussions.

---

&copy;2018 C.Byerley ([develephant](https://develephant.com))