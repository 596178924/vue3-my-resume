const path = require('path')

const isDev = process.env.NODE_ENV == 'development'
module.exports = {
	lintOnSave: true,
	publicPath: './', // 基本路径
	outputDir: 'dist', // 输出文件目录
	productionSourceMap: isDev ? true : false,
	// hotOnly: false, // 热更新
	css: {
		requireModuleExtension: true,
		sourceMap: isDev ? true : false,
	},
	devServer: {
		host: '0.0.0.0', // 允许外部ip访问
		port: 2050, // 端口
		https: false, // 启用https
	},
	chainWebpack: (config) => {
		config.resolve.alias
			.set('@', path.resolve(__dirname, 'src'))
			.set('@gc', path.resolve(__dirname, 'src/globalComponents'))
		return config
	},
}
