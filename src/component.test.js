const { createComponent, createDashboard } = require("./component");
const { _ } = require("./YAML");

describe("createComponent", () => {
  it("returns correct value", () => {
    expect(createComponent("pie chart")(null)).toEqual(
      _({ "pie chart": null })
    );
  });

  it("handles chart type", () => {
    expect(createComponent("bar chart")(null)).toEqual(
      _({ "bar chart": null })
    );
  });

  it("handles data", () => {
    expect(createComponent("bar chart")([])).toEqual(_({ "bar chart": [] }));
  });

  it("handles title", () => {
    expect(createComponent("bar chart", "Foo Bar")([])).toEqual(
      _({
        rows: [{ "h1 text": "Foo Bar" }, { "bar chart": [] }]
      })
    );
  });

  it("handles title text", () => {
    expect(createComponent("bar chart", "Hello World")([])).toEqual(
      _({
        rows: [{ "h1 text": "Hello World" }, { "bar chart": [] }]
      })
    );
  });

  it("handles title value", () => {
    expect(createComponent("pie chart", "Hello World")(null)).toEqual(
      _({
        rows: [{ "h1 text": "Hello World" }, { "pie chart": null }]
      })
    );
  });
});

describe("createDashboard", () => {
  it("returns correct value", () => {
    expect(createDashboard("lorem ipsum")(null)).toEqual(
      _({ 'dashboard "lorem ipsum"': null })
    );
  });

  it("handles chart type", () => {
    expect(createDashboard("hello world")(42)).toEqual(
      _({ 'dashboard "hello world"': 42 })
    );
  });
});
