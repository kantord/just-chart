module.exports = chartType => data => ({
  component: "chart",
  args: { typed: chartType },
  data
});
