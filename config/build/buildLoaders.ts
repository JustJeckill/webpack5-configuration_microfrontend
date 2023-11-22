import { ModuleOptions } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from 'react-refresh-typescript';

import { BuildOptions } from "./types/types";

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
        use: [
            {
                loader: 'ts-loader',
                options: {
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    }),
                    transpileOnly: true,
                }
            }
        ],
        exclude: /node_modules/,
    };

    const assetLoader = {
            test: /\.(png|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
        };

    const svgLoader = {
        test: /\.svg$/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    };

    return [
        scssLoader,
        tsLoader,
        assetLoader,
        svgLoader
    ];
}
