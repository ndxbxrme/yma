const Yma = require('../../../dist/index');
window.app = Yma('myApp');
window.app
.component('app', function(app) {
  return {
    template: '<h1>App component</h1>'
  }
})
