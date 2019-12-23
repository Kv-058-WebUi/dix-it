const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackRootPlugin = require('html-webpack-root-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const SRC = path.resolve(__dirname, 'node_modules');


module.exports = {
    mode: "development",

    entry: {
        main: "./src/web/frontend/main.tsx",
    },

    output: {
        filename: "[name].bundle.js",
        chunkFilename: '[name].chunk.js',
        path: __dirname + "/dist/web/frontend",
        publicPath: "/",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    devServer: {
        writeToDisk: true,
        contentBase: path.resolve('public'),
        compress: true,
        port: 3000,
        publicPath: '/',
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:5000'
    }
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },

            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.mp3$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'sounds/'
                        }
                    }
                ]
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
            ]
            },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {enforce: "pre", test: /\.js$/, loader: "source-map-loader"},
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },

    optimization: {
        splitChunks: {
            chunks: "all"
        },
        usedExports: true
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackRootPlugin(),
        new CopyPlugin([{
            from: path.join(__dirname, 'src/web/frontend/images'),
            to: path.join(__dirname, 'dist/web/frontend/images')
        }])
    ]
};
