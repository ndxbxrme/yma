# yma [![Build Status](https://travis-ci.org/ndxbxrme/yma.svg?branch=master)](https://travis-ci.org/ndxbxrme/yma)

is a very lightweight frontend framework with no external dependencies or affiliations to evil mega-corporations.

### Benefits
- No event cycle so no unnecessary processor overhead
- Extremely simple and flexible
- Leaves a very clean DOM
- Easy integration with Electron
- Simple and understandable rendering process
- No need to do any fancy class extending (unless really you want to)
- Pure javascipt templating

### Cons
- It's up to you to call `scope.$update()` to push changes to the DOM
- Gives you more than enough rope to hang yourself
- No where near as well thought out or tested as Angular/React

If you're thinking "why do we need another framework?" then you might be better off with Angular or React but if you like living on the edge then stick around.  You might have fun!

## Getting started
```sh
$ git clone https://github.com/ndxbxrme/yma-template-default mynewproject
$ cd mynewproject
$ npm install
$ npm run serve
```
Now you can navigate to [http://localhost:9000](http://localhost:9000) to see what you've made.  
Any changes to the /src folder will be reflected in the browser.

| ...but I don't like coffeescript etc |
|--------------------------------------|
|Don't worry, we've got you covered.  Check out the [Javascript Readme](/README_JAVASCRIPT.md) or the [Typescript Readme](/README_TYPESCRIPT.md) for all you maniacs out there.|

## What's going on?
yma provides a simple templating system and a glue between your script and the DOM.

### App setup
`index.coffee`
```coffeescript
app = require('yma') 'myAppName'
# register components here
.render()
```
`index.pug`
```pug
div(app='myAppName')
```
### Components
Components are declared by passing a name and a function to the ```.component``` function of your app.
```coffeescript
.component 'header', (app) ->
  template: '<h1>{{logo}}</h1>'
  controller: (scope, elem, props) ->
    scope.logo = 'My Company Name'
  pre: (scope, elem, props) ->
    #this function is called in the rendering phase
    #and can be used to alter the DOM (see API section)
  service: ->
    #a long-lived singleton service which can be used to
    #perform background functions or
    #communicate between scopes and is invoked by
    #scope.$use 'component'
    #inside a controller or other service
```
There are a couple more ways of declaring components which we'll cover in the API section.

### Core components
[Yma core components](https://github.com/ndxbxrme/yma-core) provide a basic set of functionalty and should give you a good idea of where to start building your own components.

|component|description|
|---------|-----------|  
|[repeat](https://github.com/ndxbxrme/yma-core#repeat)|Repeats a node or set of nodes for each item in an array  
|[if](https://github.com/ndxbxrme/yma-core#if)|Conditionally renders a node|
|[hide](https://github.com/ndxbxrme/yma-core#hide)|Conditionally adds the class `.yma-hidden` to a node|
|[controller](https://github.com/ndxbxrme/yma-core#controller)|Adds a controller to a node|
|[model](https://github.com/ndxbxrme/yma-core#model)|Hooks a scoped variable up to an input controller|
|[press](https://github.com/ndxbxrme/yma-core#press)|Performs an action on click/mousedown|
|[router](https://github.com/ndxbxrme/yma-core#router)|Simple scene based router|
|[go](https://github.com/ndxbxrme/yma-core#go)|Hooks a press event up to the router|

## API
### App flow
- Render the root element with a blank Scope
- Fill in all templated variables
- Hook up all event listeners
#### on scope.$update() or app.$update()
- Find changed scopes
- Perform a quick pre-render  
  This calls `component.pre()` with `scope.$phase` set to `prerender`
- If update changes the DOM then rerender only the affected nodes
- Fill in templated variables for the updated scopes
- Hook up all event listeners
- Kick back and chill out

### Yma()
Where all things start.    
Exposes these methods.  
Method names starting with $ are mainly for internal use but that shouldn't stop you going bonkers with them.  
Method names starting with a capital letter are for creating class like objects.

|Method|Description|
|------|-----------|
|component(name, fn)| Used for declaring components|
|component(obj)| As above but the components are passed in as an object|
|render()| Call this to get everything going |
|Scope(mergeScope)| Returns a new scope|
|Callbacks()| Makes a new set of callbacks ($on, $off etc).  Used internally, you'll probably never need to touch this|


### More info to come
Yma is in a pre alpha inflationary period and a few things are liable to change... namely this readme file.

### Contributing
We'd love to hear from you if you think you have something to contribute to this project.  I'm not sure how you'd do that that right now but don't worry I'll work it out sooner or later.
