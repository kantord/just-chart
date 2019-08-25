const { _, $ } = require("./YAML");

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

const createDashboard = title => data => _({ [`dashboard "${title}"`]: data });

module.exports = { createComponent, createDashboard };
