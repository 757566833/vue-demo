const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
    const cmd = argv.mode;
    console.log()
    const config = {
        entry: {
            app: './src/main.js'
        },
        output: {
            filename: (cmd!=='production'&&cmd!=='development')?'[name].js':'[name]/[name].[hash].js',
            path: path.resolve(__dirname, 'public', 'asset'),
            publicPath: '/asset/'
        },
        resolve: {
            alias: {
                // vue: 'vue/dist/vue.js',
            }
        },
        devServer: {
            historyApiFallback:{
                index:`${argv.hotname}.html`
            },
            contentBase: path.join(__dirname, 'devServer'),
            hot: true,
            // compress: true,
            publicPath: '/',
            port: 9000,
            overlay: true,
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["component", {
                                "libraryName": "element-ui",
                                "styleLibraryName": "theme-chalk"
                            }]
                        ]
                    },

                    exclude: /node_modules/
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    // options: {
                    //     loaders: {
                    //         'scss': [
                    //             'vue-style-loader',
                    //             'css-loader',
                    //             'sass-loader'
                    //         ],
                    //         'sass': [
                    //             'vue-style-loader',
                    //             'css-loader',
                    //             'sass-loader?indentedSyntax'
                    //         ]
                    //     }
                    // }
                    exclude: /node_modules/
                }, {
                    test: /\.css$/,
                    use: [
                        cmd !== 'production' ? {
                            loader: 'vue-style-loader'
                        } : {
                            loader: MiniCssExtractPlugin.loader
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer')({
                                        browsers: ['last 15 versions']
                                    }),
                                    require('postcss-flexbugs-fixes')(),
                                    require('cssnano')({
                                        preset: ['default', {
                                            normalizeWhitespace: {
                                                exclude: cmd != 'production',
                                            },
                                        }],
                                    }),
                                ]
                            }
                        }
                    ],
                    // exclude: /node_modules/
                }, {
                    test: /\.(jpg|jpeg|png|svg|gif|woff|woff2|otf|ttf)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        publicPath: '/asset/',
                        name: 'img/[name].[hash:7].[ext]'
                    }

                }
            ]
        },
        plugins: [
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: '[name]/[name].[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                title: 'app',
                filename: path.resolve(__dirname, 'views', `app.ejs`),
                template: path.resolve(__dirname, 'viewBabel', 'babel.ejs'),
                chunks: ['app']
            }),
            
        ]
    };
    if (cmd == 'production') {
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerPort: 8919
        }));
    }else{
        config.resolve.alias.vue = 'vue/dist/vue.js'
    }
    return config;
};