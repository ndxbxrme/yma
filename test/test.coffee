localServer = require 'local-web-server'
puppeteer = require 'puppeteer'
global.navigator =
  userAgent: 'summat'
browser = null
page = null
ws = null
makeServer = (path) ->
  ws = localServer.create
    port: 23232
    directory: path
    spa: 'index.html'
gotoPage = (path, puppeteerOptions) ->
  browser = await puppeteer.launch puppeteerOptions
  page = await browser.newPage()
  await page.goto 'http://localhost:23232/' + (path or '')
closePage = ->
  await browser.close()
  ws.server.close()
waitForRendered = ->
  await page.evaluate () ->
    new Promise (resolve) ->
      window.app.$once 'rendered', ->
        resolve()
      window.app.render()


exports.ymaTest =
  "Should make an app": (test) ->
    app = require('../dist/index') 'myApp'
    test.equal app.appName, 'myApp', 'Name check'
    test.done()
  "Should make a scope": (test) ->
    app = require('../dist/index') 'myApp'
    scope = app.Scope()
    test.ok scope.$id
    test.done()
  "Should make a component": (test) ->
    app = require('../dist/index') 'myApp'
    app.component 'myComponent', (app) ->
      (scope, elem, props) ->
        console.log 'controller'
    test.equal typeof(app.$getComponents()['MYCOMPONENT']), 'function'
    test.done()
  "Should make a child scope": (test) ->
    app = require('../dist/index') 'myApp'
    parentScope = app.Scope()
    parentScope.myname = 'buddy'
    childScope = app.Scope(parentScope)
    test.equal childScope.$parent, parentScope
    test.equal parentScope.$children[0], childScope
    test.equal childScope.myname, 'buddy'
    test.done()
  "Should set scoped vars": (test) ->
    app = require('../dist/index') 'myApp'
    scope = app.Scope()
    app.$setScopeVar 'testThing', 'test', scope
    test.equal scope.testThing, 'test'
    app.$setScopeVar 'arr[4].name', 'buddy', scope
    test.equal scope.arr[4].name, 'buddy'
    test.done()
  "Should bootstrap an app": (test) ->
    makeServer 'test/basic'
    await gotoPage ''
    await waitForRendered()
    elements = await page.evaluate () -> window.app.$getElements()
    scopes = await page.evaluate () -> window.app.$getScopes()
    test.ok elements.$scope
    test.equal Object.keys(scopes).length, 1
    await closePage()
    test.done()
  "Should evaluate text": (test) ->
    makeServer 'test/eval-string'
    await gotoPage ''
    await waitForRendered()
    str = await page.evaluate () -> document.querySelector('app').innerHTML
    test.equal str, 'Test string'
    await closePage()
    test.done()
  "Should render app component": (test) ->
    makeServer 'test/app-component'
    await gotoPage ''
    await waitForRendered()
    str = await page.evaluate () -> document.querySelector('app').innerHTML
    test.equal str, '<h1>App component</h1>'
    await closePage()
    test.done()
  "Should render app controller": (test) ->
    makeServer 'test/controller'
    await gotoPage ''
    await waitForRendered()
    str = await page.evaluate () -> document.querySelector('app').innerHTML
    test.equal str, '<h1>APP CONTROLLER</h1>'
    await closePage()
    test.done()
  "Should render sub components": (test) ->
    makeServer 'test/sub-component'
    await gotoPage ''
    await waitForRendered()
    str = await page.evaluate () -> document.querySelector('app').innerHTML
    test.equal str, '<div>APP CONTROLLER<sub-component thing="thing1"><h1>THING1</h1></sub-component><sub-component thing="thing2"><h1>THING2</h1></sub-component></div>'
    await closePage()
    test.done()
  "Should update an element": (test) ->
    makeServer 'test/update-element'
    await gotoPage ''
    await waitForRendered()
    str = await page.evaluate () -> document.querySelector('app').innerHTML
    await page.evaluate () ->
      new Promise (resolve) ->
        window.app.$once 'updated', ->
          resolve()
        window.doUpdate()
    str = await page.evaluate () -> document.querySelector('app').innerHTML
    test.equal str, 'maggie'
    await closePage()
    test.done()
