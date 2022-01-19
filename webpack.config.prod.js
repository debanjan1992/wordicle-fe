const { merge } = require('webpack-merge');
const commonWebpack = require('./webpack.config.common');

const config = merge(commonWebpack, {
    mode: "production",
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
});

module.exports = config;