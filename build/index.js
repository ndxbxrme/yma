(function() {
  'use strict';
  var Yma, yma;

  Yma = function() {
    var callCallbacks, changeRoute, collectTemplatesFromHTML, component, components, data, evalInContext, fetchController, fetchTemplate, fillTemplate, fragId, getScope, getScopeVar, hash, index, j, len, makeScope, register, renderComponent, renderTemplate, renderVars, scope, scopeId, setIndexVar, start, updateFrags, view, viewScope;
    components = ['config', 'service', 'controller', 'component', 'template', 'route'];
    view = null;
    viewScope = null;
    scopeId = 0;
    fragId = 0;
    index = {};
    data = {};
    register = {};
    for (j = 0, len = components.length; j < len; j++) {
      component = components[j];
      data[component] = {};
      (function(component) {
        return register[component] = function(name, fn) {
          return data[component][name] = fn();
        };
      })(component);
    }
    scope = {};
    evalInContext = function(str, context) {
      try {
        return (new Function(`with(this) {return ${str}}`)).call(context);
      } catch (error) {}
    };
    hash = function(str) {
      var h, i;
      h = 5381;
      i = str.length;
      while (i) {
        h = (h * 33) ^ str.charCodeAt(--i);
      }
      return h;
    };
    callCallbacks = function(obj, name) {
      var cb, k, len1, ref, results;
      ref = obj.$callbacks[name];
      results = [];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        cb = ref[k];
        results.push(typeof cb === "function" ? cb() : void 0);
      }
      return results;
    };
    getScopeVar = function(myscope, name) {
      var bit, bits, k, len1, myvar;
      myvar = myscope;
      bits = name.split(/\./g);
      for (k = 0, len1 = bits.length; k < len1; k++) {
        bit = bits[k];
        myvar = myvar[bit];
      }
      if (myvar === myscope) {
        return void 0;
      } else {
        return myvar;
      }
    };
    updateFrags = function(fragsToUpdate) {
      var frag, fragElem, fragKey, fragNode, frags, i, myscope, results;
      i = fragsToUpdate.length;
      if (i) {
        results = [];
        while (i--) {
          frags = fragsToUpdate[i];
          results.push((function() {
            var results1;
            results1 = [];
            for (fragKey in frags) {
              frag = frags[fragKey];
              fragElem = document.querySelector(`[frag=${frag.id}]`);
              myscope = getScope(fragElem);
              if (typeof frag.index === 'string') {
                results1.push(fragElem.setAttribute(frag.index, fillTemplate(frag.template, myscope, frag.id, frag.index)));
              } else {
                fragNode = fragElem.childNodes[frag.index];
                results1.push(fragNode.nodeValue = fillTemplate(frag.template, myscope, frag.id, frag.index));
              }
            }
            return results1;
          })());
        }
        return results;
      }
    };
    makeScope = function(myscope, _id) {
      var newScope, ref;
      newScope = {
        id: _id || `s${scopeId++}`,
        $root: scope.root,
        $parent: myscope,
        $children: [],
        $callbacks: {
          destroy: []
        },
        $on: function(name, fn) {
          return this.$callbacks[name].push(fn);
        },
        $updating: false,
        $update: function(arg) {
          var frag, fragKey, fragsToUpdate, indexScope, indexVar, key, myhash, myvar;
          if (this.$updating) {
            return setTimeout(this.update(args));
          } else {
            this.$updating = true;
            fragsToUpdate = [];
            indexScope = index[this.id];
            if (indexScope) {
              for (key in indexScope.vars) {
                indexVar = indexScope.vars[key];
                myvar = getScopeVar(this, key);
                myhash = hash(JSON.stringify(myvar));
                if (myhash !== indexVar.value) {
                  indexVar.value = myhash;
                  for (fragKey in indexVar.frags) {
                    frag = indexScope.frags[fragKey];
                    if (fragsToUpdate.indexOf(frag) === -1) {
                      fragsToUpdate.push(frag);
                    }
                  }
                }
              }
            }
            if (fragsToUpdate.length) {
              updateFrags(fragsToUpdate);
            }
            return this.$updating = false;
          }
        },
        $destroy: function() {
          var child, frag, indexScope, k, key, len1, myvar, ref, scopeKey, testScope;
          callCallbacks(this, 'destroy');
          ref = this.$children;
          //@.$parent.$children?.splice(@.$parent.$children.indexOf(@), 1)
          for (k = 0, len1 = ref.length; k < len1; k++) {
            child = ref[k];
            child.$destroy();
          }
          this.children = void 0;
          delete scope[this.id];
          //find the fragments to delete and 
          indexScope = index[this.id];
          if (indexScope) {
            for (frag in indexScope.frags) {
              for (scopeKey in index) {
                if (indexScope.id !== scopeKey) {
                  testScope = index[scopeKey];
                  delete testScope.frags[frag];
                  for (key in testScope.vars) {
                    myvar = testScope.vars[key];
                    delete myvar.frags[frag];
                    if (Object.keys(myvar.frags).length === 0) {
                      delete testScope.vars[key];
                    }
                  }
                }
              }
            }
          }
          return delete index[this.id];
        },
        $use: function(args) {
          var arg, k, len1, results;
          if (typeof args === 'string') {
            args = [args];
          }
          results = [];
          for (k = 0, len1 = args.length; k < len1; k++) {
            arg = args[k];
            if (data.service[arg]) {
              results.push(this[`_${arg}`] = data.service[arg]);
            } else {
              results.push(void 0);
            }
          }
          return results;
        },
        $inherit: function() {}
      };
      scope[newScope.id] = newScope;
      if (myscope != null) {
        if ((ref = myscope.$children) != null) {
          ref.push(newScope);
        }
      }
      return newScope;
    };
    makeScope({}, 'root');
    scope.root.thing = 'buddy';
    scope.root.testFn = function() {
      return console.log('hey from root scope, ' + this.thing);
    };
    renderComponent = function(node, elem, myscope, append) {
      var elemRoot, frag, newScope, temp;
      temp = document.createElement('template');
      frag = document.createElement('div');
      newScope = elem.scope ? makeScope(myscope) : myscope;
      newScope.$node = node;
      frag.innerHTML = renderTemplate(fetchTemplate(elem), newScope);
      temp.content.appendChild(frag);
      elemRoot = frag.querySelector('*');
      newScope.$elem = elemRoot;
      fetchController(elem.controller, newScope);
      node[append ? 'append' : 'replaceWith'](elemRoot);
      if (elem.scope) {
        return elemRoot.setAttribute('scope', newScope.id);
      }
    };
    fetchController = function(arg, myscope) {
      var ctrl, type;
      if (arg) {
        type = typeof arg;
        if (type === 'function') {
          return arg.call(myscope);
        } else if (type === 'string') {
          ctrl = data.controller[arg];
          if (ctrl) {
            return ctrl.call(myscope);
          }
        }
      }
    };
    fetchTemplate = function(arg) {
      var name, ref;
      name = '';
      if (arg) {
        if (typeof arg === 'object') {
          if (arg.template) {
            name = arg.template;
          } else if (arg.templateUrl) {
            name = arg.templateUrl;
          }
        } else {
          name = arg;
        }
      }
      return ((ref = data.template[name]) != null ? ref.html : void 0) || '';
    };
    setIndexVar = function(myscope, fragId, fragIndex, fragScopeId, template, vars) {
      var frag, indexScope, myfrags, myvars;
      indexScope = index[myscope.id] = index[myscope.id] || {
        frags: {},
        vars: {}
      };
      myfrags = indexScope.frags;
      myvars = indexScope.vars;
      frag = myfrags[fragId] = myfrags[fragId] || {};
      frag = frag[`i${fragIndex}`] = frag[`i${fragIndex}`] || {};
      if (typeof frag.template === 'undefined') {
        frag.template = template;
      }
      frag.vars = frag.vars || {};
      frag.id = fragId;
      frag.index = fragIndex;
      frag.scope = fragScopeId;
      return vars.map(function(myvar) {
        var newScope, newVar;
        if (/\$parent|\$root/.test(myvar.route[0])) {
          newVar = JSON.parse(JSON.stringify(myvar));
          newVar.route.splice(0, 1);
          newVar.name = newVar.name.replace(/^(\$parent|\$root)\./, '');
          newScope = myscope[myvar.route[0]];
          if (newScope) {
            return setIndexVar(newScope, fragId, fragIndex, myscope.id, template, [newVar]);
          }
        }
        if (typeof myvars[myvar.name] === 'undefined') {
          myscope[myvar.name] = myscope[myvar.name] || null;
          myvars[myvar.name] = {
            value: hash(JSON.stringify(myscope[myvar.name])),
            frags: {}
          };
          myvars[myvar.name].frags[fragId] = true;
        } else {
          if (!myvars[myvar.name].frags[fragId]) {
            myvars[myvar.name].frags[fragId] = true;
          }
        }
        return frag.vars[myvar.name] = true;
      });
    };
    fillTemplate = function(template, data, fragId, fragIndex) {
      return template.replace(/\{\{(.+?)\}\}/g, function(all, match) {
        var ast, context, doWalk, myvar, vars;
        context = {};
        //console.log match
        ast = acorn.parse(match);
        vars = [];
        myvar = null;
        doWalk = function(ast) {
          return acorn.walk.full(ast, function(node) {
            var fnargs, fnstart, k, len1, results, v;
            switch (node.type) {
              case 'Identifier':
                myvar = {
                  route: [node.name],
                  name: node.name,
                  start: node.start
                };
                return vars.push(myvar);
              case 'CallExpression':
                fnstart = match.indexOf('(', node.start);
                fnargs = match.substr(fnstart, node.end - fnstart);
                results = [];
                for (k = 0, len1 = vars.length; k < len1; k++) {
                  v = vars[k];
                  if (v.start === node.start) {
                    results.push(v.name += fnargs);
                  } else {
                    results.push(void 0);
                  }
                }
                return results;
                break;
              case 'MemberExpression':
                if (myvar) {
                  if (node.property.type === 'Identifier') {
                    myvar.route.push(node.property.name);
                    return myvar.name += `.${node.property.name}`;
                  } else if (node.property.type === 'Literal') {
                    myvar.route.push(`[${node.property.raw}]`);
                    return myvar.name += `[${node.property.raw}]`;
                  }
                }
                break;
              case 'AssignmentExpression':
                doWalk(node.left);
                return doWalk(node.right);
            }
          });
        };
        doWalk(ast);
        if (typeof fragId !== 'undefined') {
          setIndexVar(data, fragId, fragIndex, data.id, template, vars);
        }
        return evalInContext(match, data);
      });
    };
    renderTemplate = function(template, myscope) {
      var elem, frag, k, l, len1, len2, node, nodes, temp;
      temp = document.createElement('template');
      frag = document.createElement('div');
      frag.innerHTML = template;
      temp.content.appendChild(frag);
      for (elem in data.component) {
        nodes = frag.querySelectorAll(elem);
        if (nodes && nodes.length) {
          for (k = 0, len1 = nodes.length; k < len1; k++) {
            node = nodes[k];
            renderComponent(node, data.component[elem], myscope);
          }
        }
        nodes = frag.querySelectorAll(`[${elem}]`);
        if (nodes && nodes.length) {
          for (l = 0, len2 = nodes.length; l < len2; l++) {
            node = nodes[l];
            renderComponent(node, data.component[elem], myscope);
          }
        }
      }
      return frag.innerHTML;
    };
    collectTemplatesFromHTML = function() {
      var k, len1, results, script, scripts;
      scripts = document.getElementsByTagName('SCRIPT');
      results = [];
      for (k = 0, len1 = scripts.length; k < len1; k++) {
        script = scripts[k];
        if (script.type === 'text/template') {
          results.push(register.template(script.getAttribute('name'), function() {
            return {
              html: script.innerText
            };
          }));
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    renderVars = function(elem, myscope) {
      var attr, attrScope, child, childNode, fId, i, k, l, len1, len2, len3, m, ref, ref1, ref2, results;
      if (attrScope = elem.getAttribute('scope')) {
        myscope = scope[attrScope];
      }
      fId = elem.getAttribute('frag');
      ref = elem.childNodes;
      for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
        childNode = ref[i];
        if (childNode.nodeValue && childNode.nodeValue.indexOf('{{') !== -1) {
          if (!fId) {
            fId = `f${fragId++}`;
            elem.setAttribute('frag', fId);
          }
          childNode.nodeValue = fillTemplate(childNode.nodeValue, myscope, fId, i);
        }
      }
      ref1 = elem.attributes;
      for (l = 0, len2 = ref1.length; l < len2; l++) {
        attr = ref1[l];
        if (attr.value.indexOf('{{') !== -1) {
          if (!fId) {
            fId = `f${fragId++}`;
            elem.setAttribute('frag', fId);
          }
          attr.value = fillTemplate(attr.value, myscope, fId, attr.name);
        } else if (attr.name === 'model') {
          console.log('model');
          elem.value = fillTemplate(`{{${attr.value}}}`, myscope);
        }
      }
      ref2 = elem.children;
      results = [];
      for (m = 0, len3 = ref2.length; m < len3; m++) {
        child = ref2[m];
        results.push(renderVars(child, myscope));
      }
      return results;
    };
    changeRoute = function(state) {
      var nextRoute;
      //tear down current route
      if (viewScope) {
        viewScope.$destroy();
      }
      nextRoute = data.route[state];
      viewScope = makeScope(scope.root);
      fetchController(nextRoute.controller, viewScope);
      view.setAttribute('scope', viewScope.id);
      //fId = "f#{fragId++}"
      //view.setAttribute 'frag', fId
      view.innerHTML = renderTemplate(fetchTemplate(nextRoute), viewScope);
      return renderVars(view, viewScope);
    };
    //view.innerHTML = fillTemplate(renderTemplate(fetchTemplate(nextRoute), viewScope), viewScope, fId)
    getScope = function(elem) {
      var myscope;
      while (elem && elem.tagName !== 'HTML') {
        if (myscope = elem.getAttribute('scope')) {
          return scope[myscope];
        }
        elem = elem.parentNode;
      }
      return scope.root;
    };
    start = function() {
      var myscope, route, routeKey;
      view = document.querySelector('view');
      myscope = scope.root;
      collectTemplatesFromHTML();
      route = null;
      for (routeKey in data.route) {
        if (data.route[routeKey].default) {
          route = data.route[routeKey];
          changeRoute(routeKey);
          break;
        }
      }
      if (!route) {
        if (data.route['/']) {
          changeRoute('/');
        }
      }
      window.addEventListener('click', function(e) {
        myscope = getScope(e.target);
        if (e.target.getAttribute('click')) {
          evalInContext(e.target.getAttribute('click'), myscope);
        }
        if (e.target.tagName === 'A') {
          e.preventDefault();
          e.stopPropagation();
          return changeRoute(e.target.getAttribute('href'));
        }
      });
      return window.addEventListener('keyup', function(e) {
        myscope = getScope(e.target);
        if (e.target.getAttribute('model')) {
          evalInContext(`${e.target.getAttribute('model')} = '${e.target.value}'`, myscope);
          myscope.$update();
        }
        if (e.target.getAttribute('keyup')) {
          return console.log(evalInContext(e.target.getAttribute('keyup'), myscope));
        }
      });
    };
    window.setTimeout(start);
    return {
      register: register
    };
  };

  yma = Yma();

}).call(this);

//# sourceMappingURL=index.js.map
