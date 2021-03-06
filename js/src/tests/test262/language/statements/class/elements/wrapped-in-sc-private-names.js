// This file was procedurally generated from the following sources:
// - src/class-elements/private-names.case
// - src/class-elements/productions/cls-decl-wrapped-in-sc.template
/*---
description: private names (fields definition wrapped in semicolons)
esid: prod-FieldDefinition
features: [class-fields-private, class, class-fields-public]
flags: [generated]
info: |
    ClassElement :
      ...
      FieldDefinition ;

    FieldDefinition :
      ClassElementName Initializer_opt

    ClassElementName :
      PrivateName

    PrivateName :
      # IdentifierName

---*/


class C {
  ;;;;
  ;;;;;;#x; #y;;;;;;;
  ;;;;
  x() {
    this.#x = 42;
    return this.#x;
  }
  y() {
    this.#y = 43;
    return this.#y;
  }
}

var c = new C();

// Test the private fields do not appear as properties before set to value
assert.sameValue(Object.hasOwnProperty.call(C.prototype, "#x"), false, "test 1");
assert.sameValue(Object.hasOwnProperty.call(C, "#x"), false, "test 2");
assert.sameValue(Object.hasOwnProperty.call(c, "#x"), false, "test 3");

assert.sameValue(Object.hasOwnProperty.call(C.prototype, "#y"), false, "test 4");
assert.sameValue(Object.hasOwnProperty.call(C, "#y"), false, "test 5");
assert.sameValue(Object.hasOwnProperty.call(c, "#y"), false, "test 6");

// Test if private fields can be sucessfully accessed and set to value
assert.sameValue(c.x(), 42, "test 7");
assert.sameValue(c.y(), 43, "test 8");

// Test the private fields do not appear as properties before after set to value
assert.sameValue(Object.hasOwnProperty.call(c, "#x"), false, "test 9");
assert.sameValue(Object.hasOwnProperty.call(c, "#y"), false, "test 10");

reportCompare(0, 0);
