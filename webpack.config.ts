import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";


type Mode = 'production' | 'development';

interface EnvVariables {
    mode: Mode,
    port: number,
}

export default (env: EnvVariables) => {
    const isDev = env.mode === 'development';

    const devServer = {
        port: env.port ?? 3000,
            open: true,
    }

    const config: webpack.Configuration = {
        mode: env.mode ?? 'development',
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: 'bundle.[contenthash].js',
            path: path.resolve(__dirname, 'build'),
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html')}),
            isDev && new webpack.ProgressPlugin(),
        ],
        devServer: isDev ? devServer : undefined, // build in production mode is crushed if devServer has value = false
        devtool: isDev && 'inline-source-map',
    }

    return config;
};
