"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const foo_1 = require("@/foo");
test("basic", () => {
    expect(foo_1.sum()).toBe(0);
});
test("basic again", () => {
    expect(foo_1.sum(1, 2)).toBe(3);
});
//# sourceMappingURL=foo.test.js.map