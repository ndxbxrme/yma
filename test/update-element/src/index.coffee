Yma = require '../../../dist/index'
window.app = Yma 'myApp'
console.log 'window app', window.app
scopeToUpdate = null
window.app.component 'app', (app) ->
  controller: (scope) ->
    scopeToUpdate = scope
    scope.testVar = 'buddy'
window.doUpdate = ->
  scopeToUpdate.$update
    testVar: 'maggie'
