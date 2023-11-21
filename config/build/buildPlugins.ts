import webpack, {Configuration} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { BuildOptions } from "./types/types";

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
    const { mode, paths, analyzer } = options;

    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({ template: paths.html}),
    ];

    if(isDev) {
        plugins.push(new webpack.ProgressPlugin());
    }

    if(isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }));
    }

    // npm run build:prod -- --env analyzer=true    -  give variable for analyzer plugin in command
    if(analyzer) plugins.push(new BundleAnalyzerPlugin());

    return plugins;
}
