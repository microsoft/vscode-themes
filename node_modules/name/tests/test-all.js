/* vim:set ts=2 sw=2 sts=2 expandtab */
/*jshint asi: true undef: true es5: true node: true browser: true devel: true
         forin: true latedef: false globalstrict: true */
'use strict';

var Name = require('../core')

function iteratedNames(object) {
  var names = []
  for (var name in object) names.push(name)
  return names
}

exports['test Object.keys'] = function(assert) {
  var secret = Name()

  var object = { foo: 1, bar: 2 }
  object[secret] = 3

  assert.deepEqual(Object.keys(object), [ 'foo', 'bar' ],
                   'object keys does not includes private name')
  assert.equal(object[secret], 3, 'private defined')
}

exports['test Object.getOwnPropertyNames'] = function(assert) {
  var secret = Name()

  var object = { foo: 1, bar: 2 }
  object[secret] = 3

  assert.deepEqual(Object.getOwnPropertyNames(object), [ 'foo', 'bar' ],
                   'object keys does not includes private name')
  assert.equal(object[secret], 3, 'private defined')
}

exports['test Object.defineProperties'] = function(assert) {
  var secret1 = Name()
  var secret2 = Name()

  var object = { foo: 1, bar: 2 }
  var descriptor = { baz: { value: 3 } }
  descriptor[secret1] = { enumerable: true, value: 4 }
  descriptor[secret2] = { enumerable: false, value: 5 }

  Object.defineProperties(object, descriptor)

  assert.deepEqual(Object.keys(object), [ 'foo', 'bar' ],
                   'object keys does not includes private name')
  assert.deepEqual(Object.getOwnPropertyNames(object).sort(),
                  [ 'foo', 'bar', 'baz' ].sort(),
                   'object keys does not includes private name')

  assert.deepEqual(iteratedNames(object).sort(),
                   [ 'foo', 'bar'].sort(),
                   'object iterator does not includes private names')

  assert.equal(object[secret1], 4, 'enumerable private is defined')
  assert.equal(object[secret2], 5, 'non-enumerable private is defined')
}

exports['test Object.defineProperty'] = function(assert) {
  var secret1 = Name()
  var secret2 = Name()

  var object = { foo: 1, bar: 2 }
  Object.defineProperty(object, 'baz', {
    value: 3
  })
  Object.defineProperty(object, secret1, {
    enumerable: true, value: 4
  })
  Object.defineProperty(object, secret2, {
    enumerable: false, value: 5
  })

  assert.deepEqual(Object.keys(object), [ 'foo', 'bar' ],
                   'object keys does not includes private name')
  assert.deepEqual(Object.getOwnPropertyNames(object).sort(),
                  [ 'foo', 'bar', 'baz' ].sort(),
                   'object keys does not includes private name')

  assert.deepEqual(iteratedNames(object).sort(),
                   [ 'foo', 'bar'].sort(),
                   'object iterator does not includes private names')

  assert.equal(object[secret1], 4, 'enumerable private is defined')
  assert.equal(object[secret2], 5, 'non-enumerable private is defined')
}

exports['test Object.create'] = function(assert) {
  var secret1 = Name()
  var secret2 = Name()

  var object = { foo: 1, bar: 2 }
  var descriptor = { baz: { value: 3 }, beep: { value: 4, enumerable: true } }
  descriptor[secret1] = { enumerable: true, value: 5 }
  descriptor[secret2] = { enumerable: false, value: 6 }

  var result = Object.create(object, descriptor)

  assert.deepEqual(Object.keys(result), [ 'beep' ],
                   'object keys does not includes private name')
  assert.deepEqual(Object.getOwnPropertyNames(result).sort(),
                  [ 'baz', 'beep' ].sort(),
                   'object keys does not includes private name')

  assert.deepEqual(iteratedNames(result).sort(),
                   [ 'foo', 'bar', 'beep' ].sort(),
                   'object iterator does not includes private names')

  assert.equal(result[secret1], 5, 'enumerable private is defined')
  assert.equal(result[secret2], 6, 'non-enumerable private is defined')
}

exports['test example'] = function(assert) {
  var secret = Name()
  function MyClass(privateData) {
    // do not do `this[secret] = privateData` do following instead
    Object.defineProperty(this, secret, {
      value: privateData,
      enumerable: true
    })
    this.name = 'my'
  }
  MyClass.prototype = {
    doStuff: function() {
      /*...*/ this[secret] /*...*/
    }
  }

  var my = new MyClass({})

  assert.deepEqual(Object.keys(my), [ 'name' ],
                   'Object.keys ignores privates')
  assert.deepEqual(Object.getOwnPropertyNames(my), [ 'name' ],
                  'Object.getOwnPropertyNames ignores privates')

  var names = []
  for (var name in my) names.push(name)

  assert.deepEqual(names, [ 'name', 'doStuff' ], 'for ignores private names')
}

if (require.main == module) require('test').run(exports)
