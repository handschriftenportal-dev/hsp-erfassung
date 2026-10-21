const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: {
    erfassung: './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'erfassung.js',
    clean: true,
  },
  devtool: isProd ? false : 'eval-cheap-module-source-map',
  cache: { type: 'filesystem' },
  stats: { all: false, errors: true, errorDetails: true, timings: true },
  infrastructureLogging: { level: 'warn' },
  module: {
    noParse: /hsp-fo-workspace\.standalone(\.min)?\.js$/,
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            sourceMaps: true,
            presets: [
              ['@babel/preset-env', { targets: '>0.5%, not dead, not op_mini all', modules: false, bugfixes: true }],
              ['@babel/preset-react', { runtime: 'automatic' }],
            ],
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              compilerOptions: {
                sourceMap: true
              }
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { sourceMap: !isProd } },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: 'asset',
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      root: __dirname,
      src: path.resolve(__dirname, 'src'),
    },
    symlinks: false,
  },
  optimization: {
    splitChunks: false,
    runtimeChunk: false,
    minimize: isProd,
    minimizer: [
      new TerserPlugin({
        parallel: 2,
        extractComments: false,
        terserOptions: { compress: { passes: 2 } },
      }),
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ async: !isProd, typescript: { memoryLimit: 2048 } }),
    ...(isProd
      ? [new MiniCssExtractPlugin({ filename: 'assets/css/[name].css' })]
      : [new HtmlWebpackPlugin({ template: './public/index.html' })]),
  ],

  devServer: isProd
    ? undefined
    : {
      open: true,
      hot: true,
      historyApiFallback: true,
      client: { overlay: { errors: true, warnings: false } },
    },
};
