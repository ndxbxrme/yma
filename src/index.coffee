'use strict'
Yma = ->
  components = ['config', 'service', 'controller', 'component', 'template', 'route']
  view = null
  viewScope = null
  scopeId = 0
  fragId = 0
  index = {}
  data = {}
  register = {}
  for component in components
    data[component] = {}
    ((component) ->
      register[component] = (name, fn) ->
        data[component][name] = fn()
    )(component)
  scope = {}
  evalInContext = (str, context) ->
    try
      (new Function("with(this) {return #{str}}"))
      .call context
  hash = (str) ->
    h = 5381
    i = str.length
    while i
      h = (h * 33) ^ str.charCodeAt --i
    h
  callCallbacks = (obj, name) ->
    for cb in obj.$callbacks[name]
      cb?() 
  getScopeVar = (myscope, name) ->
    myvar = myscope
    bits = name.split /\./g
    for bit in bits
      myvar = myvar[bit]
    if myvar is myscope
      return undefined 
    else
      return myvar
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
  makeScope = (myscope, _id) ->
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
          if fragsToUpdate.length
            updateFrags fragsToUpdate
          @.$updating = false
      $destroy: ->
        callCallbacks @, 'destroy'
        #@.$parent.$children?.splice(@.$parent.$children.indexOf(@), 1)
        for child in @.$children
          child.$destroy()
        @.children = undefined 
        delete scope[@.id]
        #find the fragments to delete and 
        indexScope = index[@.id]
        if indexScope 
          for frag of indexScope.frags
            for scopeKey of index
              if indexScope.id isnt scopeKey
                testScope = index[scopeKey]
                delete testScope.frags[frag]
                for key of testScope.vars
                  myvar = testScope.vars[key]
                  delete myvar.frags[frag]
                  if Object.keys(myvar.frags).length is 0
                    delete testScope.vars[key]
        delete index[@.id]
      $use: (args) ->
        if typeof args is 'string'
          args = [args]
        for arg in args
          if data.service[arg]
            @["_#{arg}"] = data.service[arg]
      $inherit: ->
    scope[newScope.id] = newScope
    myscope?.$children?.push newScope
    newScope
  makeScope {}, 'root'
  scope.root.thing = 'buddy'
  scope.root.testFn = ->
    console.log 'hey from root scope, ' + @.thing
  renderComponent = (node, elem, myscope, append) ->
    temp = document.createElement('template')
    frag = document.createElement 'div'
    newScope = if elem.scope then makeScope(myscope) else myscope
    newScope.$node = node
    frag.innerHTML = renderTemplate(fetchTemplate(elem), newScope)
    temp.content.appendChild frag
    elemRoot = frag.querySelector '*'
    newScope.$elem = elemRoot
    fetchController elem.controller, newScope
    node[if append then 'append' else 'replaceWith'] elemRoot
    if elem.scope
      elemRoot.setAttribute 'scope', newScope.id
  fetchController = (arg, myscope) -> 
    if arg
      type = typeof arg
      if type is 'function'
        arg.call myscope
      else if type is 'string'
        ctrl = data.controller[arg]
        if ctrl
          ctrl.call myscope
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
    data.template[name]?.html or '' 
  setIndexVar = (myscope, fragId, fragIndex, fragScopeId, template, vars) ->
    indexScope = index[myscope.id] = index[myscope.id] or
      frags: {}
      vars: {}
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
          return setIndexVar newScope, fragId, fragIndex, myscope.id, template, [newVar]
      if typeof myvars[myvar.name] is 'undefined'
        myscope[myvar.name] = myscope[myvar.name] or null
        myvars[myvar.name] = 
          value: hash JSON.stringify myscope[myvar.name]
          frags: {}
        myvars[myvar.name].frags[fragId] = true
      else
        if not myvars[myvar.name].frags[fragId]
          myvars[myvar.name].frags[fragId] = true
      frag.vars[myvar.name] = true
  fillTemplate = (template, data, fragId, fragIndex) ->
    template.replace /\{\{(.+?)\}\}/g, (all, match) ->
      context = {}
      #console.log match
      ast = acorn.parse match
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
              fnstart = match.indexOf('(', node.start)
              fnargs = match.substr fnstart, node.end - fnstart
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
      if typeof fragId isnt 'undefined'
        setIndexVar data, fragId, fragIndex, data.id, template, vars
      evalInContext match, data
  renderTemplate = (template, myscope) ->
    temp = document.createElement('template')
    frag = document.createElement 'div'
    frag.innerHTML = template
    temp.content.appendChild frag
    for elem of data.component
      nodes = frag.querySelectorAll elem
      if nodes and nodes.length
        for node in nodes
          renderComponent node, data.component[elem], myscope
      nodes = frag.querySelectorAll("[#{elem}]")
      if nodes and nodes.length
        for node in nodes
          renderComponent node, data.component[elem], myscope
    frag.innerHTML
  collectTemplatesFromHTML = ->
    scripts = document.getElementsByTagName 'SCRIPT'
    for script in scripts
      if script.type is 'text/template'
        register.template script.getAttribute('name'), ->
          html: script.innerText
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
        console.log 'model'
        elem.value = fillTemplate "{{#{attr.value}}}", myscope
    for child in elem.children
      renderVars child, myscope
  changeRoute = (state) ->
    #tear down current route
    if viewScope then viewScope.$destroy()
    nextRoute = data.route[state]
    viewScope = makeScope scope.root
    fetchController nextRoute.controller, viewScope
    view.setAttribute 'scope', viewScope.id
    #fId = "f#{fragId++}"
    #view.setAttribute 'frag', fId
    view.innerHTML = renderTemplate(fetchTemplate(nextRoute), viewScope)
    renderVars view, viewScope
    #view.innerHTML = fillTemplate(renderTemplate(fetchTemplate(nextRoute), viewScope), viewScope, fId)
  getScope = (elem) ->
    while elem and elem.tagName isnt 'HTML'
      if myscope = elem.getAttribute 'scope'
        return scope[myscope]
      elem = elem.parentNode
    scope.root
  start = () ->
    view = document.querySelector 'view'
    myscope = scope.root
    collectTemplatesFromHTML()
    route = null
    for routeKey of data.route
      if data.route[routeKey].default 
        route = data.route[routeKey]
        changeRoute routeKey
        break
    if not route
      if data.route['/']
        changeRoute '/'
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
  window.setTimeout start
  register: register
yma = Yma()
