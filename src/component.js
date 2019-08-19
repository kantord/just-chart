const YAML = require("yaml");
const _ = YAML.stringify;
const $ = YAML.parse;

const createComponent = (chartType, chartTitle = null) => data =>
  chartTitle === null
    ? _({
        [chartType]: data
      })
    : _({
        rows: [{ "h1 text": chartTitle }, $(createComponent(chartType)(data))]
      });

module.exports = createComponent;
