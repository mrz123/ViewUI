// UglifyJsPlugin 已废弃，推荐使用 TerserPlugin
// 安装 terser-webpack-plugin  npm install --save-dev terser-webpack-plugin
const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const CompressionPlugin = require('compression-webpack-plugin');
// 替换已废弃的插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 替换 UglifyJsPlugin

process.env.NODE_ENV = 'production';

module.exports = merge(webpackBaseConfig, {
    devtool: 'source-map',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'iview.min.js',
        library: 'iview',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
    plugins: [
        // @todo
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        // 修改插件配置
        // new UglifyJsPlugin({
        //    parallel: true,
        //    sourceMap: true
        // }),

        new TerserPlugin({
            parallel: true,
            terserOptions: {
                sourceMap: true, // 在 terserOptions 中配置 sourceMap
            },
        }),
        new CompressionPlugin({
            // asset: '[path].gz[query]',
            filename: '[path][base].gz', // 替代 asset 属性
            algorithm: 'gzip',
            test: /\.(js|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
});
