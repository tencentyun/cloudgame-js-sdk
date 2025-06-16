import path from 'path';
import webpack, { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import packageJson from './package.json';

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const webpackConfig: Configuration = {
  devServer: {
    port: 3009,
    compress: true,
    open: ['/android_instance'],
  },
  entry: {
    app: './src/app.tsx',
  },
  cache: {
    type: 'filesystem',
  },
  output: {
    filename: () => `android_instance/[name]/${packageJson.version}/[name].js`,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.scss', '.css', '.jpg', '.png', '.svg', '.webp'],
    alias: {
      '@sdk': path.resolve(__dirname, 'src/sdk'),
      src: path.resolve(__dirname, 'src'),
    },
  },
  stats: {
    errorDetails: true,
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            include: path.resolve(__dirname, './src'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
              {
                loader: 'ts-loader',
                options: {
                  happyPackMode: true,
                  transpileOnly: true,
                },
              },
            ],
          },
          {
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [['postcss-preset-env', {}]],
                  },
                },
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      ['postcss-preset-env', {}],
                      ['@tailwindcss/postcss', {}],
                    ],
                  },
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  esModule: false,
                  name: '[name].[hash:5].[ext]',
                },
              },
            ],
            type: 'javascript/auto',
          },
          {
            test: /\.(tsx|ts)$/,
            enforce: 'pre',
            use: ['source-map-loader'],
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `android_instance/[name]/${packageJson.version}/[name].css`,
    }) as any,
    new HtmlWebpackPlugin({
      minify: false,
      template: './public/index.html',
      filename: 'android_instance/index.html',
      chunks: ['app'],
    }),
  ],
  optimization: {
    chunkIds: 'named',
    moduleIds: 'deterministic',
    splitChunks: {
      automaticNameDelimiter: '~',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'venders',
        },
      },
    },
    minimize: true,
  },
  performance: {
    maxAssetSize: 5120 * 1024,
    maxEntrypointSize: 5120 * 1024,
  },
};

export default (env: any, argv: webpack.Configuration) => {
  if (argv.mode === 'development') {
    webpackConfig.devtool = 'eval-source-map';
  }
  return webpackConfig;
};
