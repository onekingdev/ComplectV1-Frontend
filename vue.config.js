module.exports = {
	devServer: {
		overlay: {
			warnings: false,
			errors: false
		}
	},
	configureWebpack: {
		devServer: {
			public: "localhost:81",
			host: "0.0.0.0",
			port: 81,
			// https: true,
			// hmr: true,
			disableHostCheck: true,
			headers: {
				"Access-Control-Allow-Origin": "*",
			}
		}
	}
}