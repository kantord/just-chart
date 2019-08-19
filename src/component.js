const YAML = require("yaml");
const _ = YAML.stringify;
const $ = YAML.parse;

const wrapComponentWithTitle = component => title =>
  _({
    rows: [{ "h1 text": title }, $(component)]
  });

const createSimpleComponent = chartType => data =>
  _({
    [chartType]: data
  });

const createComponent = (chartType, chartTitle = null) => data =>
  chartTitle === null
    ? createSimpleComponent(chartType)(data)
    : wrapComponentWithTitle(createSimpleComponent(chartType)(data))(
        chartTitle
      );

module.exports = createComponent;
