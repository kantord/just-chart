const YAML = require("yaml");
const _ = YAML.stringify;
const $ = YAML.parse;

const wrapComponentWithTitle = component => title =>
  _({
    rows: [{ "h1 text": title }, $(component)]
  });

const createComponent = (chartType, chartTitle = null) => data =>
  chartTitle === null
    ? _({
        [chartType]: data
      })
    : wrapComponentWithTitle(createComponent(chartType)(data))(chartTitle);

module.exports = createComponent;
