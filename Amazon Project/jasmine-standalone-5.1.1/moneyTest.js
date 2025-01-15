import formatCurrency from "../scripts/utils/money.js";

describe('Test suite: Format Currency', () =>{
  it("Converts cents to dollars", () =>{
    expect(formatCurrency(2095)).toEqual('20.95');
  });   // it is a function created by jasmine to create a test.
  it("Works with 0 dollar", () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });
  it("Rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});

