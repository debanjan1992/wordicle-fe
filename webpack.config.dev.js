const path = require("path");
const { merge } = require('webpack-merge');
const commonWebpack = require('./webpack.config.common');

const config = merge(commonWebpack, {
    mode: "development",
    devtool: "source-map",
    devServer: { static: path.join(__dirname, "src"), port: 3000 },
});

module.exports = config;