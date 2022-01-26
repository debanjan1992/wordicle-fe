const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

const changeManifestFile = (env) => {
  console.log(`--- changing manifest.json file for ${env} ---`);
  const maniFestJSON = JSON.parse(
    fs.readFileSync(path.join(__dirname, "manifest.json"))
  );
  if (env === "development") {
    maniFestJSON["start_url"] = "/";
    maniFestJSON["scope"] = "/";
  } else if (env === "production") {
    const appUrl = JSON.parse(
      fs.readFileSync(path.join(__dirname, "package.json"))
    ).homepage;
    maniFestJSON["start_url"] = appUrl;
    maniFestJSON["scope"] = appUrl;
  }
  console.log(
    `--- writing to manifest.json file: start_url and scope - ${maniFestJSON["start_url"]} ---`
  );
  fs.writeFileSync(
    path.join(__dirname, "manifest.json"),
    JSON.stringify(maniFestJSON, null, 4)
  );
};

const config = (env) => {
  const environment = env.production ? "production" : "development";
  const webpackConfig = {
    entry: "./src/index.tsx",
    output: { path: path.join(__dirname, "build"), filename: "main.bundle.js" },
    mode: environment,
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(css|scss)$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
          use: ["file-loader"],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
      }),
      new MiniCssExtractPlugin(),
      new CopyWebpackPlugin({
        patterns: [
          { from: "src/assets", to: "assets" },
          { from: "service_worker.js", to: "./" },
          { from: "manifest.json", to: "./" },
        ],
      }),
    ],
  };

  changeManifestFile(environment);

  if (environment === "development") {
    webpackConfig.devtool = "source-map";
    webpackConfig.devServer = {
      static: path.join(__dirname, "src"),
      port: 3000,
      host: "0.0.0.0"
    };
    webpackConfig.plugins.push(
      new Dotenv({ systemvars: true, path: "./.env.dev" })
    );
  } else {
    webpackConfig.performance = {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };
    webpackConfig.plugins.push(
      new Dotenv({ systemvars: true, path: "./.env" })
    );
  }
  return webpackConfig;
};

module.exports = config;
