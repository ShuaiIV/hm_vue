
// 导入path
const path = require('path')
// import path from 'path';

// 导入自动生成html的模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
// import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
	entry: './src/main.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: 'vue-loader'
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader:'css-loader'
					}
				]
			},
			{
				test: /\.(ttf|png|svg|gif)$/,
				use: 'url-loader'
			}
		]

	},
	plugins: [
		new HtmlWebpackPlugin({
			// 要生成的html的文件名
			filename: 'index.html',
			// 生成html文件的模板
			template: 'template.html'
		})
	]
}