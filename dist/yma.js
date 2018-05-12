var acorn = require('acorn');acorn.walk = require('acorn/dist/walk');(function() {
  'use strict';
  var Yma;

  Yma = function() {
    var ComponentScope, HTTP, Router, Scope, callCallbacks, changeRoute, collectTemplatesFromHTML, data, evalInContext, fetchController, fetchTemplate, fillTemplate, fragId, getNodeId, getScope, getScopeVar, hash, http, index, j, len, makeRouteRegex, nodeId, objTypes, readVars, register, renderComponent, renderTemplate, renderVars, repeaterId, router, scope, scopeId, setIndexVar, setRepeaterIndexVar, sleep, start, type, updateFrags, view, viewScope, yma;
    yma = {};
    objTypes = ['config', 'service', 'controller', 'component', 'template', 'route'];
    view = null;
    viewScope = null;
    scopeId = 0;
    fragId = 0;
    repeaterId = 0;
    nodeId = 0;
    index = {
      services: {}
    };
    data = {};
    register = {};
    scope = {};
    Scope = function(myscope, _id) {
      var j, key, len, newScope, ref, ref1;
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
        $listen: function(vars, refreshFn) {
          //if typeof vars isnt 'array'
          //  vars = [vars]
          return setIndexVar(this, null, null, null, '', vars, refreshFn);
        },
        $update: function(arg, ignoreFamily) {
          var fragsToUpdate, indexScope, indexVar, j, key, len, myhash, myvar, processAncestors, processDescendants, pushUpdateVars, repeater, repeatersToUpdate;
          pushUpdateVars = function(updateVar, updateScope) {
            var frag, fragKey, j, len, ref, refreshFn, repeater, repeaterKey, results;
            for (fragKey in updateVar.frags) {
              frag = updateScope.frags[fragKey];
              if (fragsToUpdate.indexOf(frag) === -1) {
                fragsToUpdate.push(frag);
              }
            }
            for (repeaterKey in updateVar.repeaters) {
              repeater = updateScope.repeaters[repeaterKey];
              if (repeatersToUpdate.indexOf(repeater) === -1) {
                repeatersToUpdate.push(repeater);
              }
            }
            ref = updateVar.refreshFns;
            results = [];
            for (j = 0, len = ref.length; j < len; j++) {
              refreshFn = ref[j];
              results.push(refreshFn());
            }
            return results;
          };
          if (this.$updating) {
            return setTimeout(this.update(args));
          } else {
            this.$updating = true;
            repeatersToUpdate = [];
            fragsToUpdate = [];
            indexScope = index[this.id];
            if (indexScope) {
              for (key in indexScope.vars) {
                indexVar = indexScope.vars[key];
                myvar = getScopeVar(this, key);
                myhash = hash(JSON.stringify(myvar));
                if (myhash !== indexVar.value) {
                  indexVar.value = myhash;
                  pushUpdateVars(indexVar, indexScope);
                  processDescendants = (node) => {
                    var child, icVar, icVarKey, indexChild, j, len, ref, results;
                    ref = node.$children;
                    results = [];
                    for (j = 0, len = ref.length; j < len; j++) {
                      child = ref[j];
                      if (child.$isolate) {
                        continue;
                      }
                      indexChild = index[child.id];
                      if (indexChild) {
                        for (icVarKey in indexChild.vars) {
                          icVar = indexChild.vars[icVarKey];
                          if (icVar.routeStr === indexVar.routeStr) {
                            icVar.value = indexVar.value;
                            child[icVar.route[0]] = this[icVar.route[0]];
                            pushUpdateVars(icVar, indexChild);
                          }
                        }
                      }
                      results.push(processDescendants(child));
                    }
                    return results;
                  };
                  processAncestors = (node) => {
                    var indexParent, ipVar, ipVarKey, results;
                    if (node.$isolate) {
                      return;
                    }
                    results = [];
                    while (node) {
                      if (node.$parent) {
                        indexParent = index[node.$parent.id];
                        if (indexParent) {
                          for (ipVarKey in indexParent.vars) {
                            ipVar = indexParent.vars[ipVarKey];
                            if (ipVar.routeStr === indexVar.routeStr) {
                              ipVar.value = indexVar.value;
                              node.$parent[icVar.route[0]] = this[icVar.route[0]];
                              pushUpdateVars(ipVar, indexParent);
                            }
                          }
                        }
                      }
                      results.push(node = node.$parent);
                    }
                    return results;
                  };
                  if (!ignoreFamily) {
                    processDescendants(this);
                    processAncestors(this);
                  }
                }
              }
            }
            for (j = 0, len = repeatersToUpdate.length; j < len; j++) {
              repeater = repeatersToUpdate[j];
              repeater.refreshFn();
            }
            if (fragsToUpdate.length) {
              updateFrags(fragsToUpdate);
            }
            return this.$updating = false;
          }
        },
        $destroy: function() {
          var child, deleteIndexItems, indexScope, noChildren, ref, service;
          callCallbacks(this, 'destroy');
          noChildren = this.$children.length;
          while (noChildren--) {
            child = this.$children[0];
            child.$destroy();
          }
          this.children = void 0;
          delete scope[this.id];
          //find the fragments to delete and 
          indexScope = index[this.id];
          if (indexScope) {
            deleteIndexItems = function(itemKey) {
              var item, key, myvar, results, scopeKey, testScope;
              results = [];
              for (item in indexScope[itemKey]) {
                results.push((function() {
                  var results1;
                  results1 = [];
                  for (scopeKey in index) {
                    if (indexScope.id !== scopeKey) {
                      testScope = index[scopeKey];
                      if (testScope[itemKey]) {
                        delete testScope[itemKey][item];
                        results1.push((function() {
                          var results2;
                          results2 = [];
                          for (key in testScope.vars) {
                            myvar = testScope.vars[key];
                            delete myvar[itemKey][item];
                            if (Object.keys(myvar[itemKey]).length === 0) {
                              results2.push(delete testScope.vars[key]);
                            } else {
                              results2.push(void 0);
                            }
                          }
                          return results2;
                        })());
                      } else {
                        results1.push(void 0);
                      }
                    } else {
                      results1.push(void 0);
                    }
                  }
                  return results1;
                })());
              }
              return results;
            };
            deleteIndexItems('frags');
            deleteIndexItems('repeaters');
          }
          if (this.$parent && this.$parent.$children) {
            if ((ref = this.$parent.$children) != null) {
              ref.splice(this.$parent.$children.indexOf(this), 1);
            }
          }
          for (service in index.services) {
            if (index.services[service][this.id]) {
              delete index.services[service][this.id];
            }
            if (Object.keys(index.services[service]).length === 0) {
              delete index.services[service];
            }
          }
          return delete index[this.id];
        },
        $use: function(args) {
          var arg, j, len, results;
          if (typeof args === 'string') {
            args = [args];
          }
          results = [];
          for (j = 0, len = args.length; j < len; j++) {
            arg = args[j];
            if (data.service[arg]) {
              this[`_${arg}`] = data.service[arg];
              index.services[arg] = index.services[arg] || {};
              results.push(index.services[arg][this.id] = true);
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
      if (myscope) {
        ref1 = Object.keys(myscope);
        for (j = 0, len = ref1.length; j < len; j++) {
          key = ref1[j];
          if (!newScope.hasOwnProperty(key)) {
            newScope[key] = myscope[key];
          }
        }
      }
      return newScope;
    };
    ComponentScope = function(name) {
      return {
        $name: name,
        $update: function() {
          var myscope, ref, results;
          if (index.services[name]) {
            results = [];
            for (myscope in index.services[name]) {
              results.push((ref = scope[myscope]) != null ? ref.$update() : void 0);
            }
            return results;
          }
        }
      };
    };
    Router = function() {
      var routes;
      routes = [];
      return {
        push: function(route) {
          return routes.push(route);
        },
        get: function(url) {
          var i, j, len, m, outData, outParams, outUrl, testRoute;
          outData = null;
          outParams = {};
          outUrl = null;
          for (j = 0, len = routes.length; j < len; j++) {
            testRoute = routes[j];
            if (m = url.match(testRoute.regex)) {
              outData = testRoute.controller;
              i = 0;
              while (i++ < m.length - 1) {
                outParams[testRoute.params[i - 1]] = m[i];
              }
              break;
            }
            if (testRoute.controller.default) {
              outUrl = testRoute.name;
              outData = testRoute.controller;
              outParams = [];
            }
          }
          if (!outData) {
            outData = data.route['/'];
            outUrl = '/';
          }
          return {
            data: outData,
            params: outParams,
            url: outUrl
          };
        }
      };
    };
    router = Router();
    HTTP = function() {
      var doRequest;
      doRequest = function(method, url, data) {
        return new Promise(function(resolve, reject) {
          var req;
          req = new XMLHttpRequest();
          req.onreadystatechange = function() {
            if (this.readyState === 4) {
              return resolve(this.responseText);
            }
          };
          req.open(method, url, true);
          if (method === 'POST') {
            req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          }
          return req.send(data);
        });
      };
      return {
        get: function(url) {
          if (data.template[url]) {
            return data.template[url];
          }
          return doRequest('GET', url);
        },
        post: function(url, data) {
          return doRequest('POST', url, data);
        }
      };
    };
    http = HTTP();
    Scope({}, 'root');
    scope.root.thing = 'buddy';
    scope.root.testFn = function() {};
    //--------------------------------------
    // UTILITY
    //--------------------------------------
    makeRouteRegex = function(name, route) {
      var params, reg;
      params = [];
      reg = route.replace(/:(\w+)/g, function(all, param) {
        params.push(param);
        return '([^/]+)';
      });
      return router.push({
        regex: new RegExp(reg + '$'),
        params: params,
        controller: data.route[name]
      });
    };
    for (j = 0, len = objTypes.length; j < len; j++) {
      type = objTypes[j];
      data[type] = {};
      (function(type) {
        return yma[type] = function(name, fn) {
          var cScope, k, len1, results, route;
          cScope = ComponentScope(name);
          data[type][name] = fn.call(cScope);
          if (type === 'route') {
            if (typeof name === 'array') {
              results = [];
              for (k = 0, len1 = name.length; k < len1; k++) {
                route = name[k];
                results.push(makeRouteRegex(name, route));
              }
              return results;
            } else {
              return makeRouteRegex(name, name);
            }
          }
        };
      })(type);
    }
    evalInContext = function(str, context) {
      try {
        return (new Function(`with(this) {return ${str}}`)).call(context);
      } catch (error) {}
    };
    hash = function(str) {
      var h, i;
      if (typeof str === 'undefined') {
        return 0;
      }
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
    
    //--------------------------------------
    // FETCH 
    //--------------------------------------
    getScopeVar = function(myscope, name) {
      return evalInContext(name, myscope);
    };
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
    collectTemplatesFromHTML = function() {
      var k, len1, results, script, scripts;
      scripts = document.getElementsByTagName('SCRIPT');
      results = [];
      for (k = 0, len1 = scripts.length; k < len1; k++) {
        script = scripts[k];
        if (script.type === 'text/template') {
          results.push(yma.template(script.getAttribute('name'), function() {
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
    fetchController = async function(arg, myscope) {
      var ctrl;
      if (arg) {
        type = typeof arg;
        if (type === 'function') {
          return (await arg.call(myscope));
        } else if (type === 'string') {
          ctrl = data.controller[arg];
          if (ctrl) {
            return (await ctrl.call(myscope));
          }
        }
      }
      return null;
    };
    fetchTemplate = async function(arg) {
      var name, ref, template;
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
      if (!name) {
        return '';
      }
      template = ((ref = data.template[name]) != null ? ref.html : void 0) || '';
      if (!template) {
        template = (await http.get(name));
        data.template[name] = template;
      }
      return template;
    };
    //--------------------------------------
    // INDEXING
    //--------------------------------------
    setIndexVar = function(myscope, fragId, fragIndex, fragScopeId, template, vars, refreshFn) {
      var frag, indexScope, myfrags, myvars;
      indexScope = index[myscope.id] = index[myscope.id] || {
        frags: {},
        vars: {},
        repeaters: {}
      };
      myvars = indexScope.vars;
      if (fragId) {
        myfrags = indexScope.frags;
        frag = myfrags[fragId] = myfrags[fragId] || {};
        frag = frag[`i${fragIndex}`] = frag[`i${fragIndex}`] || {};
        if (typeof frag.template === 'undefined') {
          frag.template = template;
        }
        frag.vars = frag.vars || {};
        frag.id = fragId;
        frag.index = fragIndex;
        frag.scope = fragScopeId;
      }
      vars.map(function(myvar) {
        var newScope, newVar;
        if (/\$parent|\$root/.test(myvar.route[0])) {
          newVar = JSON.parse(JSON.stringify(myvar));
          newVar.route.splice(0, 1);
          newVar.name = newVar.name.replace(/^(\$parent|\$root)\./, '');
          newScope = myscope[myvar.route[0]];
          if (newScope) {
            return setIndexVar(newScope, fragId, fragIndex, fragScopeId, template, [newVar], refreshFn); //check this
          }
        }
        if (typeof myvars[myvar.name] === 'undefined') {
          myscope[myvar.name] = myscope[myvar.name] || null;
          myvars[myvar.name] = {
            value: hash(JSON.stringify(evalInContext(myvar.name, myscope))),
            route: myvar.route,
            routeStr: myvar.route.join('.'),
            frags: {},
            repeaters: {},
            refreshFns: []
          };
          if (fragId) {
            myvars[myvar.name].frags[fragId] = true;
          }
          if (refreshFn) {
            myvars[myvar.name].refreshFns.push(refreshFn);
          }
        } else {
          if (fragId) {
            if (!myvars[myvar.name].frags[fragId]) {
              myvars[myvar.name].frags[fragId] = true;
            }
          }
          if (refreshFn) {
            myvars[myvar.name].refreshFns.push(refreshFn);
          }
        }
        if (fragId) {
          frag.vars[myvar.name] = true;
        }
        return null;
      });
      return null;
    };
    setRepeaterIndexVar = function(myscope, repeaterId, repeaterScopeId, template, vars, refreshFn) {
      var indexScope, myrepeaters, myvars, repeater;
      indexScope = index[myscope.id] = index[myscope.id] || {
        frags: {},
        vars: {},
        repeaters: {}
      };
      myrepeaters = indexScope.repeaters;
      myvars = indexScope.vars;
      repeater = myrepeaters[repeaterId] = myrepeaters[repeaterId] || {};
      if (typeof repeater.template === 'undefined') {
        repeater.template = template;
      }
      repeater.vars = repeater.vars || {};
      repeater.id = repeaterId;
      repeater.scope = repeaterScopeId;
      repeater.refreshFn = refreshFn;
      return vars.map(function(myvar) {
        var newScope, newVar;
        if (/\$parent|\$root/.test(myvar.route[0])) {
          newVar = JSON.parse(JSON.stringify(myvar));
          newVar.route.splice(0, 1);
          newVar.name = newVar.name.replace(/^(\$parent|\$root)\./, '');
          newScope = myscope[myvar.route[0]];
          if (newScope) {
            return setRepeaterIndexVar(newScope, repeaterId, repeaterScopeId, template, [newVar], refreshFn); //check this
          }
        }
        if (typeof myvars[myvar.name] === 'undefined') {
          myscope[myvar.name] = myscope[myvar.name] || null;
          myvars[myvar.name] = {
            value: hash(JSON.stringify(evalInContext(myvar.name, myscope))),
            route: myvar.route,
            routeStr: myvar.route.join('.'),
            frags: {},
            repeaters: {},
            refreshFns: []
          };
          myvars[myvar.name].repeaters[repeaterId] = true;
        } else {
          if (!myvars[myvar.name].repeaters[repeaterId]) {
            myvars[myvar.name].repeaters[repeaterId] = true;
          }
        }
        return repeater.vars[myvar.name] = true;
      });
    };
    //--------------------------------------
    // TEMPLATE RENDERING
    //--------------------------------------
    Element.prototype.appendAfter = function(element) {
      return element.parentNode.insertBefore(this, element.nextSibling);
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
    renderComponent = async function(node, elem, myscope, append) {
      var attribute, className, elemRoot, frag, i, k, len1, newScope, ref, result, temp, template;
      temp = document.createElement('template');
      frag = document.createElement('div');
      if (node.getAttribute('scope')) {
        newScope = getScope(node);
      } else {
        newScope = elem.scope ? Scope(myscope) : myscope;
      }
      newScope.$node = node;
      template = (await renderTemplate((await fetchTemplate(elem)), newScope));
      if (template) {
        frag.innerHTML = template;
      } else {
        frag.innerHTML = node.outerHTML;
      }
      temp.content.appendChild(frag);
      elemRoot = frag.querySelector('*');
      newScope.$elem = elemRoot;
      result = (await fetchController(elem.controller, newScope));
      if (result && typeof result === 'object') {
        if (result.overwrite) {
          if (result.html.length) {
            i = -1;
            while (i++ < result.html.length - 1) {
              frag.innerHTML = result.html[i];
              elemRoot = frag.querySelector('*');
              node.parentNode.insertBefore(elemRoot, node);
            }
            node.remove();
          } else {
            frag.innerHTML = `<div rid='${result.rid}' style='display:none'></div>`;
            elemRoot = frag.querySelector('*');
            node.replaceWith(elemRoot);
          }
          return;
        }
      }
      className = node.className;
      node[append ? 'appendAfter' : 'replaceWith'](elemRoot);
      elemRoot.className += className;
      newScope.$node = elemRoot;
      ref = node.attributes;
      for (k = 0, len1 = ref.length; k < len1; k++) {
        attribute = ref[k];
        if (attribute.name !== elem.name) {
          elemRoot.setAttribute(attribute.name, attribute.value);
        }
      }
      if (elem.scope || node.getAttribute('scope')) {
        elemRoot.setAttribute('scope', newScope.id);
      }
      if (node.getAttribute('rid')) {
        elemRoot.setAttribute('rid', node.getAttribute('rid'));
      }
      return null;
    };
    renderTemplate = async function(template, myscope) {
      var elem, frag, k, l, len1, len2, node, nodes, temp;
      await template;
      temp = document.createElement('template');
      frag = document.createElement('div');
      frag.innerHTML = template;
      temp.content.appendChild(frag);
      for (elem in data.component) {
        nodes = frag.querySelectorAll(elem);
        if (nodes.length) {
          for (k = 0, len1 = nodes.length; k < len1; k++) {
            node = nodes[k];
            await renderComponent(node, data.component[elem], myscope);
          }
        }
        nodes = frag.querySelectorAll(`[${elem}]`);
        if (nodes.length) {
          for (l = 0, len2 = nodes.length; l < len2; l++) {
            node = nodes[l];
            await renderComponent(node, data.component[elem], myscope);
          }
        }
      }
      return frag.innerHTML;
    };
    //--------------------------------------
    // VARIABLE RENDERING
    //--------------------------------------
    renderVars = function(elem, myscope) {
      var attr, attrScope, child, childNode, fId, i, k, l, len1, len2, len3, n, ref, ref1, ref2, results;
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
          elem.value = fillTemplate(`{{${attr.value}}}`, myscope);
        }
      }
      ref2 = elem.children;
      results = [];
      for (n = 0, len3 = ref2.length; n < len3; n++) {
        child = ref2[n];
        results.push(renderVars(child, myscope));
      }
      return results;
    };
    readVars = function(expression) {
      var ast, context, doWalk, myvar, vars;
      context = {};
      //console.log expression
      ast = acorn.parse(expression);
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
              fnstart = expression.indexOf('(', node.start);
              fnargs = expression.substr(fnstart, node.end - fnstart);
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
      return vars;
    };
    fillTemplate = function(template, data, fragId, fragIndex) {
      return template.replace(/\{\{(.+?)\}\}/g, function(all, expression) {
        var vars;
        vars = readVars(expression);
        if (typeof fragId !== 'undefined') {
          setIndexVar(data, fragId, fragIndex, data.id, template, vars);
        }
        return evalInContext(expression, data) || '';
      });
    };
    //--------------------------------------

    //--------------------------------------
    changeRoute = async function(state, pop) {
      var nextRoute, nextRouteData;
      view = document.querySelector('view');
      nextRouteData = router.get(state);
      if (nextRouteData.url) {
        state = nextRouteData.url;
      }
      if (!pop) {
        window.history.pushState(state, '', state);
      }
      //tear down current route
      if (nextRouteData && nextRouteData.data) {
        if (viewScope) {
          viewScope.$destroy();
        }
        nextRoute = nextRouteData.data;
        viewScope = Scope(scope.root);
        viewScope.$params = nextRouteData.params;
        fetchController(nextRoute.controller, viewScope);
        view.setAttribute('scope', viewScope.id);
        view.innerHTML = (await renderTemplate((await fetchTemplate(nextRoute)), viewScope));
        return renderVars(view, viewScope);
      }
    };
    start = function() {
      var body, myscope, styles;
      styles = document.createElement('style');
      styles.innerText = '.ymaHide {display:none}';
      document.querySelector('head').append(styles);
      body = document.querySelector('body');
      myscope = scope.root;
      collectTemplatesFromHTML();
      changeRoute(window.location.pathname);
      //--------------------------------------
      // LISTENERS
      //--------------------------------------
      window.addEventListener('click', function(e) {
        var node;
        myscope = getScope(e.target);
        node = e.target;
        while (node && node.getAttribute) {
          if (node.getAttribute('click')) {
            evalInContext(node.getAttribute('click'), myscope);
          }
          if (node.tagName === 'A') {
            e.preventDefault();
            e.stopPropagation();
            changeRoute(node.getAttribute('href'));
            break;
          }
          node = node.parentNode;
        }
        return null;
      });
      window.addEventListener('keyup', function(e) {
        myscope = getScope(e.target);
        if (e.target.getAttribute('model')) {
          evalInContext(`${e.target.getAttribute('model')} = '${e.target.value}'`, myscope);
          myscope.$update();
        }
        if (e.target.getAttribute('keyup')) {
          evalInContext(e.target.getAttribute('keyup'), myscope);
        }
        return null;
      });
      return window.onpopstate = function(event) {
        return changeRoute(event.state, true);
      };
    };
    getNodeId = function(node) {
      var myId;
      if (myId = node.getAttribute('nid')) {
        return myId;
      } else {
        myId = `n${nodeId++}`;
        node.setAttribute('nid');
        return myId;
      }
    };
    sleep = function(time) {
      return new Promise(function(resolve, reject) {
        return window.setTimeout(resolve, time);
      });
    };
    //--------------------------------------
    // BUILT IN COMPONENTS
    //--------------------------------------
    yma.component('repeat', function() {
      return {
        controller: async function() {
          var elemRoot, expression, html, itemName, makeHtml, rId, refresh, repeatAttr, temp, template, vars;
          rId = `r${repeaterId++}`;
          repeatAttr = this.$node.getAttribute('repeat');
          [expression, itemName] = repeatAttr.split(/\s+by\s+/);
          vars = readVars(expression);
          itemName = itemName || 'item';
          template = this.$node.outerHTML;
          temp = document.createElement('div');
          temp.innerHTML = template;
          elemRoot = temp.querySelector('*');
          elemRoot.removeAttribute('repeat');
          refresh = async() => {
            var elem, elemScope, elems, frag, html, i, k, l, len1, len2, parent;
            elems = document.querySelectorAll(`[rid=${rId}]`);
            for (i = k = 0, len1 = elems.length; k < len1; i = ++k) {
              elem = elems[i];
              elemScope = scope[elem.getAttribute('scope')];
              if (elemScope) {
                elemScope.$destroy();
              }
              if (i > 0) {
                elem.remove();
              }
            }
            html = (await makeHtml());
            frag = document.createElement('div');
            parent = elems[0].parentNode;
            if (html && html.length) {
              for (l = 0, len2 = html.length; l < len2; l++) {
                elem = html[l];
                frag.innerHTML = elem;
                elemRoot = frag.querySelector('*');
                elems[0].parentNode.insertBefore(elemRoot, elems[0]);
              }
            }
            elems[0].remove();
            setRepeaterIndexVar(this, rId, this.id, template, vars, refresh);
            return renderVars(parent, getScope(parent));
          };
          makeHtml = async() => {
            var addItem, html, i, item, itemKey, items, k, len1;
            temp.innerHTML = template;
            elemRoot = temp.querySelector('*');
            elemRoot.removeAttribute('repeat');
            items = evalInContext(expression, this);
            html = [];
            addItem = async function(item, i) {
              var myScope;
              myScope = Scope(this);
              myScope.$index = i;
              myScope.$first = i === 0;
              myScope.$last = i === items.length - 1;
              myScope.$even = i % 2 === 1;
              myScope.$odd = i % 2 === 0;
              myScope[itemName] = item;
              elemRoot.setAttribute('scope', myScope.id);
              elemRoot.setAttribute('rid', rId);
              return html.push((await renderTemplate(temp.innerHTML, myScope)));
            };
            if (items) {
              type = Object.prototype.toString.call(items);
              if (type === '[object Array]') {
                for (i = k = 0, len1 = items.length; k < len1; i = ++k) {
                  item = items[i];
                  await addItem(item, i);
                }
              } else if (type === '[object Object]') {
                i = 0;
                for (itemKey in items) {
                  item = items[itemKey];
                  item.$name = itemKey;
                  await addItem(item, i);
                  i++;
                }
              }
            }
            return html;
          };
          html = (await makeHtml());
          setRepeaterIndexVar(this, rId, this.id, template, vars, refresh);
          return {
            overwrite: true,
            html: html,
            rid: rId
          };
        }
      };
    });
    yma.component('if', function() {
      return {
        controller: function() {
          var expression, lastResult, nId, refresh, template, vars;
          expression = this.$node.getAttribute('if');
          template = this.$node.innerHTML;
          nId = getNodeId(this.$node);
          vars = readVars(expression);
          lastResult = null;
          refresh = async() => {
            var child, childScope, k, len1, node, ref, result, results;
            result = evalInContext(expression, this);
            if (result !== lastResult) {
              lastResult = result;
              node = document.querySelector(`[nid=${nId}]`);
              if (!result) {
                ref = node.children;
                results = [];
                for (k = 0, len1 = ref.length; k < len1; k++) {
                  child = ref[k];
                  childScope = scope[child.getAttribute('scope')];
                  if (childScope) {
                    childScope.$destroy();
                    results.push(child.remove());
                  } else {
                    results.push(void 0);
                  }
                }
                return results;
              } else {
                node.innerHTML = (await renderTemplate(template, this));
                return renderVars(node, getScope(node));
              }
            }
          };
          refresh();
          return this.listen(vars, refresh);
        }
      };
    });
    yma.component('hide', function() {
      return {
        controller: function() {
          var expression, lastResult, nId, refresh, vars;
          expression = this.$node.getAttribute('hide');
          nId = getNodeId(this.$node);
          vars = readVars(expression);
          lastResult = null;
          refresh = () => {
            var isHidden, node, result;
            result = evalInContext(expression, this);
            if (result !== lastResult) {
              node = document.querySelector(`[nid=${nId}]`) || this.$node;
              lastResult = result;
              isHidden = /\bymaHide\b/.test(node.className);
              if (result) {
                if (!isHidden) {
                  return node.className += ' ymaHide';
                }
              } else {
                if (isHidden) {
                  return node.className = node.className.replace(/\s*ymaHide\s*/, ' ');
                }
              }
            }
          };
          refresh();
          return this.$listen(vars, refresh);
        }
      };
    });
    yma.component('show', function() {
      return {
        controller: function() {
          var expression, lastResult, nId, refresh, vars;
          expression = this.$node.getAttribute('show');
          nId = getNodeId(this.$node);
          vars = readVars(expression);
          lastResult = null;
          refresh = () => {
            var isHidden, node, result;
            result = evalInContext(expression, this);
            if (result !== lastResult) {
              node = document.querySelector(`[nid=${nId}]`) || this.$node;
              lastResult = result;
              isHidden = /\bymaHide\b/.test(node.className);
              if (!result) {
                if (!isHidden) {
                  return node.className += ' ymaHide';
                }
              } else {
                if (isHidden) {
                  return node.className = node.className.replace(/\s*ymaHide\s*/, ' ');
                }
              }
            }
          };
          refresh();
          return this.$listen(vars, refresh);
        }
      };
    });
    window.setTimeout(start);
    return yma;
  };

  window.yma = Yma();

}).call(this);
