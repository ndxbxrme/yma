'use strict'
Yma = ->
  yma = {}
  objTypes = ['config', 'service', 'controller', 'component', 'template', 'route']
  view = null
  viewScope = null
  scopeId = 0
  fragId = 0
  repeaterId = 0
  index = 
    services: {}
  data = {}
  register = {}
  scope = {}
  
  Scope = (myscope, _id) ->
    newScope =
      id: _id or "s#{scopeId++}" 
      $root: scope.root
      $parent: myscope
      $children: []
      $callbacks:
        destroy: []
      $on: (name, fn) ->
        @.$callbacks[name].push fn
      $updating: false
      $update: (arg) ->
        if @.$updating
          setTimeout @.update args
        else
          @.$updating = true
          repeatersToUpdate = []
          fragsToUpdate = []
          indexScope = index[@.id]
          if indexScope
            for key of indexScope.vars
              indexVar = indexScope.vars[key]
              myvar = getScopeVar @, key
              myhash = hash JSON.stringify myvar
              if myhash isnt indexVar.value
                indexVar.value = myhash
                for fragKey of indexVar.frags
                  frag = indexScope.frags[fragKey]
                  if fragsToUpdate.indexOf(frag) is -1
                    fragsToUpdate.push frag
                for repeaterKey of indexVar.repeaters
                  repeater = indexScope.repeaters[repeaterKey]
                  if repeatersToUpdate.indexOf(repeater) is -1
                    repeatersToUpdate.push repeater
          for repeater in repeatersToUpdate
            repeater.refreshFn()
          if fragsToUpdate.length
            updateFrags fragsToUpdate
          @.$updating = false
      $destroy: ->
        callCallbacks @, 'destroy'
        noChildren = @.$children.length
        while noChildren--
          child = @.$children[0]
          child.$destroy()
        @.children = undefined 
        delete scope[@.id]
        #find the fragments to delete and 
        indexScope = index[@.id]
        if indexScope 
          deleteIndexItems = (itemKey) ->
            for item of indexScope[itemKey]
              for scopeKey of index
                if indexScope.id isnt scopeKey
                  testScope = index[scopeKey]
                  if testScope[itemKey]
                    delete testScope[itemKey][item]
                    for key of testScope.vars
                      myvar = testScope.vars[key]
                      delete myvar[itemKey][item]
                      if Object.keys(myvar[itemKey]).length is 0
                        delete testScope.vars[key]
          deleteIndexItems 'frags'
          deleteIndexItems 'repeaters'
        @.$parent.$children?.splice(@.$parent.$children.indexOf(@), 1)
        for service of index.services
          if index.services[service][@.id]
            delete index.services[service][@.id]
          if Object.keys(index.services[service]).length is 0
            delete index.services[service]
        delete index[@.id]
      $use: (args) ->
        if typeof args is 'string'
          args = [args]
        for arg in args
          if data.service[arg]
            @["_#{arg}"] = data.service[arg]
            index.services[arg] = index.services[arg] or {}
            index.services[arg][@.id] = true
      $inherit: ->
    scope[newScope.id] = newScope
    myscope?.$children?.push newScope
    newScope
  ComponentScope = (name) ->
    $name: name
    $update: ->
      if index.services[name]
        for myscope of index.services[name]
          scope[myscope]?.$update()
  Router = ->
    routes = []
    push: (route) ->
      routes.push route
    get: (url) ->
      outData = null
      outParams = {}
      outUrl = null
      for testRoute in routes
        if m = url.match testRoute.regex
          outData = testRoute.controller
          i = 0
          while i++ < m.length - 1
            outParams[testRoute.params[i - 1]] = m[i]
          break
        if testRoute.controller.default
          outUrl = testRoute.name
          outData = testRoute.controller
          outParams = []
      if not outData
        outData = data.route['/']
        outUrl = '/'
      data: outData
      params: outParams
      url: outUrl
  router = Router()
  HTTP = () ->
    doRequest = (method, url, data) ->
      new Promise (resolve, reject) ->
        req = new XMLHttpRequest()
        req.onreadystatechange = ->
          if @.readyState is 4
            resolve @.responseText
        req.open method, url, true
        if method is 'POST'
          req.setRequestHeader 'Content-Type', 'application/x-www-form-urlencoded'
        req.send data
    get: (url) ->
      if data.template[url]
        return data.template[url]
      doRequest 'GET', url
    post: (url, data) ->
      doRequest 'POST', url, data
  http = HTTP()
  Scope {}, 'root'
  scope.root.thing = 'buddy'
  scope.root.testFn = ->
  #--------------------------------------
  # UTILITY
  #--------------------------------------
  makeRouteRegex = (name, route) ->
    params = []
    reg = route.replace /:(\w+)/g, (all, param) ->
      params.push param
      '([^/]+)'
    router.push
      regex: new RegExp reg + '$'
      params: params
      controller: data.route[name]
  for type in objTypes
    data[type] = {}
    ((type) ->
      yma[type] = (name, fn) ->
        cScope = ComponentScope name
        data[type][name] = fn.call cScope
        if type is 'route'
          if typeof name is 'array'
            for route in name
              makeRouteRegex name, route
          else
            makeRouteRegex name, name
    )(type)
  evalInContext = (str, context) ->
    try
      (new Function("with(this) {return #{str}}"))
      .call context
  hash = (str) ->
    if typeof str is 'undefined'
      return 0
    h = 5381
    i = str.length
    while i
      h = (h * 33) ^ str.charCodeAt --i
    h
  callCallbacks = (obj, name) ->
    for cb in obj.$callbacks[name]
      cb?() 
  #--------------------------------------
  # FETCH 
  #--------------------------------------
  getScopeVar = (myscope, name) ->
    evalInContext name, myscope
  getScope = (elem) ->
    while elem and elem.tagName isnt 'HTML'
      if myscope = elem.getAttribute 'scope'
        return scope[myscope]
      elem = elem.parentNode
    scope.root
  collectTemplatesFromHTML = ->
    scripts = document.getElementsByTagName 'SCRIPT'
    for script in scripts
      if script.type is 'text/template'
        yma.template script.getAttribute('name'), ->
          html: script.innerText
  fetchController = (arg, myscope) -> 
    if arg
      type = typeof arg
      if type is 'function'
        return await arg.call myscope
      else if type is 'string'
        ctrl = data.controller[arg]
        if ctrl
          return await ctrl.call myscope
    return null
  fetchTemplate = (arg) ->
    name = ''
    if arg
      if typeof arg is 'object'
        if arg.template
          name = arg.template
        else if arg.templateUrl
          name = arg.templateUrl
      else 
        name = arg
    template = data.template[name]?.html or '' 
    if not template
      template = await http.get name
      data.template[name] = template
    template
  #--------------------------------------
  # INDEXING
  #--------------------------------------
  setIndexVar = (myscope, fragId, fragIndex, fragScopeId, template, vars) ->
    indexScope = index[myscope.id] = index[myscope.id] or
      frags: {}
      vars: {}
      repeaters: {}
    myfrags = indexScope.frags
    myvars = indexScope.vars
    frag = myfrags[fragId] = myfrags[fragId] or {}
    frag = frag["i#{fragIndex}"] = frag["i#{fragIndex}"] or {}
    if typeof frag.template is 'undefined'
      frag.template = template
    frag.vars = frag.vars or {}
    frag.id = fragId
    frag.index = fragIndex
    frag.scope = fragScopeId
    vars.map (myvar) ->
      if /\$parent|\$root/.test myvar.route[0]
        newVar = JSON.parse JSON.stringify myvar
        newVar.route.splice 0, 1
        newVar.name = newVar.name.replace /^(\$parent|\$root)\./, ''
        newScope = myscope[myvar.route[0]]
        if newScope
          return setIndexVar newScope, fragId, fragIndex, fragScopeId, template, [newVar] #check this
      if typeof myvars[myvar.name] is 'undefined'
        myscope[myvar.name] = myscope[myvar.name] or null
        myvars[myvar.name] = 
          value: hash JSON.stringify evalInContext myvar.name, myscope
          frags: {}
        myvars[myvar.name].frags[fragId] = true
      else
        if not myvars[myvar.name].frags[fragId]
          myvars[myvar.name].frags[fragId] = true
      frag.vars[myvar.name] = true
  setRepeaterIndexVar = (myscope, repeaterId, repeaterScopeId, template, vars, refreshFn) ->
    indexScope = index[myscope.id] = index[myscope.id] or
      frags: {}
      vars: {}
      repeaters: {}
    myrepeaters = indexScope.repeaters
    myvars = indexScope.vars
    repeater = myrepeaters[repeaterId] = myrepeaters[repeaterId] or {}
    if typeof repeater.template is 'undefined'
      repeater.template = template
    repeater.vars = repeater.vars or {}
    repeater.id = repeaterId
    repeater.scope = repeaterScopeId
    repeater.refreshFn = refreshFn
    vars.map (myvar) ->
      if /\$parent|\$root/.test myvar.route[0]
        newVar = JSON.parse JSON.stringify myvar
        newVar.route.splice 0, 1
        newVar.name = newVar.name.replace /^(\$parent|\$root)\./, ''
        newScope = myscope[myvar.route[0]]
        if newScope
          return setRepeaterIndexVar newScope, repeaterId, repeaterScopeId, template, [newVar], refreshFn #check this
      if typeof myvars[myvar.name] is 'undefined'
        myscope[myvar.name] = myscope[myvar.name] or null
        myvars[myvar.name] = 
          value: hash JSON.stringify evalInContext myvar.name, myscope
          frags: {}
          repeaters: {}
        myvars[myvar.name].repeaters[repeaterId] = true
      else
        if not myvars[myvar.name].repeaters[repeaterId]
          myvars[myvar.name].repeaters[repeaterId] = true
      repeater.vars[myvar.name] = true
  #--------------------------------------
  # TEMPLATE RENDERING
  #--------------------------------------
  Element.prototype.appendAfter = (element) ->
    element.parentNode.insertBefore @, element.nextSibling
  updateFrags = (fragsToUpdate) ->
    i = fragsToUpdate.length
    if i
      while i--
        frags = fragsToUpdate[i]
        for fragKey of frags
          frag = frags[fragKey]
          fragElem = document.querySelector "[frag=#{frag.id}]"
          myscope = getScope fragElem
          if typeof frag.index is 'string'
            fragElem.setAttribute frag.index, fillTemplate frag.template, myscope, frag.id, frag.index
          else
            fragNode = fragElem.childNodes[frag.index]
            fragNode.nodeValue = fillTemplate frag.template, myscope, frag.id, frag.index 
  renderComponent = (node, elem, myscope, append) ->
    temp = document.createElement('template')
    frag = document.createElement 'div'
    if node.getAttribute 'scope'
      newScope = getScope node
    else
      newScope = if elem.scope then Scope(myscope) else myscope
    newScope.$node = node
    frag.innerHTML = await renderTemplate(await fetchTemplate(elem), newScope)
    temp.content.appendChild frag
    elemRoot = frag.querySelector '*'
    newScope.$elem = elemRoot
    result = await fetchController elem.controller, newScope
    if result and typeof result is 'object'
      if result.overwrite
        if result.html.length
          i = -1
          while i++ < result.html.length - 1
            frag.innerHTML = result.html[i]
            elemRoot = frag.querySelector '*'
            node.parentNode.insertBefore elemRoot, node
          node.remove()
        else
          frag.innerHTML = "<div rid='#{result.rid}' style='display:none'></div>"
          elemRoot = frag.querySelector '*'
          node.replaceWith elemRoot
        return        
    node[if append then 'appendAfter' else 'replaceWith'] elemRoot
    if elem.scope or node.getAttribute 'scope'
      elemRoot.setAttribute 'scope', newScope.id
    if node.getAttribute 'rid'
      elemRoot.setAttribute 'rid', node.getAttribute 'rid'
  renderTemplate = (template, myscope) ->
    await template
    temp = document.createElement('template')
    frag = document.createElement 'div'
    frag.innerHTML = template
    temp.content.appendChild frag
    for elem of data.component
      nodes = frag.querySelectorAll elem
      if nodes and nodes.length
        for node in nodes
          await renderComponent node, data.component[elem], myscope
      nodes = frag.querySelectorAll("[#{elem}]")
      if nodes and nodes.length
        for node in nodes
          await renderComponent node, data.component[elem], myscope
    frag.innerHTML
  #--------------------------------------
  # VARIABLE RENDERING
  #--------------------------------------
  renderVars = (elem, myscope) ->
    if attrScope = elem.getAttribute 'scope'
      myscope = scope[attrScope]
    fId = elem.getAttribute 'frag'
    for childNode, i in elem.childNodes
      if childNode.nodeValue and childNode.nodeValue.indexOf('{{') isnt -1
        if not fId
          fId = "f#{fragId++}"
          elem.setAttribute 'frag', fId
        childNode.nodeValue = fillTemplate childNode.nodeValue, myscope, fId, i
    for attr in elem.attributes
      if attr.value.indexOf('{{') isnt -1
        if not fId
          fId = "f#{fragId++}"
          elem.setAttribute 'frag', fId
        attr.value = fillTemplate attr.value, myscope, fId, attr.name
      else if attr.name is 'model'
        elem.value = fillTemplate "{{#{attr.value}}}", myscope
    for child in elem.children
      renderVars child, myscope
  readVars = (expression) ->
    context = {}
    #console.log expression
    ast = acorn.parse expression
    vars = []
    myvar = null
    doWalk = (ast) ->
      acorn.walk.full ast, (node) ->
        switch node.type
          when 'Identifier'            
            myvar =
              route: [node.name]
              name: node.name
              start: node.start
            vars.push myvar
          when 'CallExpression'
            fnstart = expression.indexOf('(', node.start)
            fnargs = expression.substr fnstart, node.end - fnstart
            for v in vars
              if v.start is node.start
                v.name += fnargs
          when 'MemberExpression'
            if myvar
              if node.property.type is 'Identifier'
                myvar.route.push node.property.name
                myvar.name += ".#{node.property.name}"
              else if node.property.type is 'Literal'
                myvar.route.push "[#{node.property.raw}]"
                myvar.name += "[#{node.property.raw}]"
          when 'AssignmentExpression'
            doWalk node.left
            doWalk node.right
    doWalk ast
    vars
  fillTemplate = (template, data, fragId, fragIndex) ->
    template.replace /\{\{(.+?)\}\}/g, (all, expression) ->
      vars = readVars expression
      if typeof fragId isnt 'undefined'
        setIndexVar data, fragId, fragIndex, data.id, template, vars
      evalInContext(expression, data) or ''
  #--------------------------------------
  # 
  #--------------------------------------
  changeRoute = (state, pop) ->
    view = document.querySelector 'view'
    nextRouteData = router.get state
    if nextRouteData.url
      state = nextRouteData.url
    if not pop
      window.history.pushState state, '', state
    #tear down current route
    if viewScope then viewScope.$destroy()
    nextRoute = nextRouteData.data
    viewScope = Scope scope.root
    viewScope.$params = nextRouteData.params
    fetchController nextRoute.controller, viewScope
    view.setAttribute 'scope', viewScope.id
    view.innerHTML = await renderTemplate(await fetchTemplate(nextRoute), viewScope)
    renderVars view, viewScope
  start = () ->
    body = document.querySelector 'body'
    myscope = scope.root
    collectTemplatesFromHTML()
    changeRoute window.location.pathname
    #--------------------------------------
    # LISTENERS
    #--------------------------------------
    window.addEventListener 'click', (e) ->
      myscope = getScope e.target
      if e.target.getAttribute 'click'
        evalInContext e.target.getAttribute('click'), myscope
      if e.target.tagName is 'A'
        e.preventDefault()
        e.stopPropagation()
        changeRoute e.target.getAttribute('href')
    window.addEventListener 'keyup', (e) ->
      myscope = getScope e.target
      if e.target.getAttribute 'model'
        evalInContext "#{e.target.getAttribute('model')} = '#{e.target.value}'", myscope
        myscope.$update()
      if e.target.getAttribute 'keyup'
        console.log evalInContext e.target.getAttribute('keyup'), myscope
    window.onpopstate = (event) ->
      changeRoute event.state, true
  #--------------------------------------
  # BUILT IN COMPONENTS
  #--------------------------------------
  yma.component 'repeat', ->
    controller: ->
      rId = "r#{repeaterId++}"
      repeatAttr = @.$node.getAttribute 'repeat'
      [expression, itemName] = repeatAttr.split /\s+by\s+/
      vars = readVars expression
      itemName = itemName or 'item'
      template = @.$node.outerHTML
      temp = document.createElement 'div'
      temp.innerHTML = template
      elemRoot = temp.querySelector '*'
      elemRoot.removeAttribute 'repeat'
      refresh = =>
        elems = document.querySelectorAll "[rid=#{rId}]"
        for elem, i in elems
          elemScope = scope[elem.getAttribute('scope')]
          if elemScope
            elemScope.$destroy()
          if i > 0
            elem.remove()
        html = await makeHtml()
        frag = document.createElement 'div'
        parent = elems[0].parentNode
        if html and html.length
          for elem in html
            frag.innerHTML = elem
            elemRoot = frag.querySelector '*'
            elems[0].parentNode.insertBefore elemRoot, elems[0]
        elems[0].remove()
        setRepeaterIndexVar @, rId, @.id, template, vars, refresh
        renderVars parent, getScope parent
      makeHtml = =>
        temp.innerHTML = template
        elemRoot = temp.querySelector '*'
        elemRoot.removeAttribute 'repeat'
        items = evalInContext expression, @
        html = []
        if items
          for item, i in items
            myScope = Scope @
            myScope.$index = i
            myScope.$first = i is 0
            myScope.$last = i is items.length - 1
            myScope.$even = i % 2 is 1
            myScope.$odd = i % 2 is 0
            myScope[itemName] = item
            elemRoot.setAttribute 'scope', myScope.id
            elemRoot.setAttribute 'rid', rId
            html.push await renderTemplate(temp.innerHTML, myScope)
        html
      html = await makeHtml()
      setRepeaterIndexVar @, rId, @.id, template, vars, refresh
      overwrite: true
      html: html
      rid: rId
  window.setTimeout start
  yma
@yma = Yma()
