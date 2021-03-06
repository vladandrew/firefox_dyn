// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: Inside a CharacterClass, \b means the backspace character
es5id: 15.10.2.13_A3_T4
description: Execute /[^\[\b\]]+/.exec("abcdef") and check results
---*/

var __executed = /[^\[\b\]]+/.exec("abcdef");

var __expected = ["abcdef"];
__expected.index = 0;
__expected.input = "abcdef";

assert.sameValue(
  __executed.length,
  __expected.length,
  'The value of __executed.length is expected to equal the value of __expected.length'
);

assert.sameValue(
  __executed.index,
  __expected.index,
  'The value of __executed.index is expected to equal the value of __expected.index'
);

assert.sameValue(
  __executed.input,
  __expected.input,
  'The value of __executed.input is expected to equal the value of __expected.input'
);

for(var index=0; index<__expected.length; index++) {
  assert.sameValue(
    __executed[index],
    __expected[index],
    'The value of __executed[index] is expected to equal the value of __expected[index]'
  );
}

reportCompare(0, 0);
