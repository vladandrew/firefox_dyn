// |reftest| async
// This file was procedurally generated from the following sources:
// - src/async-generators/yield-spread-arr-multiple.case
// - src/async-generators/default/async-class-decl-method.template
/*---
description: Use yield value in a array spread position (Async Generator method as a ClassDeclaration element)
esid: prod-AsyncGeneratorMethod
features: [async-iteration]
flags: [generated, async]
includes: [compareArray.js]
info: |
    ClassElement :
      MethodDefinition

    MethodDefinition :
      AsyncGeneratorMethod

    Async Generator Function Definitions

    AsyncGeneratorMethod :
      async [no LineTerminator here] * PropertyName ( UniqueFormalParameters ) { AsyncGeneratorBody }


    Array Initializer

    SpreadElement[Yield, Await]:
      ...AssignmentExpression[+In, ?Yield, ?Await]

---*/
var arr = ['a', 'b', 'c'];
var item;


var callCount = 0;

class C { async *gen() {
    callCount += 1;
    yield [...yield yield];
}}

var gen = C.prototype.gen;

var iter = gen();

iter.next(false);
item = iter.next(['a', 'b', 'c']);

item.then(({ done, value }) => {
  item = iter.next(value);

  item.then(({ done, value }) => {
    assert.compareArray(value, arr);
    assert.sameValue(done, false);
  }).then($DONE, $DONE);
}).catch($DONE);

assert.sameValue(callCount, 1);
