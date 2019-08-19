const component = require("./component");
const YAML = require("yaml");
const _ = YAML.stringify;

describe("component", () => {
  it("returns correct value", () => {
    expect(component("pie chart")(null)).toEqual(_({ "pie chart": null }));
  });

  it("handles chart type", () => {
    expect(component("bar chart")(null)).toEqual(_({ "bar chart": null }));
  });

  it("handles data", () => {
    expect(component("bar chart")([])).toEqual(_({ "bar chart": [] }));
  });

  it("handles title", () => {
    expect(component("bar chart", "Foo Bar")([])).toEqual(
      _({
        rows: [{ "h1 text": "Foo Bar" }, { "bar chart": [] }]
      })
    );
  });

  it("handles title text", () => {
    expect(component("bar chart", "Hello World")([])).toEqual(
      _({
        rows: [{ "h1 text": "Hello World" }, { "bar chart": [] }]
      })
    );
  });

  it("handles title value", () => {
    expect(component("pie chart", "Hello World")(null)).toEqual(
      _({
        rows: [{ "h1 text": "Hello World" }, { "pie chart": null }]
      })
    );
  });
});
