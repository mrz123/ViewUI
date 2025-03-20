/**
 * 公共配置
 */
const path = require('path');
const webpack = require('webpack');
const pkg = require('../package.json');
const { VueLoaderPlugin } = require('vue-loader');

function resolve (dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    // 加载器
    module: {
        rules: [
            {
                test: /\.vue$/,
                use:[
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                css: [
                                    'vue-style-loader',
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            sourceMap: true,
                                        },
                                    },
                                ],
                                less: [
                                    'vue-style-loader',
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            sourceMap: true,
                                        },
                                    },
                                    {
                                        loader: 'less-loader',
                                        options: {
                                            sourceMap: true,
                                            lessOptions: {
                                                javascriptEnabled: true, // 启用内联 JavaScript
                                            },
                                        },
                                    },
                                ],
                            },
                            sourceMap: true,
                        },

                    }
                ],
            },

            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            sourceMap: true,
                        },
                    }
                ],
                exclude: /node_modules/,
            },

            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        //'autoprefixer-loader' 已废弃，应替换为 postcss-loader
                        // loader: '\'autoprefixer-loader\'',
                        loader: 'postcss-loader',
                    },
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true,
                            lessOptions: {
                                javascriptEnabled: true, // 启用内联 JavaScript
                            },
                        },
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            // sourceMap: true,
                        },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ]
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: 'url-loader?limit=4096' //限制为4KB，超过的文件使用file-loader
            },
            {
                test: /\.(html|tpl)$/,
                use: 'html-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            'vue': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.VERSION': `'${pkg.version}'`
        }),
        new VueLoaderPlugin()
    ]
};
