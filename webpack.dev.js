const {mergeWithCustomize,unique} = require('webpack-merge')
const baseConfig = require("./webpack.config")
const  ReactRefreshWebpackPlugin= require('@pmmmwh/react-refresh-webpack-plugin'); // 更快的热更新
const { webpack } = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 加速
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 计算各个bundle打包的时间
const smp = new SpeedMeasurePlugin();

const devConfig= {
    mode:'development',
    devtool:'source-map',
    plugins:[
        new ReactRefreshWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        // new webpack.optimize.ModuleConcatenationPlugin(), // dev环境需要手动开启scope hoisting
    ]
}

module.exports = smp.wrap(mergeWithCustomize({  // 定制化合并
  customizeArray: unique(
    'plugins',
    ['MiniCssExtractPlugin'],
    (plugin)=>plugin.constructor && plugin.constructor.name, )
})(
    baseConfig,
    devConfig,
))

// module.exports = {
//     ...baseConfig,
//     ...devConfig
// }