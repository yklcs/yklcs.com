exports.onCreateWebpackConfig = ({ stage, plugins, actions }) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.jsx$/,
          use: ["stylelint-custom-processor-loader"],
          exclude: /node_modules/,
        },
      ],
    },
  })
}
