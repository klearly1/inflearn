const path = require('path'); //노드 깔려있으면 path 는 당연히 있다.
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'minesearch-setting',
    mode: 'development', // 실서비스 : production
    devtool: 'eval',
    resolve: { //확장자 확장 
        extensions : ['.js','.jsx', '.html']
    },
    entry: { // webpack 입력
        app: './client',
    }, 
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets: {
                            browsers: ['> 5% in KR', 'last 2 chrome versions'], //browserslist
                        },
                        debug: true,
                    }],
                    '@babel/preset-react',
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ], 
            }, 
        }],
    }, 
    plugins: [
        new RefreshWebpackPlugin()
    ],
    output: { // webpack 출력
        path: path.join(__dirname, 'dist'),
        filename: 'app.js',
            publicPath: '/dist/',
    }, 
    devServer: {
        devMiddleware: {
            publicPath: '/dist/',
        },
        static: {
            directory: path.resolve(__dirname)
            // directory: path.resolve(__dirname, src)
        },
        hot: true,
    },
};