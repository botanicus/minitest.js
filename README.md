# About

Simple test framework for asynchronous testing in [Node.js](http://nodejs.org/). It's trying to be as simple and explicit as possible. No magic, no wheel reinventing. Just use minitest for building your tests and the [assert library](http://nodejs.org/api.html#assert-212) for the actual helpers for testing equality etc.

# Setup

* `require()` minitest
* Use `minitest.setupListeners()` for listening on the `uncaughtException` and `exit` events.
* Use `minitest.context(description, block)` for defining your contexts. Context will be usually a function or object name.
* Use `#<a Context>.assertion(description, block)` for defining your assertions.
* Use `#<a Test>.finished()` to mark test as finished. All the tests has to have it. Without this you won't be able to write solid asynchronous tests, because you can't ask only "is a and b the same?", but also "did the callback run?".
* Run `node foo_test.js` to get the results.

# Example

    var minitest = require("minitest");
    var assert   = require("assert");

    minitest.setupListeners();
  
    minitest.context("Context#setup()", function () {
      this.assertion("it should setup listeners", function (test) {
        // test something via the standard assert module
        assert.ok(context.listeners)

        // mark test as finished
        test.finished();
      });

      this.assertion("it should be able to count", function (test) {
        if (2 !== 4) {
          // manually fail the test
          throw new Error("You can't count, can you?");
        };
      });
    });

## Formatters

If you don't like minitest output, you can simply override following methods:

* `Context.prototype.contextHeader()`
* `Test.prototype.reportSuccess()`
* `Test.prototype.reportError(error)`
* `Test.prototype.reportNotRun()`

All this methods are supposed to return a string and all these methods have access to `this.description`.

# Common Problems in Testing Asynchronous Code

## Exceptions

Obviously you can't catch errors which occured in callbacks. Consider following:

    try {
      db.get("botanicus", function (user) {
        throw new Error("You can't catch me!");
      });
    } catch(error) {
      // you'll never get in here
    };
