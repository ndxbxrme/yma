global.navigator =
  userAgent: 'summat'
app = require('../dist/index') 'myApp'
exports.ymaTest =
  test1: (test) ->
    test.equal app.appName, 'myApp', 'Name check'
    test.done()
