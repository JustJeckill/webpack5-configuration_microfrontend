import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const { mode } = options;

    const isDev = mode === 'development';

    const cssLoaderWithModules = {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },

        },
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // order is important (right to left) scss to css and to styles string
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin?.loader, // MiniCssExtractPlugin contains style-loader
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            'sass-loader',
        ],
    };

    const tsLoader = {
        // ts-loader can work with jsx (react), if we use only js, we need to install babel-loader for react
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    return [scssLoader, tsLoader];
}
