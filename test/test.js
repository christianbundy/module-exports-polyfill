var assert = require("assert");

module = {};

// Default namespace is the top-level (global) object
exports = Function('return this')();

Object.defineProperties(module, {
    'namespace': {
      // Change the namespace to another object
      set: function (obj) {
        exports = obj;
      }
    },
    'exports': {
      // Extend the namespace object with the object that's passed
      set: function (obj) {
        for (var prop in obj) {
          // Don't set properties inherited from the prototype
          if (obj.hasOwnProperty(prop)) {
            exports[prop] = obj[prop];
          }
        }
      },
      // Return the namespace
      get: function () {
        return exports;
      }
    }
});

describe('module.exports', function(){
  describe('set', function(){
    it('should extend the global namespace', function(){
      module.exports = { foo: 42 };
      foo.should.equal(42);
    });
  })
})
