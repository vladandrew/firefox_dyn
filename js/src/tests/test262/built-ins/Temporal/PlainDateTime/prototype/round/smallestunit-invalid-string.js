// |reftest| skip -- Temporal is not supported
// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindatetime.prototype.round
description: RangeError thrown when smallestUnit option not one of the allowed string values
features: [Temporal]
---*/

const datetime = new Temporal.PlainDateTime(2000, 5, 2, 12, 34, 56, 123, 987, 500);
assert.throws(RangeError, () => datetime.round({ smallestUnit: "other string" }));

reportCompare(0, 0);
