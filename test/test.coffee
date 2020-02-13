localServer = require 'local-web-server'
ws = localServer.create
  port: 23232
  directory: 'test'
puppeteer = require 'puppeteer'
global.navigator =
  userAgent: 'summat'

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
  "Shold load a page": (test) ->
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto 'http://localhost:23232/basic/test-basic.html'
    setTimeout ->
      console.log await page.content()
      await browser.close()
      test.done()
      ws.server.close()
