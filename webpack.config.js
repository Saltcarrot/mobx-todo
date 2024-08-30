const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = () => {
	const isProd = process.env.NODE_ENV === 'production'

	return {
		mode: isProd ? 'production' : 'development',
		entry: getPathTo('src/index.tsx'),
		output: {
			path: getPathTo('build'),
			filename: '[name].js',
			chunkFilename: isProd ? 'js/chunk-[chunkhash].js' : 'js/chunk-[name].js',
			clean: true,
			assetModuleFilename: getAssetFilename('assets/', isProd),
			publicPath: '/'
		},
		devServer: {
			port: 3000,
			hot: true,
			historyApiFallback: true,
			static: {
				directory: getPathTo('src')
			}
		},
		devtool: isProd ? false : 'source-map',
		plugins: [
			new HTMLWebpackPlugin({
				filename: 'index.html',
				template: getPathTo('src/index.html'),
				minify: isProd
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: isProd ? 'styles/chunk-[chunkhash].css' : 'styles/chunk-[name].css'
			})
		],
		optimization: {
			minimizer: [ new CssMinimizerWebpackPlugin(), new TerserPlugin() ],
			minimize: isProd
		},
		module: {
			rules: [
				{
					test: /\.html$/i,
					loader: 'html-loader'
				},
				{
					test: /\.js|jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: [ '@babel/preset-react', '@babel/preset-env' ]
						}
					}
				},
				{
					test: /\.ts|tsx?$/,
					exclude: /node_modules/,
					loader: 'ts-loader'
				},
				{
					test: /\.css$/,
					use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
				},
				{
					test: /\.(?:png|jpg|jpeg|webp)$/i,
					type: 'asset/resource',
					generator: {
						filename: getAssetFilename('assets/images/', isProd)
					}
				},
				{
					test: /\.(woff(2)?|eot|ttf|otf)$/,
					type: 'asset/resource',
					generator: {
						filename: getAssetFilename('assets/fonts/', isProd)
					}
				}
			]
		},
		resolve: {
			extensions: [ '.tsx', '.ts', '.js' ],
			plugins: [
				new TsconfigPathsPlugin({
					configFile: './tsconfig.json',
					extensions: [ '.tsx', '.ts' ]
				})
			]
		}
	}
}

const getPathTo = path => resolve(__dirname, path)

const getAssetFilename = (folder, isProd) =>
	isProd ? `${folder}[name].[contenthash][ext]` : `${folder}[name][ext]`