module.exports = {
	configureWebpack: {
		// module: {
		// 	rules: [
		// 		{
		// 			test: /\.s[ac]ss$/i,
		// 			use: ["style-loader", "css-loader", "sass-loader"]
		// 		}
		// 	]
		// },
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