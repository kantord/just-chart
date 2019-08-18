const component = require("./component");

describe("component", () => {
  it("returns correct value", () => {
    expect(component("pie")(null)).toEqual({
      component: "chart",
      args: { typed: "pie" },
      data: null
    });
  });

  it("handles chart type", () => {
    expect(component("bar")(null)).toEqual({
      component: "chart",
      args: { typed: "bar" },
      data: null
    });
  });

  it("handles data", () => {
    expect(component("bar")([])).toEqual({
      component: "chart",
      args: { typed: "bar" },
      data: []
    });
  });
});
