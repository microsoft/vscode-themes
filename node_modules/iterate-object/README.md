# iterate-object [![PayPal](https://img.shields.io/badge/%24-paypal-f39c12.svg)][paypal-donations] [![Version](https://img.shields.io/npm/v/iterate-object.svg)](https://www.npmjs.com/package/iterate-object) [![Downloads](https://img.shields.io/npm/dt/iterate-object.svg)](https://www.npmjs.com/package/iterate-object) [![Get help on Codementor](https://cdn.codementor.io/badges/get_help_github.svg)](https://www.codementor.io/johnnyb?utm_source=github&utm_medium=button&utm_term=johnnyb&utm_campaign=github)

> A convenient way to iterate objects.

## :cloud: Installation
    
```sh
$ npm i --save iterate-object
```

            
## :clipboard: Example

        

```js
// Dependencies
var IterateObject = require("iterate-object");

// Iterate this object
IterateObject({
    name: "Bob"
  , age: 42
}, function (value, name) {
    console.log(name, value);
});
// => "name", "Bob"
//    "age", 42

// Iterate an array
IterateObject([
    1, 2, 3, 4, 5, 6, 7
], function (value, i) {
    console.log("v[" + i + "] = " + value);
});
// => v[0] = 1
//    v[1] = 2
//    v[2] = 3
//    v[3] = 4
//    v[4] = 5
//    v[5] = 6
//    v[6] = 7

// Iterate an array
IterateObject([
    "Alice", "Bob", "Carol", "Dave"
], function (value, i, arr) {
    console.log("Current: " + value + (arr[i + 1] ? " Next:" + arr[i + 1] : ""));
});
// => Current: Alice Next:Bob
//    Current: Bob Next:Carol
//    Current: Carol Next:Dave
//    Current: Dave
```
    
## :memo: Documentation
        
### `iterateObject(obj, fn)`
Iterates an object. Note the object field order may differ.

#### Params
- **Object** `obj`: The input object.
- **Function** `fn`: A function that will be called with the current value, field name and provided object.

#### Return
- **Function** The `iterateObject` function.

        
## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## :dizzy: Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

 - [`bloggify-on-request`](https://github.com/Bloggify/on-request#readme)—Do custom stuff on request and optionally send a custom response.
 - [`bloggify-redirect`](https://github.com/Bloggify/redirect#readme)—A Bloggify plugin to handle the link redirects.
 - [`color-it`](https://github.com/IonicaBizau/node-color-it#readme)—Flat colors for your Node.js strings.
 - [`couleurs`](https://github.com/IonicaBizau/node-couleurs)—Add some color and styles to your Node.JS strings.
 - [`emoji-from-word`](https://github.com/IonicaBizau/emoji-from-word#readme)—Get emoji from input word.
 - [`emoji-name-map`](https://github.com/IonicaBizau/emoji-name-map#readme)—Name to unicode emoji mapping.
 - [`emoji-unicode-map`](https://github.com/IonicaBizau/emoji-unicode-map#readme)—Unicode to name emoji mapping.
 - [`emojic`](https://github.com/IonicaBizau/emojic#readme)—Emoji in your Node.js command line apps.
 - [`engine-builder`](https://github.com/IonicaBizau/engine-parser) (by jillix)—Engine composition parser.
 - [`engine-flow-types`](https://github.com/jillix/engine-flow-types#readme) (by jillix)—Low level library providing Engine flow types.
 - [`engine-parser`](https://github.com/IonicaBizau/engine-parser) (by jillix)—Engine composition parser.
 - [`enny`](https://github.com/IonicaBizau/enny) (by jillix)—Generate Engine compositions from human-readable inputs.
 - [`err`](https://github.com/IonicaBizau/err#readme)—A tiny library to create custom errors in JavaScript.
 - [`gh-following`](https://github.com/IonicaBizau/gh-following#readme)—Fetches the users you follow but they don't follow you and the users that follow you but you don't.
 - [`git-stats`](https://github.com/IonicaBizau/git-stats)—Local git statistics including GitHub-like contributions calendars.
 - [`gm-tools`](https://github.com/IonicaBizau/gm-tools#readme)—Friendly tools for interacting with GraphicsMagick.
 - [`gpm`](https://github.com/IonicaBizau/gpm)—npm + git = gpm - Install NPM packages and dependencies from git repositories.
 - [`love-you`](https://github.com/IonicaBizau/love-you#readme)—"I love you" in different languages. 
 - [`map-o`](https://github.com/IonicaBizau/node-map-o)—Array-map like function for objects.
 - [`match`](https://github.com/IonicaBizau/match.js#readme)—Simplest way to create match memory games.
 - [`nodeice`](https://github.com/IonicaBizau/nodeice)—Another PDF invoice generator
 - [`oargv`](https://github.com/IonicaBizau/node-oargv)—Turns an object into a bash command.
 - [`obj-flatten`](https://github.com/IonicaBizau/obj-flatten#readme)—Convert nested objects in flatten ones.
 - [`obj-unflatten`](https://github.com/IonicaBizau/obj-unflatten#readme)—Convert flatten objects in nested ones.
 - [`svg.connectable.js`](https://github.com/jillix/svg.connectable.js) (by jillix)—A JavaScript library for connecting SVG things.

## :scroll: License
    
[MIT][license] © [Ionică Bizău][website]
    
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[license]: http://showalicense.com/?fullname=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica%40gmail.com%3E%20(http%3A%2F%2Fionicabizau.net)&year=2015#license-mit
[website]: http://ionicabizau.net
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md