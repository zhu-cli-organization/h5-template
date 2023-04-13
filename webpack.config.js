// 项目所有资源编译，构建，打包的配置文件

const path = require('path');
const MiniCssEaxtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { resolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin'); // webpack5默认内置第三方，并开启多线程压缩。
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

// const productionGzipExtensions = ['js', 'css'];
const isDev = process.env.NODE_ENV==='development';
 const baseConfig= {
    entry:{
        index:'./src/demo/index.tsx',
        // start:'./src/start/index.tsx'
        // start:{
        //     // dependOn:'index', // index页面先启动，才能启动start
        //     import:'./src/start/index.tsx',
        //     filename:'[name].[contenthash].js',
        //     // publicPath:'',
        // }
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 文件输出地址，必须是绝对路径
        filename: '[name].[contenthash].js', // bundle的名字,bundle要插入html文件中哦
    },
    
    devServer: {
        static: {
          directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
      },
    
    module: {
        rules: [
            {
                test: /\.(m?js|jsx|ts|tsx)$/,
                exclude: /node_modules/, // 排除
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
         new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'start.html',// 这是bundle入口，打成bundle.js插入start.html
            title:'开始', // 替换模板字符串
            inject:'body', // body表示将<script>插入body bottom
            // publicPath:'js' , 
            chunks:['start'], //  对应entry里面的chunk
        }),
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html', 
            title:'首页',  
            inject:'body',  
            chunks:['index'], //  
        }),
        new CssMinimizerPlugin({
            parallel:true
        }),
        // new webpack.IgnorePlugin({  // 打包的时候忽略moment的语言包local文件夹
        //     resourceRegExp:/^\.\/local$/,
        //     contextRegExp:/moment$/
        // })
        // new CompressionWebpackPlugin({ //zip压缩插件
        //     filename: '[path].gz[query]',
        //     algorithm: 'gzip',
        //     test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),//匹配文件名
        //     threshold: 10240,//对10K以上的数据进行压缩
        //     minRatio: 0.8,
        //     deleteOriginalAssets: false,//是否删除源文件
        // })
    ],
    optimization:{
        minimize:true, // 压缩
        minimizer:[
            new TerserPlugin({
                parallel:true, // 并行
            })
        ]
    },
   
    // performance:{
    //     maxEntrypointSize:100000000,
    //     maxAssetSize:100000000
    // }
}

module.exports.parallelism=1;
module.exports = baseConfig;
