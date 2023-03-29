const {mergeWithCustomize,unique} = require('webpack-merge')
const baseConfig = require("./webpack.config")

const prodConfig= {
    mode:'production', // 自动启用scope Hoisting
    externals:{
        "react":'React',
        "react-dom": 'ReactDOM'
    },
}

module.exports = mergeWithCustomize({  // 定制化合并
  customizeArray: unique(
    'plugins',
    ['MiniCssExtractPlugin'],
    (plugin)=>plugin.constructor && plugin.constructor.name, )
})(
    baseConfig,
    prodConfig,
)