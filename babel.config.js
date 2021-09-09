module.exports = {
	"presets": [
		["@babel/preset-env", {
			"modules": false,
			"targets": {
				"browsers": [
					"> 1%"
				],
				"uglify": true,
			},
			"useBuiltIns": false,
		}],
	],

	"plugins": [
		"@babel/syntax-dynamic-import",
		"@babel/plugin-proposal-object-rest-spread",
		// ["transform-class-properties", { "spec": true }],
		["@babel/plugin-transform-runtime", { "regenerator": true }],
	],
}
