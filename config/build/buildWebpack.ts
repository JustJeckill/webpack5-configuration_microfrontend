import webpack from "webpack";
import path from "path";

import {buildDevServer} from "./buildDevServer";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";


export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options;

    const isDev = mode === 'development';

    return {
        mode,
        entry: paths.entry,
        output: {
            filename: 'bundle.[contenthash].js',
            path: paths.output,
            clean: true,
        },
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
        plugins: buildPlugins(options),
        devServer: isDev ? buildDevServer(options) : undefined, // build in production mode is crushed if devServer false
        devtool: isDev && 'inline-source-map',
    }
}
