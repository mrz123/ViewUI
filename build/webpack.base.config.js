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
/*                use: 'vue-loader',
                options: {
                    use: {
                        css: [
                            'vue-style-loader',
                            {
                                use: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                        less: [
                            'vue-style-loader',
                            {
                                use: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            {
                                use: 'less-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                        ],
                    },
                    // postLoaders 在 Webpack 2 之后已废弃，需移除或替换为 enforce: 'post'
                    // postLoaders: {
                    //    html: 'babel-loader?sourceMap'
                    // },

                    sourceMap: true,
                }*/
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
                use: 'url-loader?limit=8192'
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
