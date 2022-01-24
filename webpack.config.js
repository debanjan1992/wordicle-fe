const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require('dotenv-webpack');

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
                    { from: "src/assets", to: "assets" }
                ]
            })
        ]
    };

    if (environment === "development") {
        webpackConfig.devtool = "source-map";
        webpackConfig.devServer = { static: path.join(__dirname, "src"), port: 3000 };
        webpackConfig.plugins.push(new Dotenv({ systemvars: true, path: "./.env.dev" }));
    } else {
        webpackConfig.performance = {
            hints: false,
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        };
        webpackConfig.plugins.push(new Dotenv({ systemvars: true, path: "./.env" }));
    }
    return webpackConfig;
}

module.exports = config;