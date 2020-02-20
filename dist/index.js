// Generated by CoffeeScript 2.5.1
(function() {
  var Callbacks, Environment, Yma, hash, hashObject, ogid;

  ogid = function(radix, rnd) {
    return parseInt((new Date().valueOf() - new Date(2020, 0, 1).valueOf()).toString().concat(Math.floor(Math.random() * (9999 || rnd))).split('').reverse().join('')).toString(radix || 36);
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

  hashObject = function(obj) {
    var hashed, key, val;
    hashed = {};
    for (key in obj) {
      val = obj[key];
      if (/^\$/.test(key)) {
        continue;
      }
      hashed[key] = hash(JSON.stringify(val));
    }
    return hashed;
  };

  Callbacks = function() {
    var callbacks, toRemove;
    callbacks = {};
    toRemove = [];
    return {
      $on: function(name, fn) {
        callbacks[name] = callbacks[name] || [];
        return callbacks[name].push(fn);
      },
      $once: function(name, fn) {
        var onceFn;
        callbacks[name] = callbacks[name] || [];
        onceFn = async function(data) {
          var output;
          output = (await fn(data));
          toRemove.push(onceFn);
          return output;
        };
        return callbacks[name].push(onceFn);
      },
      $off: function(name, fn) {
        callbacks[name] = callbacks[name] || [];
        return callbacks[name].splice(callbacks[name].indexOf(fn), 1);
      },
      $call: async function(name, data) {
        var fn, j, k, len, len1, ref;
        if (callbacks[name]) {
          ref = callbacks[name];
          for (j = 0, len = ref.length; j < len; j++) {
            fn = ref[j];
            await fn(data);
          }
        }
        for (k = 0, len1 = toRemove.length; k < len1; k++) {
          fn = toRemove[k];
          callbacks[name].splice(callbacks[name].indexOf(fn), 1);
        }
        return toRemove = [];
      }
    };
  };

  Environment = function() {
    var browser, mobile, ua;
    //from headjs
    ua = navigator.userAgent.toLowerCase();
    mobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(ua);
    ua = /(chrome|firefox)[ \/]([\w.]+)/.exec(ua) || /(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(android)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || /(trident).+rv:(\w.)+/.exec(ua) || [];
    browser = ua[1];
    switch (browser) {
      case 'msie':
      case 'trident':
        'ie';
        break;
      case 'ipod':
      case 'ipad':
      case 'iphone':
        'ios';
        break;
      case 'webkit':
        'safari';
    }
    return {
      mobile: mobile,
      browser: browser,
      version: ua[2]
    };
  };

  Yma = function(appName) {
    var Scope, bootstrapped, callbacks, checkAttrs, cleanupScopes, components, elements, environment, evalInContext, fillTemplate, fillVars, getElement, getProps, getScopeVar, getScopeVarRoot, getService, makeId, mergeScopes, offset, preRender, preRenderChildren, render, renderChildren, rootElem, scopeVar, scopes, services, setScopeVar, teardown, teardownChildren, updateScopes;
    rootElem = null;
    components = {};
    elements = [];
    scopes = {};
    services = {};
    environment = Environment();
    callbacks = Callbacks();
    bootstrapped = false;
    makeId = function(node, root) {
      var id, mynode;
      root = root || rootElem;
      if (node === root) {
        return 'root';
      }
      id = '';
      while (node && node !== root) {
        id += node.tagName + ':';
        mynode = node;
        while (mynode.previousSibling) {
          id += mynode.tagName + '@';
          mynode = mynode.previousSibling;
        }
        node = node.parentNode;
      }
      return id;
    };
    evalInContext = function(str, context) {
      try {
        return (new Function(`with(this) {return ${str}}`)).call(context);
      } catch (error) {}
    };
    offset = function(node) {
      var nodeOffset;
      nodeOffset = {
        x: 0,
        y: 0,
        w: node.offsetWidth,
        h: node.offsetHeight
      };
      while (node.parentNode) {
        nodeOffset.x += node.offsetLeft;
        nodeOffset.y += node.offsetTop;
        node = node.parentNode;
      }
      return nodeOffset;
    };
    fillTemplate = function(template, scope) {
      return template.replace(/\{\{(.+?)\}\}/g, function(all, expression) {
        var result;
        if (typeof (result = evalInContext(expression, scope)) === 'undefined') {
          return '';
        } else {
          return result;
        }
      });
    };
    mergeScopes = function(scope, merge, protectedFields) {
      var key, results, val;
      protectedFields = protectedFields || [];
      results = [];
      for (key in merge) {
        val = merge[key];
        if (!protectedFields.includes(key)) {
          results.push(scope[key] = val);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    cleanupScopes = async function() {
      var id, ref, ref1, results, scope, scopeElems;
      results = [];
      for (id in scopes) {
        scope = scopes[id];
        scopeElems = elements.filter(function(element) {
          return element.scope === id;
        });
        if (scopeElems.length === 0) {
          if ((ref = scope.$parent) != null) {
            ref.$children.splice((ref1 = scope.$parent) != null ? ref1.$children.indexOf(id) : void 0, 1);
          }
          await scope.$call('teardown');
          //remove scope from any services
          results.push(delete scopes[scope.$id]);
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    teardown = async function(id) {
      var r;
      r = new RegExp(id + '$');
      elements = elements.filter(function(element) {
        return !r.test(element.id);
      });
      return (await cleanupScopes());
    };
    teardownChildren = async function(id) {
      var r;
      r = new RegExp('.+' + id + '$');
      elements = elements.filter(function(element) {
        return !r.test(element.id);
      });
      return (await cleanupScopes());
    };
    updateScopes = async function(updatedScopes) {
      /*
      updateScope = (scope, changedVars) ->
        myhash = hashObject scope
        for key, val of myhash
          if val isnt scope.$hash?[key]
            if typeof(changedVars[key]) isnt 'undefined'
              changedVars[key] = scope[key]
          else
            if typeof(changedVars[key]) isnt 'undefined'
              scope[key] = changedVars[key]
        scope.$hash = myhash
        for childScope in scope.$children
          updateScope childScope, changedVars
      */
      var elemId, element, elemsToUpdate, i, index, j, len, preElements, preRoot, realRoot, reset, scope, unknowns;
      index = 0;
      while (updatedScopes.length > index + 1) {
        i = updatedScopes.length;
        while (i-- > index) {
          if (updatedScopes[i]) {
            if (updatedScopes[i].$isDescendantOf(updatedScopes[0])) {
              updatedScopes.splice(i, 1);
              continue;
            }
            if (updatedScopes[i].$isAncestorOf(updatedScopes[0])) {
              updatedScopes[0] = updatedScopes[i];
              updatedScopes.splice(i, 1);
              continue;
            }
          }
        }
        index++;
      }
      preRoot = document.createElement('div');
      preElements = [];
      realRoot = elements[0];
      preRoot.innerHTML = realRoot.html;
      await preRender(preRoot, preRoot, 0, preElements);
      unknowns = preElements.filter(function(element) {
        return /^UNKNOWN@/.test(element.id);
      });
      elemsToUpdate = [];
      unknowns.forEach(function(unknown) {
        var parentId;
        parentId = unknown.id.replace(/UNKNOWN@\w+:[\w@]+@/, '');
        if (!elemsToUpdate.includes(parentId)) {
          return elemsToUpdate.push(parentId);
        }
      });
      for (j = 0, len = elemsToUpdate.length; j < len; j++) {
        elemId = elemsToUpdate[j];
        if (!elemId) {
          elemId = 'root';
        }
        element = elements.filter(function(element) {
          return element.id === elemId;
        })[0];
        if (element) {
          scope = scopes[element.scope];
          await teardownChildren(elemId);
          element.elem.innerHTML = element.html;
          await renderChildren(element.elem, scope);
        }
      }
      reset = function(scope) {
        var childScope, elem, elemsToReset, k, l, len1, len2, len3, m, name, node, ref, ref1, ref2, results, t, val;
        elemsToReset = elements.filter(function(element) {
          return element.scope === scope.$id;
        });
        for (k = 0, len1 = elemsToReset.length; k < len1; k++) {
          elem = elemsToReset[k];
          t = 0;
          ref = elem.elem.childNodes;
          for (l = 0, len2 = ref.length; l < len2; l++) {
            node = ref[l];
            if (node.nodeType === document.TEXT_NODE) {
              node.replaceWith(elem.textNodes[t++] || '');
            }
          }
          ref1 = elem.attributes;
          for (name in ref1) {
            val = ref1[name];
            if (elem.elem.hasAttribute(name)) {
              elem.elem.setAttribute(name, val);
            }
          }
        }
        ref2 = scope.$children;
        results = [];
        for (m = 0, len3 = ref2.length; m < len3; m++) {
          childScope = ref2[m];
          results.push(reset(childScope));
        }
        return results;
      };
      i = updatedScopes.length;
      while (i-- > 0) {
        //updateScope updatedScopes[i], {}
        reset(updatedScopes[i]);
        await updatedScopes[i].$callChildren('update');
      }
      await fillVars();
      await checkAttrs();
      preRoot = null;
    };
    scopeVar = function(op, path, value, scope) {
      var arr, field, i, inside, j, k, lastIndex, lastPoint, len, len1, letter, level, lookingFor, myvar, ref, ref1, ref2, ref3, sp, splitPoints;
      myvar = evalInContext(path, scope);
      arr = [];
      splitPoints = [];
      inside = null;
      lookingFor = null;
      level = 0;
      ref = path.split('');
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        letter = ref[i];
        if (inside) {
          if (letter === lookingFor) {
            level--;
            if (level === 0) {
              Object.assign(splitPoints[splitPoints.length - 1], {
                endIndex: i,
                endPath: path.substr(0, i + 1)
              });
              inside = null;
              lookingFor = null;
            }
          } else if (letter === inside) {
            level++;
          }
        } else {
          if (letter === '[') {
            level++;
            inside = '[';
            lookingFor = ']';
            splitPoints.push({
              type: inside + lookingFor,
              index: i,
              path: path.substr(0, i)
            });
          } else if (letter === '(') {
            level++;
            inside = '(';
            lookingFor = ')';
            splitPoints.push({
              type: inside + lookingFor,
              index: i,
              path: path.substr(0, i)
            });
          } else if (letter === '.') {
            splitPoints.push({
              type: 'object',
              index: i,
              path: path.substr(0, i)
            });
          }
        }
      }
      myvar = null;
      for (k = 0, len1 = splitPoints.length; k < len1; k++) {
        sp = splitPoints[k];
        if (sp.type === 'object') {
          myvar = evalInContext(sp.path, scope);
          if (typeof myvar === 'undefined') {
            myvar = evalInContext('this.' + sp.path + '={}', scope);
          }
        }
        if (sp.type === '[]') {
          myvar = evalInContext(sp.path, scope);
          if (typeof myvar === 'undefined') {
            myvar = evalInContext('this.' + sp.path + '=[]', scope);
            myvar = evalInContext(sp.endPath + '={}', scope);
          }
        }
      }
      if (op === 'rootName') {
        return ((ref1 = splitPoints[0]) != null ? ref1.path : void 0) || path;
      }
      if (op === 'root') {
        return evalInContext(((ref2 = splitPoints[0]) != null ? ref2.path : void 0) || path, scope);
      }
      lastPoint = splitPoints[splitPoints.length - 1];
      lastIndex = lastPoint ? (lastPoint.lastIndex || lastPoint.index) + 1 : 0;
      if (((ref3 = splitPoints[splitPoints.length - 1]) != null ? ref3.type : void 0) === '[]') {
        field = evalInContext(path.substr(lastIndex).replace(/\]$/, ''), scope);
      } else {
        if (lastIndex) {
          field = path.substr(lastIndex);
        } else {
          field = path;
        }
      }
      if (op === 'get') {
        return (myvar || scope)[field];
      } else {
        (myvar || scope)[field] = value;
      }
      return value;
    };
    setScopeVar = function(path, value, scope) {
      return scopeVar('set', path, value, scope);
    };
    getScopeVar = function(path, scope) {
      return scopeVar('get', path, null, scope);
    };
    getScopeVarRoot = function(path, scope) {
      return scopeVar('root', path, null, scope);
    };
    Scope = function(parentScope) {
      var intervals, newscope, scopeCallbacks, timeouts;
      scopeCallbacks = Callbacks();
      timeouts = [];
      intervals = [];
      newscope = {
        $id: ogid(),
        $children: [],
        $parent: null,
        $environment: environment,
        $update: async function(updates, hard) {
          var j, key, len, myscope, propagateForwards, rootName, scope, updatedScopes, val;
          propagateForwards = function(myscope, rootName, value) {
            var propagate;
            propagate = function(childScope) {
              var child, j, len, ref;
              childScope[rootName] = val;
              ref = childScope.$children;
              for (j = 0, len = ref.length; j < len; j++) {
                child = ref[j];
                propagate(child);
              }
              return null;
            };
            return propagate(myscope);
          };
          for (key in updates) {
            val = updates[key];
            rootName = scopeVar('rootName', key, null, this);
            setScopeVar(key, val, this);
            val = this[rootName];
            myscope = this;
            while (myscope && myscope.$parent) {
              if (myscope.$hash[rootName] && myscope.$hash[rootName] !== myscope.$parent.$hash[rootName]) {
                myscope[rootName] = val;
                propagateForwards(myscope, rootName, val);
                break;
              }
              myscope = myscope.$parent;
            }
          }
          updatedScopes = Object.values(scopes).filter(function(scope) {
            return JSON.stringify(scope.$hash) !== JSON.stringify(hashObject(scope));
          });
          for (j = 0, len = updatedScopes.length; j < len; j++) {
            scope = updatedScopes[j];
            scope.$hash = hashObject(scope);
          }
          await updateScopes(updatedScopes);
          return callbacks.$call('updated');
        },
        $use: function(name) {
          var component, service;
          if (service = services[name]) {
            this[name] = service.fn;
            service.scopes.push(this);
          } else if (component = components[name.toUpperCase()]) {
            services[name] = {
              fn: (component.service || component)(),
              scopes: [this]
            };
            this[name] = services[name].fn;
          }
          return this.$on('teardown', function() {
            return services[name].scopes.splice(services[name].scopes.indexOf(this), 1);
          });
        },
        $on: scopeCallbacks.$on,
        $once: scopeCallbacks.$once,
        $off: scopeCallbacks.$off,
        $call: scopeCallbacks.$call,
        $callChildren: async function(name, data) {
          var childScope, j, len, ref;
          await scopeCallbacks.$call(name, data);
          ref = this.$children;
          for (j = 0, len = ref.length; j < len; j++) {
            childScope = ref[j];
            if (childScope) { //check this
              await childScope.$callChildren(name, data);
            }
          }
          return null;
        },
        $isDescendantOf: function(scope) {
          var myscope;
          if (scope.$id === this.$id) {
            return false;
          }
          myscope = this;
          while (myscope.$parent) {
            if (myscope.$id === scope.$id) {
              return true;
            }
            myscope = myscope.$parent;
          }
          return false;
        },
        $isAncestorOf: function(scope) {
          var check;
          if (scope.$id === this.$id) {
            return false;
          }
          check = function(myscope) {
            var childScope, j, len, ref;
            if (myscope.$id === scope.$id) {
              return true;
            }
            ref = myscope.$children;
            for (j = 0, len = ref.length; j < len; j++) {
              childScope = ref[j];
              if (check(childScope)) {
                return true;
              }
            }
            return false;
          };
          return check(scope);
        },
        $offset: offset,
        $timeout: function(fn, delay) {
          if (timeouts.length === 0) {
            scopeCallbacks.$on('teardown', function() {
              var j, len, results, timeout;
              results = [];
              for (j = 0, len = timeouts.length; j < len; j++) {
                timeout = timeouts[j];
                results.push(window.clearTimeout(timeout));
              }
              return results;
            });
          }
          return timeouts.push(window.setTimeout(fn, delay));
        },
        $interval: function(fn, delay) {
          if (intervals.length === 0) {
            scopeCallbacks.$on('teardown', function() {
              var interval, j, len, results;
              results = [];
              for (j = 0, len = intervals.length; j < len; j++) {
                interval = intervals[j];
                results.push(window.clearTimeout(interval));
              }
              return results;
            });
          }
          return intervals.push(window.setTimeout(fn, delay));
        },
        $addEventListeners: function(elem, listeners, fn) {
          var j, len, listener;
          if (typeof listeners === 'string') {
            listeners = [listeners];
          }
          for (j = 0, len = listeners.length; j < len; j++) {
            listener = listeners[j];
            elem.addEventListener(listener, fn);
          }
          return this.$on('teardown', function() {
            var k, len1, results;
            results = [];
            for (k = 0, len1 = listeners.length; k < len1; k++) {
              listener = listeners[k];
              results.push(elem.removeEventListener(listener, fn));
            }
            return results;
          });
        }
      };
      if (parentScope && parentScope.$id) {
        parentScope.$children.push(newscope);
        newscope.$parent = parentScope;
      }
      mergeScopes(newscope, parentScope, Object.keys(newscope));
      return newscope;
    };
    getElement = function(elem) {
      var id;
      id = makeId(elem);
      return elements.filter(function(element) {
        return element.id === id;
      })[0];
    };
    getProps = function(elem, scope) {
      var myattrs;
      myattrs = {};
      elem.getAttributeNames().forEach(function(name) {
        return myattrs[name] = scope ? fillTemplate(elem.getAttribute(name), scope) : elem.getAttribute(name);
      });
      return myattrs;
    };
    renderChildren = async function(elem, scope) {
      var child, children, j, k, len, len1, ref, results;
      //return if /\byma-router-parked\b/.test elem.className
      children = [];
      ref = elem.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        children.push(child);
      }
      results = [];
      for (k = 0, len1 = children.length; k < len1; k++) {
        child = children[k];
        results.push((await render(child, scope)));
      }
      return results;
    };
    render = async function(elem, scope) {
      var attr, attrComponent, attributes, clone, component, data, html, i, j, k, len, len1, myscopes, needsScope, newscope, node, preId, ref, ref1, textNodes;
      if (!elem) {
        return;
      }
      preId = null;
      scopes[scope.$id] = scope;
      scope.$hash = hashObject(scope);
      scope.$phase = 'render';
      scope.$call('bootstrap');
      html = elem.innerHTML;
      textNodes = [];
      attributes = {};
      data = {};
      ref = elem.childNodes;
      for (j = 0, len = ref.length; j < len; j++) {
        node = ref[j];
        if (node.nodeType === document.TEXT_NODE) {
          textNodes.push(node.data);
        }
      }
      ref1 = elem.getAttributeNames();
      for (k = 0, len1 = ref1.length; k < len1; k++) {
        attr = ref1[k];
        attributes[attr] = elem.getAttribute(attr);
        if (attrComponent = components[attr.toUpperCase()]) {
          if (typeof attrComponent.pre === 'function') {
            myscopes = (await attrComponent.pre(scope, elem, getProps(elem, scope)));
          }
          if (typeof myscopes !== 'undefined') {
            elem.removeAttribute(attr);
            preId = 'PREX:' + makeId(elem);
            if (myscopes) {
              if (myscopes.length) {
                i = myscopes.length;
                while (i-- > 0) {
                  clone = elem.cloneNode();
                  clone.innerHTML = elem.innerHTML;
                  elem.parentNode.insertBefore(clone, elem.nextSibling);
                  render(clone, myscopes[i]);
                }
                elem.innerHTML = '';
                elem.parentNode.removeChild(elem);
              } else {
                elem.innerHTML = '';
                if (myscopes.length === 0) {
                  elem.parentNode.removeChild(elem);
                }
              }
            }
          }
          //return#check this
          elem.setAttribute('checkattrs', true);
          needsScope = true;
        }
      }
      if (elem.parentNode && (component = components[elem.tagName])) {
        newscope = Scope(scope);
        scope = newscope;
        scopes[scope.$id] = scope;
        if (component.controller) {
          data = component.controller(scope, elem, getProps(elem, scope.$parent));
        }
        scope.$hash = hashObject(scope);
        elem.innerHTML = component.template ? component.template : html;
        elem.innerHTML = elem.innerHTML.replace('<children></children>', html);
        html = elem.innerHTML;
      } else {
        if (needsScope) {
          newscope = Scope(scope);
          scope = newscope;
          scopes[scope.$id] = scope;
          scope.$hash = hashObject(scope);
        }
      }
      elements.push({
        id: preId || makeId(elem),
        elem: elem,
        scope: scope.$id,
        html: html,
        textNodes: textNodes,
        attributes: attributes,
        data: data
      });
      return (await renderChildren(elem, scope));
    };
    preRenderChildren = async function(elem, root, preElements) {
      var child, children, j, k, len, len1, ref, results;
      //return if /\byma-router-parked\b/.test elem.className
      children = [];
      ref = elem.children;
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        children.push(child);
      }
      results = [];
      for (k = 0, len1 = children.length; k < len1; k++) {
        child = children[k];
        results.push((await preRender(child, root, 0, preElements)));
      }
      return results;
    };
    preRender = async function(elem, root, index, preElements) {
      var attr, attrComponent, attributes, clone, component, html, i, id, j, len, myscopes, preId, realElem, ref, scope;
      if (!elem) {
        return;
      }
      id = makeId(elem, root);
      preId = 'PREX:' + id;
      html = elem.innerHTML;
      attributes = {};
      //get scope using id
      realElem = elements.filter(function(myelem) {
        return (myelem.id === id) || (myelem.id === preId);
      })[index];
      scope = scopes[realElem != null ? realElem.scope : void 0];
      if (scope != null) {
        scope.$phase = 'prerender';
      }
      if (!(realElem || scope)) {
        preElements.push({
          id: 'UNKNOWN@' + id
        });
        return;
      }
      ref = elem.getAttributeNames();
      //get .pre scopes
      for (j = 0, len = ref.length; j < len; j++) {
        attr = ref[j];
        attributes[attr] = elem.getAttribute(attr);
        if (attrComponent = components[attr.toUpperCase()]) {
          if (typeof attrComponent.pre === 'function') {
            myscopes = (await attrComponent.pre(scope, elem, getProps(elem)));
          }
          if (typeof myscopes !== 'undefined') {
            if (myscopes) {
              if (myscopes.length) {
                i = myscopes.length;
                while (i-- > 0) {
                  myscopes[i].$parent.$children.splice(myscopes[i].$parent.$children.indexOf(myscopes[i], 1));
                  clone = elem.cloneNode();
                  clone.innerHTML = elem.innerHTML;
                  clone.removeAttribute(attr);
                  elem.parentNode.insertBefore(clone, elem.nextSibling);
                  await preRender(clone, root, i - 1, preElements);
                }
                elem.parentNode.removeChild(elem);
              } else {
                if (myscopes.length === 0) {
                  preElements.push({
                    id: 'UNKNOWN@H1:H1@' + makeId(elem.parentNode, root)
                  });
                  elem.parentNode.removeChild(elem);
                  return;
                }
              }
            }
          }
        }
      }
      //  preRender pre stuff
      //get component
      if (component = components[elem.tagName]) {
        elem.innerHTML = component.template ? component.template : html;
        elem.innerHTML = elem.innerHTML.replace('<children></children>', html);
      }
      //render component
      //push to preElements
      preElements.push({
        id: id
      });
      //preRenderChildren
      return (await preRenderChildren(elem, root, preElements));
    };
    fillVars = function() {
      var i, j, len, name, node, ref, results, val;
      i = elements.length;
      while (i-- > 0) {
        ref = elements[i].elem.getAttributeNames();
        for (j = 0, len = ref.length; j < len; j++) {
          name = ref[j];
          if (/\{\{/.test((val = elements[i].elem.getAttribute(name)))) {
            elements[i].elem.setAttribute(name, fillTemplate(val, scopes[elements[i].scope]));
          }
        }
      }
      i = elements.length;
      results = [];
      while (i-- > 0) {
        results.push((function() {
          var k, len1, ref1, results1;
          ref1 = elements[i].elem.childNodes;
          results1 = [];
          for (k = 0, len1 = ref1.length; k < len1; k++) {
            node = ref1[k];
            if (node.nodeType === document.TEXT_NODE && /\{\{/.test(node.data)) {
              results1.push(node.replaceWith(fillTemplate(node.data, scopes[elements[i].scope])));
            } else {
              results1.push(void 0);
            }
          }
          return results1;
        })());
      }
      return results;
    };
    checkAttrs = function() {
      var attr, attrComponent, attrFn, elem, j, len, results;
      results = [];
      for (j = 0, len = elements.length; j < len; j++) {
        elem = elements[j];
        if (elem.elem.getAttribute('checkattrs')) {
          elem.elem.removeAttribute('checkattrs');
          results.push((function() {
            var k, len1, ref, results1;
            ref = elem.elem.getAttributeNames();
            results1 = [];
            for (k = 0, len1 = ref.length; k < len1; k++) {
              attr = ref[k];
              if (attrComponent = components[attr.toUpperCase()]) {
                attrFn = attrComponent.post || attrComponent;
                if (typeof attrFn === 'function') {
                  attrFn(scopes[elem.scope], elem.elem, getProps(elem.elem));
                }
                results1.push(elem.elem.removeAttribute(attr));
              } else {
                results1.push(void 0);
              }
            }
            return results1;
          })());
        } else {
          results.push(void 0);
        }
      }
      return results;
    };
    getService = function(name) {
      var component, service;
      if (service = services[name]) {
        return service;
      } else if (component = components[name.toUpperCase()]) {
        services[name] = {
          fn: (component.service || component)(),
          scopes: []
        };
        return services[name];
      }
      return null;
    };
    return {
      appName: appName,
      render: async function(elem, scope) {
        if (!bootstrapped) {
          await callbacks.$call('bootstrap');
          bootstrapped = true;
        }
        elem = elem || document.querySelector('[app=' + appName + ']');
        rootElem = rootElem || elem;
        scope = scope || Scope();
        await render(elem, scope);
        await fillVars();
        await checkAttrs();
        callbacks.$call('rendered');
        return this;
      },
      $renderChildren: async function(elem, scope) {
        await renderChildren(elem, scope);
        await fillVars();
        await checkAttrs();
        return callbacks.$call('renderedChildren');
      },
      component: function(nameOrObj, fn) {
        var name;
        if (typeof nameOrObj === 'object') {
          for (name in nameOrObj) {
            fn = nameOrObj[name];
            components[name.toUpperCase()] = fn(this);
            this.$appendStyles(components[name.toUpperCase()].styles);
          }
        } else {
          components[nameOrObj.toUpperCase()] = fn(this);
          this.$appendStyles(components[nameOrObj.toUpperCase()].styles);
        }
        return this;
      },
      Scope: Scope,
      Callbacks: Callbacks,
      $getComponents: function() {
        return components;
      },
      $getElements: function() {
        return elements;
      },
      $getServices: function() {
        return services;
      },
      $getScopes: function() {
        return scopes;
      },
      $eval: evalInContext,
      $offset: offset,
      $setScopeVar: setScopeVar,
      $getScopeVar: getScopeVar,
      $getElement: getElement,
      $getProps: getProps,
      $teardown: teardown,
      $teardownChildren: teardownChildren,
      $on: callbacks.$on,
      $once: callbacks.$once,
      $off: callbacks.$off,
      $hash: hash,
      $hashObject: hashObject,
      $makeId: makeId,
      $addClass: function(elem, classNames) {
        var className, j, len;
        if (typeof classNames === 'string') {
          classNames = [classNames];
        }
        for (j = 0, len = classNames.length; j < len; j++) {
          className = classNames[j];
          this.$removeClass(elem, className);
          elem.className += ' ' + className;
        }
        return null;
      },
      $removeClass: function(elem, classNames) {
        var className, j, len, r;
        if (typeof classNames === 'string') {
          classNames = [classNames];
        }
        for (j = 0, len = classNames.length; j < len; j++) {
          className = classNames[j];
          r = new RegExp('\\s*\\b' + className + '\\b', 'g');
          elem.className = elem.className.replace(r, '');
        }
        return null;
      },
      $update: function(serviceName) {
        var service;
        if (service = getService(serviceName)) {
          return updateScopes(service.scopes);
        }
      },
      $appendStyles: function(stylesText) {
        var styles;
        if (!stylesText) {
          return;
        }
        styles = document.createElement('style');
        styles.innerText = stylesText.replace(/\n/gi, '');
        return document.querySelector('head').append(styles);
      },
      $internal: {
        components: components,
        scopes: scopes,
        services: services,
        callbacks: callbacks,
        fillTemplate: fillTemplate,
        mergeScopes: mergeScopes,
        cleanupScopes: cleanupScopes,
        updateScopes: updateScopes,
        scopeVar: scopeVar,
        getScopeVarRoot: getScopeVarRoot,
        getService: getService
      }
    };
  };

  module.exports = Yma;

}).call(this);

//# sourceMappingURL=index.js.map
