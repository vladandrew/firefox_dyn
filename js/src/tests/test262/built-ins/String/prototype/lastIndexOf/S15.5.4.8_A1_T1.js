// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: String.prototype.lastIndexOf(searchString, position)
es5id: 15.5.4.8_A1_T1
description: Arguments are false and true, and instance is object
---*/

var __instance = new Object(true);

__instance.lastIndexOf = String.prototype.lastIndexOf;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.lastIndexOf(true, false) !== 0) {
  throw new Test262Error('#1: __instance = new Object(true); __instance.lastIndexOf = String.prototype.lastIndexOf;  __instance.lastIndexOf(true, false) === 0. Actual: ' + __instance.lastIndexOf(true, false));
}
//
//////////////////////////////////////////////////////////////////////////////

reportCompare(0, 0);
