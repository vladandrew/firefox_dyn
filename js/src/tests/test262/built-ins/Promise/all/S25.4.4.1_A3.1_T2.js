// |reftest| async
// Copyright 2014 Cubane Canada, Inc.  All rights reserved.
// See LICENSE for details.

/*---
info: |
    Promise.all expects an iterable argument;
    fails if recieves an abrupt completion
    ref 7.4.1 non-Object fails CheckIterable
    ref 7.4.2 GetIterator throws TypeError if CheckIterable fails
es6id: S25.4.4.1_A3.1_T2
author: Sam Mikes
description: Promise.all(new Error()) returns Promise rejected with TypeError
flags: [async]
---*/

Promise.all(new Error("abrupt")).then(function() {
  throw new Test262Error('Promise unexpectedly resolved: Promise.all(abruptCompletion) should throw TypeError');
}, function(err) {
  assert(!!(err instanceof TypeError), 'The value of !!(err instanceof TypeError) is expected to be true');
}).then($DONE, $DONE);
