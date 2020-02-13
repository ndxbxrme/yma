const Yma = require('../../../dist/index');
window.app = Yma('myApp');
document.querySelector('h1').innerHTML = window.app.appName;
