const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')

const getStyleLoader = mode => {
  return mode === 'production' ? miniCssExtractPlugin.loader : 'style-loader'
}

const getPlugins = mode => {
  const plugins = [
    new htmlWebpackPlugin({
      inject: 'body',
      template: 'src/index.html',
    }),
  ]
  if (mode === 'production') {
    plugins.push(
      new miniCssExtractPlugin({
        filename: '[name]-[hash:7].css',
      })
    )
  }

  return plugins
}

module.exports = (env = {}) => {
  const isProd = env.mode === 'production'
  const mode = isProd ? 'production' : 'development'

  return {
    mode,
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          exclude: [/node_modules/],
        },
        {
          test: /\.(png|jpg|jpeg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'img',
                name: '[name]-[sha1:hash:7].[ext]',
              },
            },
          ],
        },
        {
          test: /\.ico$/,
          use: 'file-loader',
        },
        {
          test: /\.(ttf|otf|eot|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'fonts',
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [getStyleLoader(mode), 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/,
          use: [getStyleLoader(mode), 'css-loader', 'sass-loader'],
        },
      ],
    },
    plugins: getPlugins(mode),
    devServer: {
      open: true,
    },
  }
}
