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

const parseInput = inputData =>
  inputData.split("\n").map(line => line.split("\t"));

class JustChartCommand extends Command {
  async run() {
    const inputData = await getStdin();
    const { flags } = this.parse(JustChartCommand);
    const component = createComponent("bar chart")({
      rows: parseInput(inputData)
    });
    const dashboard = createDashboard("")([component]);
    if (flags.show) {
      showDashboard(dashboard);
    } else {
      process.stdout.write(dashboard);
    }
  }
}

JustChartCommand.description = `Create charts`;

JustChartCommand.flags = {
  version: flags.version({ char: "v" }),
  help: flags.help({ char: "h" }),
  show: flags.boolean({
    char: "s",
    default: false,
    description: "Display chart graphically"
  })
};

module.exports = JustChartCommand;
