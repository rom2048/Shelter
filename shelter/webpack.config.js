const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { webpack } = require('webpack');

let mode = 'development';
let styleHandler = 'style-loader';
if (process.env.NODE_ENV === 'production') { 
  mode = 'production';
  styleHandler = MiniCssExtractPlugin.loader;
  module.exports.plugins.push(new MiniCssExtractPlugin({
    filename: "[name].css"
  }))
}


module.exports = {
    mode,
    entry: {
        main: path.resolve(__dirname, 'src/pages/main/main.js'),
        pets: path.resolve(__dirname, 'src/pages/pets/pets.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[name][hash][ext][query]',
        filename: '[name][contenthash].bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                        options: { minimize: true },
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: [
                                path.resolve(__dirname, 'src/components/sass/vars.scss'),
                                path.resolve(__dirname, 'src/components/sass/mixins.scss'),
                            ]
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
                type: 'asset/inline',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Shelter',
            template: path.resolve(__dirname, './src/pages/main/main.html'),
            filename: 'pages/main.html',
            favicon: path.resolve(__dirname, './src/assets/food.ico'),
            chunks: ["main"],
            inject: "body"
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/pages/pets/pets.html'),
            title: 'Our Pets',
            filename: 'pages/pets.html',
            favicon: path.resolve(__dirname, './src/assets/food.ico'),
            chunks: ["pets"],
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "pages/[name].css"
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true
    },
    devServer: {
        historyApiFallback: true,
        open: '/pages/main.html',
        compress: true,
        hot: true,
        port: 3000
    },
}