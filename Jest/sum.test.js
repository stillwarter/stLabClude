const sum = require("./sum");

describe("sum function", () => {
  it("should add two numbers correctly", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);

    const result2 = sum(1,11);
    expect(result2).toBe(12);
  });
});


describe("sum function2", () => {
  it("should add two numbers correctly", () => {
    const result = sum(1, 1);
    expect(result).toBe(2);

    const result2 = sum(2,11);
    expect(result2).toBe(13);
  });
});
