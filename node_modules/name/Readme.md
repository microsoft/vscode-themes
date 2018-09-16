# name

[![Build Status](https://secure.travis-ci.org/Gozala/name.png)](http://travis-ci.org/Gozala/name)

Polyfill of ES.next [private name objects][]. This implementation patches ES5
`Object` methods where possible to emulate private names as much as possible.
Still in some cases private names can be discovered:

  - If `Object` methods from other JS contexts are used.
  - If properties are simply set like shown below, private names will be
    revealed by `for` iteration:

    ```js
    object[secret] = value
    ```

    It is recommended to use `Object.defineProperty` or
    `Object.defineProperties` for defining private named properties. Those
    methods will make sure to mark property as non-enumerable so that such
    propertes won't be reavealed.


## Install

    npm install name

## Use


```js
var Name = require('name')
var secret = new Name()
function MyClass(privateData) {
  // do not do `this[secret] = privateData` do following instead
  Object.defineProperty(this, secret, {
    value: privateData
  })
  this.name = 'my'
}
MyClass.prototype = {
  doStuff: function() {
    /*...*/ this[secret] /*...*/
  }
}

var my = new MyClass()
Object.keys(my) // => [ 'my' ]
Object.getOwnPropertyNames(my) // => [ 'my' ]

var names = []
for (var name in my) names.push(name)
names // => [ 'my' ]
```


[private name objects]:http://wiki.ecmascript.org/doku.php?id=harmony:private_name_objects
