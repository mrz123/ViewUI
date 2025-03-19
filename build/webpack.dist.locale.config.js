const path = require('path');
const webpack = require('webpack');
const entry = require('./locale');
// 替换已废弃的插件
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); // 替换 UglifyJsPlugin

process.env.NODE_ENV = 'production';

module.exports = {
    devtool: 'source-map',
    entry,
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    sourceMap: true,
                },
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, '../dist/locale'),
        publicPath: '/dist/locale/',
        filename: '[name].js',
        library: 'iview/locale',
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
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
		// 修改插件配置
        // new UglifyJsPlugin({
        //     parallel: true,
        //     sourceMap: true,
        // })
		new TerserPlugin({
            parallel: true,
            terserOptions: {
                sourceMap: true, // 在 terserOptions 中配置 sourceMap
            },
        }),
    ]
};
