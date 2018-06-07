let path = require("path");
let webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = {
  "entry": {
    "Accordion": "./src/Accordion",
    "Alert": "./src/Alert",
    "Avatar": "./src/Avatar",
    "Button": "./src/Button",
    "Card": "./src/Card",
    "Checkbox": "./src/Checkbox",
    "CheckboxGroup": "./src/CheckboxGroup",
    "DatePicker": "./src/DatePicker",
    "Dialog": "./src/Dialog",
    "Dropdown": "./src/Dropdown",
    "FileUpload": "./src/FileUpload",
    "Hint": "./src/Hint",
    "Icon": "./src/Icon",
    "List": "./src/List",
    "ListGroup": "./src/ListGroup",
    "ListItem": "./src/ListItem",
    "Modal": "./src/Modal",
    "Overlay": "./src/Overlay",
    "Panel": "./src/Panel",
    "Portal": "./src/Portal",
    "ProgressBar": "./src/ProgressBar",
    "Radio": "./src/Radio",
    "RadioGroup": "./src/RadioGroup",
    "Switch": "./src/Switch",
    "Tab": "./src/Tab",
    "Table": "./src/Table",
    "TableHeader": "./src/TableHeader",
    "TabList": "./src/TabList",
    "TabPanel": "./src/TabPanel",
    "Tabs": "./src/Tabs",
    "Task": "./src/Task",
    "Taskbar": "./src/Taskbar",
    "Text": "./src/Text",
    "TextArea": "./src/TextArea",
    "TextField": "./src/TextField",
    "Timer": "./src/Timer",
    "Tooltip": "./src/Tooltip"
  },
  "devtool": "source-map",
  "output": {
    "path": path.join(__dirname, "../lib"),
    "filename": "[name]/[name].js",
    "libraryTarget": "umd"
  },
  "externals": [
    {
      "react": {
        "root": "React",
        "commonjs2": "react",
        "commonjs": "react",
        "amd": "react"
      }
    },
    {
      "react-dom": {
        "root": "ReactDOM",
        "commonjs2": "react-dom",
        "commonjs": "react-dom",
        "amd": "react-dom"
      }
    }
  ],
  "module": {
    "rules": [
      {
        "test": /.js?$/,
        "loader": "babel-loader",
        "exclude": /node_modules/
      }
    ]
  },
  "plugins": [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
};

if (process.env.NODE_ENV === "production") {
  config.module.rules.push({
    "test": /\.css$/,
    "loader": ExtractTextPlugin.extract({
      "fallback": "style-loader",
      "use": [
        {
          "loader": "css-loader",
          "query": {
            "modules": true,
            "importLoaders": 1,
            "localIdentName": "ra_[name]__[local]",
            "minimize": true
          }
        },
        {
          "loader": "postcss-loader",
          "options": {
            "config": {
              "path": "config/postcss.config.js"
            }
          }
        }
      ]
    })
  });
  config.plugins.push(new ExtractTextPlugin("atlasThemes.min.css"));
} else {
  config.module.rules.push({
    "test": /\.css$/,
    "loaders": [
      "style-loader?sourceMap",
      "css-loader?modules&importLoaders=1&localIdentName=ra_[name]__[local]",
      {
        "loader": "postcss-loader",
        "options": {
          "config": {
            "path": "config/postcss.config.js"
          }
        }
      }
    ]
  });
}

module.exports = config;
