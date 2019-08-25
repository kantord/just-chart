const { Command, flags } = require("@oclif/command");
const { createComponent, createDashboard } = require("./component");
const tmp = require("tmp");
const fs = require("fs");
const { spawn } = require("child_process");
const getStdin = require("get-stdin");

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
    const tempFile = tmp.fileSync({ postfix: ".yml" });
    fs.writeSync(tempFile.fd, dashboard);
    console.log("Temporary file created: " + tempFile.name);

    const child = spawn("just-dashboard", [tempFile.name]);
  }
}

JustChartCommand.description = `Describe the command here
...
Extra documentation goes here
`;

JustChartCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  // add --help flag to show CLI version
  help: flags.help({ char: "h" }),
  name: flags.string({ char: "n", description: "name to print" })
};

module.exports = JustChartCommand;
