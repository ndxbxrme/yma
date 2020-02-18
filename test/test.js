// Generated by CoffeeScript 2.5.1
(function() {
  var browser, closePage, gotoPage, localServer, makeServer, page, puppeteer, waitForRendered, ws;

  localServer = require('local-web-server');

  puppeteer = require('puppeteer');

  global.navigator = {
    userAgent: 'summat'
  };

  browser = null;

  page = null;

  ws = null;

  makeServer = function(path) {
    return ws = localServer.create({
      port: 23232,
      directory: path,
      spa: 'index.html'
    });
  };

  gotoPage = async function(path) {
    browser = (await puppeteer.launch());
    page = (await browser.newPage());
    return (await page.goto('http://localhost:23232/' + (path || '')));
  };

  closePage = async function() {
    await browser.close();
    return ws.server.close();
  };

  waitForRendered = async function() {
    return (await page.evaluate(function() {
      return new Promise(function(resolve) {
        window.app.$once('rendered', function() {
          return resolve();
        });
        return window.app.render();
      });
    }));
  };

  exports.ymaTest = {
    "Should make an app": function(test) {
      var app;
      app = require('../dist/index')('myApp');
      test.equal(app.appName, 'myApp', 'Name check');
      return test.done();
    },
    "Should make a scope": function(test) {
      var app, scope;
      app = require('../dist/index')('myApp');
      scope = app.Scope();
      test.ok(scope.$id);
      return test.done();
    },
    "Should make a component": function(test) {
      var app;
      app = require('../dist/index')('myApp');
      app.component('myComponent', function(app) {
        return function(scope, elem, props) {
          return console.log('controller');
        };
      });
      test.equal(typeof (app.$getComponents()['MYCOMPONENT']), 'function');
      return test.done();
    },
    "Should set scoped vars": function(test) {
      var app, scope;
      app = require('../dist/index')('myApp');
      scope = app.Scope();
      app.$setScopeVar('testThing', 'test', scope);
      test.equal(scope.testThing, 'test');
      app.$setScopeVar('arr[4].name', 'buddy', scope);
      test.equal(scope.arr[4].name, 'buddy');
      return test.done();
    },
    "Should bootstrap an app": async function(test) {
      var elements, scopes;
      makeServer('test/basic');
      await gotoPage('');
      await waitForRendered();
      elements = (await page.evaluate(function() {
        return window.app.$getElements();
      }));
      scopes = (await page.evaluate(function() {
        return window.app.$getScopes();
      }));
      test.equal(elements.length, 1);
      test.equal(Object.keys(scopes).length, 1);
      test.ok(scopes[elements[0].scope]);
      await closePage();
      return test.done();
    },
    "Should evaluate text": async function(test) {
      var str;
      makeServer('test/eval-string');
      await gotoPage('');
      await waitForRendered();
      str = (await page.evaluate(function() {
        return document.querySelector('app').innerHTML;
      }));
      test.equal(str, 'Test string');
      await closePage();
      return test.done();
    },
    "Should render app component": async function(test) {
      var str;
      makeServer('test/app-component');
      await gotoPage('');
      await waitForRendered();
      str = (await page.evaluate(function() {
        return document.querySelector('app').innerHTML;
      }));
      test.equal(str, '<h1>App component</h1>');
      await closePage();
      return test.done();
    },
    "Should render app controller": async function(test) {
      var str;
      makeServer('test/controller');
      await gotoPage('');
      await waitForRendered();
      str = (await page.evaluate(function() {
        return document.querySelector('app').innerHTML;
      }));
      test.equal(str, '<h1>APP CONTROLLER</h1>');
      await closePage();
      return test.done();
    },
    "Should render sub components": async function(test) {
      var str;
      makeServer('test/sub-component');
      await gotoPage('');
      await waitForRendered();
      str = (await page.evaluate(function() {
        return document.querySelector('app').innerHTML;
      }));
      test.equal(str, '<div>APP CONTROLLER<sub-component thing="thing1"><h1>THING1</h1></sub-component><sub-component thing="thing2"><h1>THING2</h1></sub-component></div>');
      await closePage();
      return test.done();
    }
  };

}).call(this);
