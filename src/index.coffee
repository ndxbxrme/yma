ogid = (radix, rnd) ->
  parseInt((new Date().valueOf() - new Date(2020,0,1).valueOf()).toString().concat(Math.floor(Math.random() * (9999 or rnd))).split('').reverse().join('')).toString(radix or 36)
hash = (str) ->
  if typeof str is 'undefined'
    return 0
  h = 5381
  i = str.length
  while i
    h = (h * 33) ^ str.charCodeAt --i
  h
hashObject = (obj) ->
  hashed = {}
  for key, val of obj
    continue if /^\$/.test key
    hashed[key] = hash JSON.stringify(val)
  hashed
Callbacks = ->
  callbacks = {}
  $on: (name, fn) ->
    callbacks[name] = callbacks[name] or []
    callbacks[name].push fn
  $off: (name, fn) ->
    callbacks[name] = callbacks[name] or []
    callbacks[name].splice callbacks[name].indexOf(fn), 1
  $call: (name, data) ->
    if callbacks[name]
      for fn in callbacks[name]
        await fn data
Yma = (appName) ->
  rootElem = null
  makeId = (node, root) ->
    root = root or rootElem
    return 'root' if node is root
    id = ''
    while node isnt root
      id += node.tagName + ':'
      mynode = node
      while mynode.previousSibling
        id += mynode.tagName + '@'
        mynode = mynode.previousSibling
      node = node.parentNode
    id
  evalInContext = (str, context) ->
    try
      (new Function("with(this) {return #{str}}"))
      .call context
  fillTemplate = (template, scope) ->
    template.replace /\{\{(.+?)\}\}/g, (all, expression) ->
      evalInContext(expression, scope) or ''
  components = {}
  elements = []
  scopes = {}
  services = {}
  callbacks = Callbacks()
  bootstrapped = false
  mergeScopes = (scope, merge) ->
    for key, val of merge
      if not /^\$/.test key
        scope[key] = val
  updateScopes = ->
    for id, scope of scopes
      scopeElems = elements.filter (element) -> element.scope is id
      if scopeElems.length is 0
        scope.$parent?.$children.splice scope.$parent?.$children.indexOf(id), 1
        await scope.$call 'teardown'
        #remove scope from any services
        delete scopes[scope.$id]
  teardown = (id) ->
    r = new RegExp id + '$'
    elements = elements.filter (element) ->
      not r.test element.id
    await updateScopes()
  teardownChildren = (id) ->
    r = new RegExp '.+' + id + '$'
    elements = elements.filter (element) ->
      not r.test element.id
    await updateScopes()

  Scope = (merge) ->
    scopeCallbacks = Callbacks()
    timeouts = []
    intervals = []
    newscope =
      $id: ogid()
      $children: []
      $parent: null
      $update: (updates, hard) ->
        myscope = @
        while myscope.$parent
          for key of updates
            if typeof(myscope[key]) isnt 'undefined'
              sharedWithParent = myscope[key] is myscope.$parent?[key]
              myscope[key] = updates[key]
              delete updates[key] if not sharedWithParent
            else
              delete updates[key]

          myscope = myscope.$parent
        updatedScopes = Object.values(scopes).filter (scope) -> (JSON.stringify(scope.$hash) isnt JSON.stringify(hashObject scope))
        index = 0
        while updatedScopes.length > index + 1
          i = updatedScopes.length
          while i-- > index
            if updatedScopes[i].$isDescendantOf updatedScopes[0]
              updatedScopes.splice i, 1
              continue
            if updatedScopes[i].$isAncestorOf updatedScopes[0]
              updatedScopes[0] = updatedScopes[i]
              updatedScopes.splice i, 1
              continue
          index++
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
        preRoot = document.createElement 'div'
        preElements = []
        realRoot = elements[0]
        preRoot.innerHTML = realRoot.html
        await preRender preRoot, preRoot, 0, preElements
        unknowns = preElements.filter (element) -> /^UNKNOWN@/.test(element.id)
        elemsToUpdate = []
        unknowns.forEach (unknown) ->
          parentId = unknown.id.replace /UNKNOWN@\w+:[\w@]+@/, ''
          elemsToUpdate.push parentId if not elemsToUpdate.includes parentId
        for elemId in elemsToUpdate
          element = elements.filter((element) -> element.id is elemId)[0]
          if element
            scope = scopes[element.scope]
            await teardownChildren elemId
            element.elem.innerHTML = element.html
            await renderChildren element.elem, scope
        reset = (scope) ->
          elemsToReset = elements.filter (element) ->
            element.scope is scope.$id
          for elem in elemsToReset
            t = 0
            for node in elem.elem.childNodes
              if node.nodeType is document.TEXT_NODE
                node.replaceWith elem.textNodes[t++] or ''
            for name, val of elem.attributes
              elem.elem.setAttribute name, val
          reset childScope for childScope in scope.$children
        i = updatedScopes.length
        while i-- > 0
          updateScope updatedScopes[i], {}
          reset updatedScopes[i]
          await updatedScopes[i].$callChildren 'update'
        await fillVars()
        await checkAttrs()
        preRoot = null
        return
      $use: (name) ->
        if service = services[name]
          @[name] = service.fn
          service.scopes.push @.$id
        else if component = components[name.toUpperCase()]
          services[name] =
            fn: (component.service or component)()
            scopes: [@.$id]
          @[name] = services[name].fn
        @.$on 'teardown', ->
          services[name].scopes.splice services[name].scopes.indexOf(@.$id), 1
      $on: scopeCallbacks.$on
      $off: scopeCallbacks.$off
      $call: scopeCallbacks.$call
      $callChildren: (name, data) ->
        await scopeCallbacks.$call name, data
        for childScope in @.$children
          await childScope.$callChildren name, data
        null
      $isDescendantOf: (scope) ->
        return false if scope.$id is @.$id
        myscope = @
        while myscope.$parent
          return true if myscope.$id is scope.$id
          myscope = myscope.$parent
        false
      $isAncestorOf: (scope) ->
        return false if scope.$id is @.$id
        check = (myscope) ->
          return true if myscope.$id is scope.$id
          for childScope in myscope.$children
            return true if check childScope
          false
        check scope
      $timeout: (fn, delay) ->
        if timeouts.length is 0
          scopeCallbacks.$on 'teardown', ->
            for timeout in timeouts
              window.clearTimeout timeout
        timeouts.push window.setTimeout fn, delay
      $interval: (fn, delay) ->
        if intervals.length is 0
          scopeCallbacks.$on 'teardown', ->
            for interval in intervals
              window.clearTimeout interval
        intervals.push window.setTimeout fn, delay
    if merge and merge.$id
      merge.$children.push newscope
      newscope.$parent = merge
    mergeScopes newscope, merge
    newscope
  getProps = (elem) ->
    myattrs = {}
    elem.getAttributeNames().forEach (name) -> myattrs[name] = elem.getAttribute(name)
    myattrs
  renderChildren = (elem, scope) ->
    children = []
    children.push child for child in elem.children
    await render child, scope for child in children
  render = (elem, scope) ->
    preId = null
    scopes[scope.$id] = scope
    scope.$hash = hashObject scope
    scope.$call 'bootstrap'
    html = elem.innerHTML
    textNodes = []
    attributes = {}
    for node in elem.childNodes
      textNodes.push node.data if node.nodeType is document.TEXT_NODE
    for attr in elem.getAttributeNames()
      attributes[attr] = elem.getAttribute attr
      if attrComponent = components[attr.toUpperCase()]
        myscopes = await attrComponent.pre scope, elem, getProps(elem) if typeof(attrComponent.pre) is 'function'
        if typeof(myscopes) isnt 'undefined'
          elem.removeAttribute attr
          preId = 'PREX:' + makeId elem
          if myscopes
            if myscopes.length
              i = myscopes.length
              while i-- > 0
                clone = elem.cloneNode()
                clone.innerHTML = elem.innerHTML
                elem.parentNode.insertBefore clone, elem.nextSibling
                render clone, myscopes[i]
              elem.parentNode.removeChild elem
            else
              elem.parentNode.removeChild elem if myscopes.length is 0
            #return#check this
        elem.setAttribute 'checkattrs', true
    if component = components[elem.tagName]
      newscope = Scope scope
      scope = newscope
      scopes[scope.$id] = scope
      component.controller scope, elem if component.controller
      scope.$hash = hashObject scope
      elem.innerHTML = if component.template then component.template else html
      elem.innerHTML = elem.innerHTML.replace '<children></children>', html
    elements.push
      id: preId or makeId elem
      elem: elem
      scope: scope.$id
      html: html
      textNodes: textNodes
      attributes: attributes
    await renderChildren elem, scope

  preRenderChildren = (elem, root, preElements) ->
    children = []
    children.push child for child in elem.children
    await preRender child, root, 0, preElements for child in children
  preRender = (elem, root, index, preElements) ->
    id = makeId elem, root
    preId = 'PREX:' + id
    html = elem.innerHTML
    attributes = {}
    #get scope using id
    realElem = elements.filter((myelem) -> (myelem.id is id) or (myelem.id is preId))[index]
    scope = scopes[realElem?.scope]
    if not (realElem or scope)
      preElements.push
        id: 'UNKNOWN@' + id
      return
    #get .pre scopes
    for attr in elem.getAttributeNames()
      attributes[attr] = elem.getAttribute attr
      if attrComponent = components[attr.toUpperCase()]
        myscopes = await attrComponent.pre scope, elem, getProps(elem) if typeof(attrComponent.pre) is 'function'
        if typeof(myscopes) isnt 'undefined'
          if myscopes
            if myscopes.length
              i = myscopes.length
              while i-- > 0
                myscopes[i].$parent.$children.splice myscopes[i].$parent.$children.indexOf myscopes[i], 1
                clone = elem.cloneNode()
                clone.innerHTML = elem.innerHTML
                clone.removeAttribute attr
                elem.parentNode.insertBefore clone, elem.nextSibling
                await preRender clone, root, i - 1, preElements
              elem.parentNode.removeChild elem
            else
              if myscopes.length is 0
                preElements.push
                  id: 'UNKNOWN@H1:H1@' + makeId(elem.parentNode, root)
                elem.parentNode.removeChild elem
                return
    #  preRender pre stuff
    #get component
    if component = components[elem.tagName]
      elem.innerHTML = if component.template then component.template else html
      elem.innerHTML = elem.innerHTML.replace '<children></children>', html
    #render component
    #push to preElements
    preElements.push
      id: id
    #preRenderChildren
    await preRenderChildren elem, root, preElements

  fillVars = ->
    i = elements.length
    while i-- > 0
      for node in elements[i].elem.childNodes
        if node.nodeType is document.TEXT_NODE and /\{\{/.test node.data
          node.replaceWith fillTemplate node.data, scopes[elements[i].scope]
      for name in elements[i].elem.getAttributeNames()
        if /\{\{/.test (val = elements[i].elem.getAttribute(name))
          elements[i].elem.setAttribute name, fillTemplate(val, scopes[elements[i].scope])
  checkAttrs = ->
    for elem in elements
      if elem.elem.getAttribute 'checkattrs'
        elem.elem.removeAttribute 'checkattrs'
        for attr in elem.elem.getAttributeNames()
          if attrComponent = components[attr.toUpperCase()]
            attrFn = attrComponent.post or attrComponent
            attrFn scopes[elem.scope], elem.elem, getProps(elem.elem) if typeof(attrFn) is 'function'
            elem.elem.removeAttribute attr
  render: (elem, scope) ->
    if not bootstrapped
      await callbacks.$call 'bootstrap'
      bootstrapped = true
    elem = elem or document.querySelector('[app=' + appName + ']')
    rootElem = rootElem or elem
    scope = scope or Scope()
    await render elem, scope
    await fillVars()
    await checkAttrs()
    callbacks.$call 'rendered'
  $renderChildren: (elem, scope) ->
    await renderChildren elem, scope
    await fillVars()
    await checkAttrs()
    callbacks.$call 'rendered'
  component: (nameOrObj, fn) ->
    if typeof(nameOrObj) is 'object'
      for name, fn of nameOrObj
        components[name.toUpperCase()] = fn @
    else
      components[nameOrObj.toUpperCase()] = fn @
    @
  Scope: Scope
  Callbacks: Callbacks
  $getComponents: ->
    components
  $getElements: ->
    elements
  $getServices: ->
    services
  $getScopes: ->
    scopes
  $eval: evalInContext
  $getProps: getProps
  $teardown: teardown
  $teardownChildren: teardownChildren
  $on: callbacks.$on
  $off: callbacks.$off
  $hash: hash
  $hashObject: hashObject
  $makeId: makeId
  $getService: (name) ->
    if service = services[name]
      return service.fn
    else if component = components[name.toUpperCase()]
      services[name] =
        fn: (component.service or component)()
        scopes: []
      return services[name].fn
    null
  $addClass: (elem, classNames) ->
    classNames = [classNames] if typeof(classNames) is 'string'
    for className in classNames
      @.$removeClass elem, className
      elem.className += ' ' + className
    null
  $removeClass: (elem, classNames) ->
    classNames = [classNames] if typeof(classNames) is 'string'
    for className in classNames
      r = new RegExp '\\s*\\b' + className + '\\b', 'g'
      elem.className = elem.className.replace r, ''
    null
module.exports = Yma
