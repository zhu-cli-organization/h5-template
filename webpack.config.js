module.exports={
    // entry:'./src/index.ts', //SPA
    output:{
        path:path.resolve(__dirname,'dist'), // 文件输出地址，必须是绝对路径
        filename:'[name].[contenthash].js', // bundle的名字,bundle要插入html文件中哦
    },
    page:{ // MPA
        'start':{
            entry: path.resolve('./src/start/index.tsx'), // 这是bundle入口，打成bundle.js插入start.html
            htmlTemplate: path.resolve('./src/index.html'),
            filename:'start.html', 
            title:'开始' // 模板字符串
        }
    },
    module:{
        rules:[
            {
                test:/\.(m?js|jsx|ts|tsx)$/,
                use:{
                    loader:'swc-loader',
                    options:{}
                }
            }
        ]
    }
}