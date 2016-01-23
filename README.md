# angular-ladda-lw

[![Build Status](https://travis-ci.org/aeharding/angular-ladda-lw.svg?branch=master)](https://travis-ci.org/aeharding/angular-ladda-lw)
[![Coverage Status](https://coveralls.io/repos/github/aeharding/angular-ladda-lw/badge.svg?branch=master)](https://coveralls.io/github/aeharding/angular-ladda-lw?branch=master)
[![npm version](https://badge.fury.io/js/angular-ladda-lw.svg)](https://badge.fury.io/js/angular-ladda-lw)
[![Bower version](https://badge.fury.io/bo/angular-ladda-lw.svg)](https://badge.fury.io/bo/angular-ladda-lw)

![Preview](http://i.imgur.com/6QZvPo4.gif)

A lightweight ladda alternative for Angular. [[Demo]](http://aeharding.github.io/angular-ladda-lw/)

### Requirements

  * Angular
  * ngAnimate

## Install

```
bower install angular-ladda-lw --save
```
or
```
npm install angular-ladda-lw --save
```

### Files

You need the js and css files.

```
bower_components/angular-ladda-lw/dist/angular-ladda-lw.js
bower_components/angular-ladda-lw/dist/angular-ladda-lw.css
```

You can also use the `angular-ladda-lw.min.*` if you want.

### Module name
```js
angular.module('myApp', ['angular-ladda-lw']);
```

### Example
```html
<button class="my-button" ladda="ctrl.loading" ng-click="ctrl.doThing(thing)">Hello, world!</button>
```
```js
this.doThing = thing => {
  this.loading = true;
  MyService.doThing(thing).then(res => {
    // TODO
  }, err => {
    // Stuff broke
  }).finally(() => {
    this.loading = false;
  });
}
```

## Develop

```
npm install -g babel-cli babel-preset-es2015 node-sass uglify-js sass-lint eslint karma-cli
npm install
npm start
```

## Bonus!

The spinner is stolen from [chieffancypants/angular-loading-bar](https://github.com/chieffancypants/angular-loading-bar), so if you decide to use that, this project will look consistent and professional. :)
