// This file was procedurally generated from the following sources:
// - src/dstr-assignment/array-rest-iter-rtrn-close-err.case
// - src/dstr-assignment/default/assignment-expr.template
/*---
description: IteratorClose is called when reference evaluation produces a "return" completion (AssignmentExpression)
esid: sec-variable-statement-runtime-semantics-evaluation
features: [Symbol.iterator, generators, destructuring-binding]
flags: [generated]
info: |
    VariableDeclaration : BindingPattern Initializer

    1. Let rhs be the result of evaluating Initializer.
    2. Let rval be GetValue(rhs).
    3. ReturnIfAbrupt(rval).
    4. Return the result of performing BindingInitialization for
       BindingPattern passing rval and undefined as arguments.

    ArrayAssignmentPattern : [ Elisionopt AssignmentRestElement ]

    [...]
    5. Let result be the result of performing
       IteratorDestructuringAssignmentEvaluation of AssignmentRestElement with
       iteratorRecord as the argument
    6. If iteratorRecord.[[done]] is false, return IteratorClose(iterator,
       result).

    AssignmentRestElement[Yield] : ... DestructuringAssignmentTarget

    1. If DestructuringAssignmentTarget is neither an ObjectLiteral nor an
       ArrayLiteral, then
       a. Let lref be the result of evaluating DestructuringAssignmentTarget.
       b. ReturnIfAbrupt(lref).

    7.4.6 IteratorClose( iterator, completion )

    [...]
    6. Let innerResult be Call(return, iterator, « »).
    7. If completion.[[type]] is throw, return Completion(completion).
    8. If innerResult.[[type]] is throw, return Completion(innerResult).

---*/
var returnCount = 0;
var unreachable = 0;
var iterable = {};
var iterator = {
  return: function() {
    returnCount += 1;

    throw new Test262Error();
  }
};
var iter;
iterable[Symbol.iterator] = function() {
  return iterator;
};

function* g() {

var result;
var vals = iterable;

result = [...{}[yield]] = vals;

unreachable += 1;

assert.sameValue(result, vals);

}

iter = g();
iter.next();
assert.throws(Test262Error, function() {
  iter.return();
});

assert.sameValue(returnCount, 1);
assert.sameValue(unreachable, 0, 'Unreachable statement was not executed');

reportCompare(0, 0);
