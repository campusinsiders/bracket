const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const proxyHost = 'http://0.0.0.0:';
const proxyPort = process.env.DEV_PORT;

module.exports = {
	context: path.resolve(__dirname, 'app'),
	entry: {
		main: [ 'babel-polyfill', 'whatwg-fetch', './app.js'],
		admin: [ 'babel-polyfill', 'whatwg-fetch', './admin/admin-main.js' ],
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					loader: 'css-loader?importLoaders=1!postcss-loader'
				}),
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				query: {
					presets: [
						[ "es2015", { modules: false } ],
						"stage-0",
						"react"
					],
					plugins: [
						'transform-async-to-generator',
						'transform-decorators-legacy'
					]
				}
			}
		],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	plugins: [
		new ExtractTextPlugin('bundle.css'),
		//new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			names: [ 'vendor', 'manifest' ]
		}),
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			proxy: proxyHost.concat(proxyPort.replace(/"/g, '')),
			notify: false,
			files: [
				'./**/*.css',
				'./app/bundle.js',
				'./**/*.html'
			]
		})
	],
};
