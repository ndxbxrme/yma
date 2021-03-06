ogid = (radix, rnd) ->
  parseInt((new Date().valueOf() - new Date(2020,0,1).valueOf()).toString().concat(Math.floor(Math.random() * (9999999 or rnd))).split('').reverse().join('')).toString(radix or 36)
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
  toRemove = []
  $on: (name, fn) ->
    callbacks[name] = callbacks[name] or []
    callbacks[name].push fn
  $once: (name, fn) ->
    callbacks[name] = callbacks[name] or []
    onceFn = (data) ->
      output = await fn data
      toRemove.push onceFn
      output
    callbacks[name].push onceFn
  $off: (name, fn) ->
    callbacks[name] = callbacks[name] or []
    callbacks[name].splice callbacks[name].indexOf(fn), 1
  $call: (name, data) ->
    if callbacks[name]
      for fn in callbacks[name]
        await fn data
    for fn in toRemove
      if callbacks[name]
        callbacks[name].splice callbacks[name].indexOf(fn), 1
        toRemove.splice toRemove.indexOf(fn), 1
Environment = ->
  #from headjs
  ua = navigator.userAgent.toLowerCase()
  mobile = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(ua)
  ua = /(chrome|firefox)[ \/]([\w.]+)/.exec(ua) or /(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(ua) or /(android)(?:.*version)?[ \/]([\w.]+)/.exec(ua) or /(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) or /(msie) ([\w.]+)/.exec(ua) or /(trident).+rv:(\w.)+/.exec(ua) or []
  browser = ua[1]
  switch browser
    when 'msie', 'trident' then 'ie'
    when 'ipod', 'ipad', 'iphone' then 'ios'
    when 'webkit' then 'safari'
  mobile: mobile
  browser: browser
  version: ua[2]
Yma = (appName) ->
  rootElem = null
  components = {}
  elements = []
  scopes = {}
  services = {}
  environment = Environment()
  callbacks = Callbacks()
  bootstrapped = false
  makeId = (node, root) ->
    root = root or rootElem
    return 'root' if node is root
    id = ''
    while node and node isnt root
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
  offset = (node) ->
    nodeOffset =  x: 0, y: 0, w: node.offsetWidth, h: node.offsetHeight
    while node.parentNode
      nodeOffset.x += node.offsetLeft
      nodeOffset.y += node.offsetTop
      node = node.parentNode
    nodeOffset
  fillTemplate = (template, scope) ->
    template.replace /\{\{(.+?)\}\}/g, (all, expression) ->
      if typeof(result = evalInContext expression, scope) is 'undefined'
        ''
      else
        result
  mergeScopes = (scope, merge, protectedFields) ->
    protectedFields = protectedFields or []
    for key, val of merge
      if not protectedFields.includes key
        scope[key] = val
  cleanupScopes = ->
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
    await cleanupScopes()
  teardownChildren = (id) ->
    r = new RegExp '.+' + id + '$'
    elements = elements.filter (element) ->
      not r.test element.id
    await cleanupScopes()
  findScopeElement = (element, scope) ->
    if element.$scope.$id is scope.$id
      return element
    for child in element.$children
      if myelement = findScopeElement child, scope
        return myelement
    null
  checkForChanges = (element) ->
    #render element html taking into account pre stuff
    testRoot = document.createElement 'div'
    testRoot.innerHTML = element.$html
    for child in testRoot.children
      return element if not child
      for attr in child.getAttributeNames().map (name) -> name:name,value:child.getAttribute(name)
        if attrComponent = components[attr.name.toUpperCase()]
          element.$scope.$phase = 'prerender'
          myscopes = attrComponent.pre element.$scope, child, getProps(child, element.$scope) if typeof(attrComponent.pre) is 'function'
          if myscopes and typeof(myscopes) is 'object' and typeof(myscopes.length) isnt 'undefined'
            #child.removeAttribute attr.name
            i = myscopes.length
            while i-- > 0
              clone = child.cloneNode()
              clone.innerHTML = child.innerHTML
              child.parentNode.insertBefore clone, child.nextSibling
            if child.children.length isnt element.$children.length
              return element
            child.parentNode.removeChild child
    for child, i in testRoot.children
      return element if child.innerHTML isnt element.$children[i]?.$html
    null
  updateScopes = (updatedScopes) ->
    index = 0
    while updatedScopes.length > index + 1
      i = updatedScopes.length
      while i-- > index
        if updatedScopes[i]
          if updatedScopes[i].$isDescendantOf updatedScopes[0]
            updatedScopes.splice i, 1
            continue
          if updatedScopes[i].$isAncestorOf updatedScopes[0]
            updatedScopes[0] = updatedScopes[i]
            updatedScopes.splice i, 1
            continue
      index++
    for updatedScope in updatedScopes
      element = findScopeElement rootElem, updatedScope#could there be more than one?
      changes = checkForChanges element
      if changes
        doTeardown = (element, skip) ->
          element.$scope.$call('teardown') if not skip
          doTeardown for child in element.$children
          null
        doTeardown changes, true
        changes.$children = []
        changes.$node.innerHTML = changes.$html
        children = []
        children.push child for child in changes.$node.children
        render child, changes for child in children
      #get root element for this scope
      #try prebuilding this element
      #if there are structural changes then fully rerender element
      #reset vars for this element
      resetElement = (element) ->
        t = 0
        for node in element.$node.childNodes
          if node.nodeType is document.TEXT_NODE
            node.replaceWith element.$textNodes[t++] or ''
        for attr in element.$attributes
          element.$node.setAttribute attr.name, attr.value if element.$node.hasAttributes attr.name
        resetElement child for child in element.$children
      resetElement element
      fillVars element
      checkAttrs element
      callbacks.$call 'updated'
    return
  scopeVar = (op, path, value, scope) ->
    myvar = evalInContext path, scope
    arr = []
    splitPoints = []
    inside = null
    lookingFor = null
    level = 0
    for letter, i in path.split ''
      if inside
        if letter is lookingFor
          level--
          if level is 0
            Object.assign splitPoints[splitPoints.length-1],
              endIndex: i
              endPath: path.substr 0, i + 1
            inside = null
            lookingFor = null
        else if letter is inside
          level++
      else
        if letter is '['
          level++
          inside = '['
          lookingFor = ']'
          splitPoints.push
            type: inside + lookingFor
            index: i
            path: path.substr 0, i
        else if letter is '('
          level++
          inside = '('
          lookingFor = ')'
          splitPoints.push
            type: inside + lookingFor
            index: i
            path: path.substr 0, i
        else if letter is '.'
          splitPoints.push
            type: 'object'
            index: i
            path: path.substr 0, i
    myvar = null
    for sp in splitPoints
      if sp.type is 'object'
        myvar = evalInContext sp.path, scope
        if typeof(myvar) is 'undefined'
          myvar = evalInContext 'this.' + sp.path + '={}', scope
      if sp.type is '[]'
        myvar = evalInContext sp.path, scope
        if typeof(myvar) is 'undefined'
          myvar = evalInContext 'this.' + sp.path + '=[]', scope
          myvar = evalInContext sp.endPath + '={}', scope
    return (splitPoints[0]?.path or path) if op is 'rootName'
    return evalInContext((splitPoints[0]?.path or path), scope) if op is 'root'
    lastPoint = splitPoints[splitPoints.length - 1]
    lastIndex = if lastPoint then (lastPoint.lastIndex or lastPoint.index) + 1 else 0
    if splitPoints[splitPoints.length - 1]?.type is '[]'
      field = evalInContext(path.substr(lastIndex).replace(/\]$/, ''), scope)
    else
      if lastIndex
        field = path.substr(lastIndex)
      else
        field = path
    if op is 'get'
      return (myvar or scope)[field]
    else
      (myvar or scope)[field] = value
    value
  setScopeVar = (path, value, scope) ->
    scopeVar 'set', path, value, scope
  getScopeVar = (path, scope) ->
    scopeVar 'get', path, null, scope
  getScopeVarRoot = (path, scope) ->
    scopeVar 'root', path, null, scope
  Scope = (parentScope) ->
    scopeCallbacks = Callbacks()
    timeouts = []
    intervals = []
    newscope =
      $id: ogid()
      $children: []
      $parent: null
      $environment: environment
      $update: (updates, hard) ->
        propagateForwards = (myscope, rootName, value) ->
          propagate = (childScope) ->
            childScope[rootName] = val
            propagate child for child in childScope.$children
            null
          propagate myscope
        for key, val of updates
          rootName = scopeVar 'rootName', key, null, @
          setScopeVar key, val, @
          val = @[rootName]
          myscope = @
          while myscope and myscope.$parent
            if myscope.$hash[rootName] and myscope.$hash[rootName] isnt myscope.$parent.$hash[rootName]
              myscope[rootName] = val
              propagateForwards myscope, rootName, val
              break
            myscope = myscope.$parent
        updatedScopes = Object.values(scopes).filter (scope) -> (JSON.stringify(scope.$hash) isnt JSON.stringify(hashObject scope))
        scope.$hash = hashObject scope for scope in updatedScopes
        await updateScopes updatedScopes
        callbacks.$call 'updated'
      $use: (name) ->
        if service = services[name]
          @[name] = service.fn
          service.scopes.push @
        else if component = components[name.toUpperCase()]
          services[name] =
            fn: (component.service or component)()
            scopes: [@]
          @[name] = services[name].fn
        @.$on 'teardown', ->
          services[name].scopes.splice services[name].scopes.indexOf(@), 1
      $on: scopeCallbacks.$on
      $once: scopeCallbacks.$once
      $off: scopeCallbacks.$off
      $call: scopeCallbacks.$call
      $callChildren: (name, data) ->
        await scopeCallbacks.$call name, data
        for childScope in @.$children
          await childScope.$callChildren name, data if childScope #check this
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
      $offset: offset
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
        intervals.push window.setInterval fn, delay
      $addEventListeners: (elem, listeners, fn) ->
        if typeof(listeners) is 'string'
          listeners = [listeners]
        for listener in listeners
          elem.addEventListener listener, fn
        @.$on 'teardown', ->
          for listener in listeners
            elem.removeEventListener listener, fn
    if parentScope and parentScope.$id
      parentScope.$children.push newscope
      newscope.$parent = parentScope
    mergeScopes newscope, parentScope, Object.keys(newscope)
    scopes[newscope.$id] = newscope
    newscope.$hash = hashObject newscope
    newscope

  getElement = (elem) ->
    id = makeId elem
    elements.filter((element) -> element.id is id)[0]
  getProps = (elem, scope) ->
    myattrs = {}
    elem.getAttributeNames().forEach (name) -> myattrs[name] = if scope then fillTemplate(elem.getAttribute(name), scope) else elem.getAttribute(name)
    myattrs
  renderChildren = (node, parent) ->
    #return if /\byma-router-parked\b/.test elem.className
    children = []
    children.push child for child in node.children
    render child, parent for child in children
  render = (node, parent, scope) ->
    return if not node
    return if /SCRIPT|STYLE/.test node.tagName
    element =
      $node: node
      $parent: parent
      $children: []
      $scope: scope or parent?.$scope or Scope()
      $html: node.innerHTML
      $textNodes: Array.from(node.childNodes)?.filter (child) -> child.nodeType is document.TEXT_NODE
      $attributes: node.getAttributeNames()?.map (name) ->
        name: name
        value: node.getAttribute name
      $render: true
    for attr in element.$attributes
      if attrComponent = components[attr.name.toUpperCase()]
        myscopes = attrComponent.pre element.$scope, node, getProps(node, element.$scope) if typeof(attrComponent.pre) is 'function'
        if myscopes and typeof(myscopes) is 'object' and typeof(myscopes.length) isnt 'undefined'
          node.removeAttribute attr.name
          i = myscopes.length
          while i-- > 0
            clone = node.cloneNode()
            clone.innerHTML = node.innerHTML
            node.parentNode.insertBefore clone, node.nextSibling
            render clone, element, myscopes[i]
          node.parentNode.removeChild node
          return if myscopes.length is 0
        node.setAttribute 'checkattrs', true
    if component = components[node.tagName.toUpperCase()]
      element.$scope = Scope element.$scope
      component.controller element.$scope, node, getProps(node, element.$scope.$parent) if component.controller
      element.$scope.$hash = hashObject element.$scope
      node.innerHTML = if component.template then component.template else element.$html
      node.innerHTML = node.innerHTML.replace '<children></children>', element.$html
      element.$html = node.innerHTML
      #element.$html = node.innerHTML
    else
      node.innerHTML = element.$html
      #html = elem.innerHTML
    if parent then parent.$children.push element
    renderChildren node, element
    element
  preRenderChildren = (elem, root, preElements) ->
    #return if /\byma-router-parked\b/.test elem.className
    children = []
    children.push child for child in elem.children
    await preRender child, root, 0, preElements for child in children
  preRender = (elem, root, index, preElements, hash) ->
    return if not elem
    id = makeId elem, root
    preId = 'PREX:' + id
    html = elem.innerHTML
    attributes = {}
    #get scope using id
    realElem = elements.filter((myelem) -> (myelem.id is id) or (myelem.id is preId))[index]
    scope = scopes[realElem?.scope]
    scope?.$phase = 'prerender'
    if not (realElem or scope) or (scope and hash and scope.$dataHash and scope.$dataHash isnt hash)
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
                await preRender clone, root, i, preElements, myscopes[i].$dataHash
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
  fillVars = (element) ->
    for attr in element.$attributes
      if /\{\{/.test attr.value
        element.$node.setAttribute attr.name, fillTemplate(attr.value, element.$scope)
    for node in element.$node.childNodes
      if node.nodeType is document.TEXT_NODE and /\{\{/.test node.data
        node.replaceWith fillTemplate node.data, element.$scope
    fillVars child for child in element.$children
  checkAttrs = (element) ->
    if element.$node.getAttribute 'checkattrs'
      element.$node.removeAttribute 'checkattrs'
      for attr in element.$attributes
        if attrComponent = components[attr.name.toUpperCase()]
          attrFn = attrComponent.post or attrComponent
          attrFn element.$scope, element.$node, getProps(element.$node, element.$scope) if typeof(attrFn) is 'function'
          element.$node.removeAttribute attr.name
    checkAttrs child for child in element.$children

  getService = (name) ->
    if service = services[name]
      return service
    else if component = components[name.toUpperCase()]
      services[name] =
        fn: (component.service or component)()
        scopes: []
      return services[name]
    null

  appName: appName
  render: (elem, scope) ->
    if not bootstrapped
      await callbacks.$call 'bootstrap'
      bootstrapped = true
    elem = elem or document.querySelector('[app=' + appName + ']')
    rootElem = render elem
    fillVars(rootElem)
    checkAttrs(rootElem)
    callbacks.$call 'rendered'
    @
  $renderChildren: (elem, scope) ->
    await renderChildren elem, scope
    await fillVars()
    await checkAttrs()
    callbacks.$call 'renderedChildren'
  component: (nameOrObj, fn) ->
    if typeof(nameOrObj) is 'object'
      for name, fn of nameOrObj
        components[name.toUpperCase()] = fn @
        @.$appendStyles components[name.toUpperCase()].styles
    else
      components[nameOrObj.toUpperCase()] = fn @
      @.$appendStyles components[nameOrObj.toUpperCase()].styles
    @
  Scope: Scope
  Callbacks: Callbacks
  $version: require('../package.json').version
  $getComponents: ->
    components
  $getElements: ->
    rootElem
  $getServices: ->
    services
  $getScopes: ->
    scopes
  $eval: evalInContext
  $offset: offset
  $setScopeVar: setScopeVar
  $getScopeVar: getScopeVar
  $getElement: getElement
  $getProps: getProps
  $teardown: teardown
  $teardownChildren: teardownChildren
  $on: callbacks.$on
  $once: callbacks.$once
  $off: callbacks.$off
  $hash: hash
  $hashObject: hashObject
  $makeId: makeId
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
  $update: (serviceName) ->
    if service = getService serviceName
      updateScopes service.scopes
  $appendStyles: (stylesText) ->
    return if not stylesText
    styles = document.createElement 'style'
    styles.innerText = stylesText.replace(/\n/gi,'')
    document.querySelector 'head'
    .append styles
  $internal:
    components: components
    scopes: scopes
    services: services
    callbacks: callbacks
    fillTemplate: fillTemplate
    mergeScopes: mergeScopes
    cleanupScopes: cleanupScopes
    updateScopes: updateScopes
    scopeVar: scopeVar
    getScopeVarRoot: getScopeVarRoot
    getService: getService
module.exports = Yma
