const Yma = require('../../../dist/index');
window.app = Yma('myApp');
window.app.component('app', function(app){
  return {
    template: '<h1>{{testVar.toUpperCase()}}</h1>',
    controller: function(scope, elem, props) {
      scope.testVar = 'app controller'
    }
  }
})
