const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
    test: /\.js$/,
    // Add every directory that needs to be compiled by Babel during the build.
    include: [
        path.resolve(appDirectory, 'desktop/index.web.js'),
        path.resolve(appDirectory, 'src'),
        path.resolve(appDirectory, './'),
        path.resolve(appDirectory, 'node_modules/react-navigation')
    ],
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            plugins: ['react-native-web'],
            presets: ['react-native']
        }
    }
};

const imageLoaderConfiguration = {
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
        loader: 'url-loader',
        options: {
            name: '[name].[ext]'
        }
    }
};

const soundLoaderConfiguration = {
    test: /\.(mp3|ogg|wav)$/,
    use: {
        loader: 'url-loader',
        options: {
            name: '[name].[ext]'
        }
    }
};

const fontLoaderConfiguration = {
    test: /\.(woff|woff2|ttf)$/,
    use: {
        loader: 'url-loader',
        options: {
            name: '[name].[ext]'
        }
    }
};

module.exports = {
    entry: path.resolve(appDirectory, 'desktop/index.web.js'),

    output: {
        filename: 'bundle.web.js',
        path: path.resolve(appDirectory, 'desktop')
    },

    module: {
        rules: [
            babelLoaderConfiguration,
            imageLoaderConfiguration,
            soundLoaderConfiguration,
            fontLoaderConfiguration
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Pigzbe'
        }),
        // `process.env.NODE_ENV === 'production'` must be `true` for production
        // builds to eliminate development checks and reduce build size. You may
        // wish to include additional optimizations.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            __DEV__: process.env.NODE_ENV === 'production' || true
        })
    ],

    resolve: {
        // If you're working on a multi-platform React Native app, web-specific
        // module implementations should be written in files using the extension
        // `.web.js`.
        extensions: ['.web.js', '.js']
    },

    devServer: {
        watchOptions: {
            poll: true
        }
    }
};
