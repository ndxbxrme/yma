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
gotoPage = (path) ->
  browser = await puppeteer.launch()
  page = await browser.newPage()
  await page.goto 'http://localhost:23232/' + (path or '')
closePage = ->
  await browser.close()
  ws.server.close()
waitForRendered = ->
  await page.evaluate () ->
    new Promise (resolve) ->
      window.app.$on 'rendered', ->
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
  "Should bootstrap an app": (test) ->
    makeServer 'test/basic'
    await gotoPage ''
    await waitForRendered()
    elements = await page.evaluate () -> window.app.$getElements()
    scopes = await page.evaluate () -> window.app.$getScopes()
    test.equal elements.length, 1
    test.equal Object.keys(scopes).length, 1
    test.ok scopes[elements[0].scope]
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
