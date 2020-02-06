var path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.coffee",
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.coffee$/,
                exclude: /node_modules/,
                use: {
                  loader: "coffee-loader",
                  options: {
                    sourceMap: true,
                    presets: ["@babel/env"]
                  }
                }
            }
        ]
    }
}
