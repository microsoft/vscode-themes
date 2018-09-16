/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true browser: true devel: true
         forin: true latedef: false globalstrict: true */
'use strict';

module.exports = typeof(Name) !== 'undefined' ? Name : new function() {
  // Define character that we will use to prefix private names with
  var prefix = '\u2063'

  // Shim `Object.*` methods so that names prefixed with our special `prefix`
  // will not be included & will be defined as non-enumerable by default.
  var names = Object.getOwnPropertyNames
  var keys = Object.keys
  var defineProperties = Object.defineProperties
  var defineProperty = Object.defineProperty
  var create = Object.create

  function isPublic(name) { return String(name)[0] !== prefix }
  function getOwnPublicNames(object) { return names(object).filter(isPublic) }
  function getOwnPublicKeys(object) { return keys(object).filter(isPublic) }
  function patch(descriptor) {
    names(descriptor).forEach(function(name) {
      if (!isPublic(name)) descriptor[name].enumerable = false
    })
    return descriptor
  }
  function defineOwnProperty(object, name, descriptor) {
    if (!isPublic(name)) descriptor.enumerable = false
    return defineProperty(object, name, descriptor)
  }
  function defineOwnProperties(object, descriptor) {
    return defineProperties(object, patch(descriptor))
  }
  function createObject(prototype, descriptor) {
    return create(prototype, descriptor && patch(descriptor))
  }

  // Note we use bind only in order to hide source of the function when
  // `toString` is called on them.
  Object.defineProperty(Object, 'getOwnPropertyNames', {
    value: getOwnPublicNames.bind(Object)
  })
  Object.defineProperty(Object, 'keys', {
    value: getOwnPublicKeys.bind(Object)
  })
  Object.defineProperty(Object, 'defineProperties', {
    value: defineOwnProperties.bind(Object)
  })
  Object.defineProperty(Object, 'defineProperty', {
    value: defineOwnProperty.bind(Object)
  })
  Object.defineProperty(Object, 'create', {
    value: createObject.bind(Object)
  })


  function Name(hint) {
    return Object.create(Name.prototype, {
      name: {
        value: prefix +
          (hint || '') +
          '@' +
          Math.random().toString(32).substr(2)
      }
    })
  }
  Name.prototype = Object.create(null, {
    toString: { value: function() { return this.name } },
    valueOf: { value: function() { return this.name } }
  })
  return Name
}
