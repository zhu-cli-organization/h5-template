const path = require('path');
const MiniCssEaxtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const  ReactRefreshWebpackPlugin= require('react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry:'./src/index.ts', //SPA
    entry:{
        index:'./src/index.ts',
        start:{
            dependOn:'index', // index页面先启动，才能启动start
            import:'./src/start/index.tsx',
            filename:'[start].[contenthash].js',
            // publicPath:'',
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 文件输出地址，必须是绝对路径
        filename: '[name].[contenthash].js', // bundle的名字,bundle要插入html文件中哦
    },
    
    module: {
        rules: [
            {
                test: /\.(m?js|jsx|ts|tsx)$/,
                use: {
                    loader: 'swc-loader',
                    options: {
                        sync: true, // 
                        jsc: {
                            minify: {
                                compress: true // 压缩
                            },
                            parser: {
                                syntax: "typescript",
                                tsx: false,
                                decorators: true, // 装饰器
                                dynamicImport: false
                            },
                            transform: {
                                react: {
                                    runtime: 'automatic',
                                    development: isDev,
                                    refresh: isDev,
                                },
                            },
                        },
                        env: {
                            coreJs: 3,
                            mode: 'usage',
                            debug: true
                        },
                    }
                }
            },
            {
                test:/\.(css|less)/,
                use:[
                    isDev?'style-loader':MiniCssEaxtractPlugin.loader, // 将css注入html
                    'css-loader',
                    {
                     loader:'postcss-loader', // 浏览器兼容性前缀
                     options:{
                        postcssOptions:{
                            plugins:[
                                 'postcss-preset-env', // 处理浏览器兼容性问题，集成了autoprefixer
                                 {
                                    'postcss-px-2-viewport': { // 处理不同屏幕像素适配
                                        viewportWidth:375
                                     }
                                 }
                            ]
                        }
                     }
                    },
                    'less-loader',
                    {
                        loader:'style-resources-loader', // 默认每个less文件中引入该资源
                        options:{
                            patterns:[
                                './node_modules/@hupu/api-color/es/theme.css',
                                './node_modules/@hupu/api-color/es/common.font.less',
                                './node_modules/@hupu/api-color/es/functions.less'
                            ]
                        }
                    }
                ]
            },
            {
             test:/\.(png|jpg|jpe?g|svg)/,  
             use: [
                {
                    loader:'url-loader',
                    options:{
                        limit:800
                    }
                }
             ]
            },
            {
            test:/\.(eot|woff2|ttf|otf)/,
            use:[
                {
                    loader:'url-loader',
                    options:{
                        limit:5120
                    }
                }
             ]
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),  //构建前清空目标目录
        new webpack.DefinePlugin({ // 定义dev环境下，process.env全局常量
            PUBLIC_URL:path.resolve('.')
        }),
        // new CopyPlugin({
        //     patterns:[
        //         {
        //             from:'assets',to:'public' // 将assets中的文件不进行打包，直接复制到结果public中
        //         }
        //     ]
        // })
        isDev? new ReactRefreshWebpackPlugin():null, // 开发时 热更新
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'start.html',// 这是bundle入口，打成bundle.js插入start.html
            title:'开始', // 替换模板字符串
            inject:'body', // body表示将<script>插入body bottom
            // publicPath:'js' , 
            chunk:['start'], //  对应entry里面的chunk
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html', 
            title:'首页',  
            inject:'body',  
            chunk:['index'], //  
        })
    ]
}

moudle.exports.parallelism=1;