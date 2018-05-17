const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const appDirectory = path.resolve(__dirname, '../');

const readFile = filepath => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
};

const writeFile = (filepath, content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(filepath, content, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

const babelLoaderConfiguration = {
    test: /\.js$/,
    // Add every directory that needs to be compiled by Babel during the build.
    include: [
        path.resolve(appDirectory, 'src/game')
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

const config = {
    mode: 'production',

    entry: path.resolve(appDirectory, 'src/game/index.webview.js'),

    output: {
        filename: 'bundle.game.js',
        path: path.resolve(appDirectory, 'build')
    },

    module: {
        rules: [
            babelLoaderConfiguration,
            imageLoaderConfiguration,
            soundLoaderConfiguration
        ]
    },

    plugins: [
        // `process.env.NODE_ENV === 'production'` must be `true` for production
        // builds to eliminate development checks and reduce build size. You may
        // wish to include additional optimizations.
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            __DEV__: process.env.NODE_ENV === 'production' || true
        })
    ]
};

webpack(config, (err, stats) => {
    const inputPath = path.join(config.output.path, config.output.filename);
    const outputPath = path.resolve(appDirectory, 'src/game/game.html');

    readFile(inputPath)
        .then(data => writeFile(outputPath,
            `<!DOCTYPE html>
             <html lang="en" dir="ltr">
                <head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
                    <meta charset="utf-8">
                    <title>Pigzbe</title>
                    <style>
                        html,
                        body,
                        canvas {
                            margin: 0;
                            padding: 0;
                            width: 100%;
                            height: 100%;
                            overflow: hidden;
                        }
                    </style>
                </head>
                <body>
                    <script>
                    ${data}
                    </script>
                </body>
             </html>`
        ))
        .then(() => {
            process.stdout.write(stats.toString() + '\n');
            process.stdout.write('✓ game.html created\n');
        });
});
