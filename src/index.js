const { Command, flags } = require("@oclif/command");
const { createComponent, createDashboard } = require("./component");
const tmp = require("tmp");
const fs = require("fs-extra");
const path = require("path");
const { spawn } = require("child_process");
const getStdin = require("get-stdin");
const parseInput = require("emuto-cli/src/parse-input.js");
const supportedInputFormats = require("emuto-cli/src/supportedInputFormats.json");
const compileEmutoSource = require("emuto/lib/compiler").default;
const emutoBuiltIns = require("emuto/lib/builtins.js").default;

const createJustChartCommand = (chartType, usage, features) => {
  const createTemporaryFile = dashboard => {
    const tempFile = tmp.fileSync({ postfix: ".yml" });
    fs.writeSync(tempFile.fd, dashboard);
    return tempFile.name;
  };

  const createGist = async ({ dashboard, token }) => {
    const GistClient = require("gist-client");
    const gistClient = new GistClient();

    return await gistClient.setToken(token).create({
      description: "",
      public: true,
      files: {
        "dashboard.yml": {
          content: dashboard
        }
      }
    });
  };

  const publishDashboard = async (config, dashboard) => {
    const { token } = await fs.readJSON(
      path.join(config.configDir, "gh_auth.json")
    );
    const {
      id,
      owner: { login }
    } = await createGist({ dashboard, token });
    const publicURL = `https://bottoml.in/e/${login}/${id}`;
    process.stdout.write(publicURL + "\n");
  };

  const showDashboard = dashboard => {
    spawn("just-dashboard", [createTemporaryFile(dashboard)]);
  };

  const prepareInput = (inputData, inputFormat, inputQuery) => {
    const compiledInputQuery = eval(compileEmutoSource(inputQuery || "$"))(
      emutoBuiltIns
    );
    return parseInput(inputData, inputFormat, undefined, []).map(
      compiledInputQuery
    );
  };

  const compileDashboard = ({ inputData, orientation, title, flags }) => {
    let finalChartType = chartType;
    if (flags.stacked) {
      finalChartType = "stacked " + finalChartType;
    }
    if (flags.horizontal) {
      finalChartType = "horizontal " + finalChartType;
    }
    const component = createComponent(finalChartType, title)({
      [orientation]: prepareInput(inputData, flags.inputf, flags["item-query"])
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
        title: args.title,
        flags
      });

      if (flags.show) {
        showDashboard(dashboard);
      } else {
        if (flags.publish) {
          publishDashboard(this.config, dashboard);
        } else {
          process.stdout.write(dashboard);
        }
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
    publish: flags.boolean({
      char: "p",
      default: false,
      description: "Publish chart online"
    }),
    columns: flags.boolean({
      char: "c",
      default: false,
      description: "Data is column oriented instead of row oriented"
    }),
    inputf: flags.string({
      char: "i",
      description: "input format supported by emuto. See emuto -h",
      options: supportedInputFormats,
      default: "dsv"
    }),
    "item-query": flags.string({
      char: "q",
      description: "emuto query to run for each row/column",
      default: null
    }),
    ...(features.horizontal
      ? {
          horizontal: flags.boolean({
            default: false,
            description: "Make chart horizontal"
          })
        }
      : {}),
    ...(features.stacked
      ? {
          stacked: flags.boolean({
            default: false,
            description: "Make chart stacked"
          })
        }
      : {})
  };

  return JustChartCommand;
};

module.exports = createJustChartCommand;
