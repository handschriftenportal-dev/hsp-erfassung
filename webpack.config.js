const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const commonConfig = {
  entry: {
    'erfassung': './src/index.tsx',
  },
  output: {
    filename: 'erfassung.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@emotion'],
                ['@babel/preset-env', {
                  'targets': {
                    'node': 'current'
                  }
                }],
                ['@babel/preset-react'],
              ],
              env: {
                'test': {
                  'plugins': ['transform-es2015-modules-commonjs']
                }
              }
            },
          }
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    plugins: []
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      path: path.resolve(__dirname, 'dist'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        'node_modules/hsp-fo-workspace/dist',
      ]
    }),
  ],
}

const productionConfig = {
  mode: 'production',
}

const developmentConfig = {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    // open: true,
    hot: true,
  }
}

module.exports = process.env.NODE_ENV === 'development'
  ? { ...commonConfig, ...developmentConfig }
  : { ...commonConfig, ...productionConfig }
