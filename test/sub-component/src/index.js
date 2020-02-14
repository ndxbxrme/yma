const Yma = require('../../../dist/index');
window.app = Yma('myApp');
window.app.component('app', function(app){
  return {
    template: '<div>{{testVar.toUpperCase()}}<sub-component thing="{{thing1}}" ></sub-component><sub-component thing="{{thing2}}"></sub-component></div>',
    controller: function(scope, elem, props) {
      scope.testVar = 'app controller';
      scope.thing1 = 'thing1';
      scope.thing2 = 'thing2';
    }
  }
});
window.app.component('sub-component', function(app){
  return {
    template: '<h1>{{thing.toUpperCase()}}</h1>',
    controller: function(scope, elem, props) {
      scope.thing = props.thing;
    }
  }
})
