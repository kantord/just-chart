const { Command, flags } = require("@oclif/command");
const { createComponent, createDashboard } = require("./component");
const tmp = require("tmp");
const fs = require("fs");
const { spawn } = require("child_process");
const getStdin = require("get-stdin");

const createTemporaryFile = dashboard => {
  const tempFile = tmp.fileSync({ postfix: ".yml" });
  fs.writeSync(tempFile.fd, dashboard);
  return tempFile.name;
};

const showDashboard = dashboard => {
  const child = spawn("just-dashboard", [createTemporaryFile(dashboard)]);
};

class JustChartCommand extends Command {
  async run() {
    const inputData = await getStdin();
    const { flags } = this.parse(JustChartCommand);
    const component = createComponent("bar chart")({
      rows: [
        ["data1", "data2", "data3"],
        [90, 120, 300],
        [40, 160, 240],
        [50, 200, 290],
        [120, 160, 230],
        [80, 130, 300],
        [90, 220, 320]
      ]
    });
    const dashboard = createDashboard("")([component]);
    showDashboard(dashboard);
  }
}

JustChartCommand.description = `Create charts`;

JustChartCommand.flags = {
  version: flags.version({ char: "v" }),
  help: flags.help({ char: "h" })
};

module.exports = JustChartCommand;
