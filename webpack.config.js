const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle_index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:'babel-loader',
                    options:{
                        presets: ['@babel/preset-react', '@babel/preset-env']

                    }
                
                }
                    ,
                //presets: ['@babel/preset-es2015','@babel/preset-react', '@babel/preset-stage-0']
            }
        ]
    },
    mode: 'development'
};