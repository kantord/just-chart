const { Command, flags } = require("@oclif/command");
const { createComponent, createDashboard } = require("./component");
const tmp = require("tmp");
const fs = require("fs");
const { spawn } = require("child_process");
const getStdin = require("get-stdin");

const createJustChartCommand = (chartType, usage) => {
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

  const compileDashboard = ({ inputData, orientation, title }) => {
    const component = createComponent(chartType, title)({
      [orientation]: parseInput(inputData)
    });
    return createDashboard(title || "")([component]);
  };

  class JustChartCommand extends Command {
    async run() {
      const inputData = await getStdin();
      const { flags, args } = this.parse(JustChartCommand);
      const dashboard = compileDashboard({
        inputData,
        orientation: "rows",
        title: args.title
      });

      if (flags.show) {
        showDashboard(dashboard);
      } else {
        process.stdout.write(dashboard);
      }
    }
  }

  JustChartCommand.description = `Create ${chartType}s`;
  JustChartCommand.usage = usage + " [TITLE]";

  JustChartCommand.args = [
    {
      name: "title",
      required: false,
      description: "Chart title",
      default: null
    }
  ];

  JustChartCommand.flags = {
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    show: flags.boolean({
      char: "s",
      default: false,
      description: "Display chart graphically"
    }),
    columns: flags.boolean({
      char: "c",
      default: false,
      description: "Data is column oriented instead of row oriented"
    })
  };

  return JustChartCommand;
};

module.exports = createJustChartCommand;
