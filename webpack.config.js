module.exports = {
  mode:'development',
  entry:__dirname + '/client/src/index.jsx',
  output:{
    filename: 'bundle.js',
    path:__dirname + '/client/dist',
  },
  module:{
    rules:[{
      test:[/\.jsx$/],
      exclude:/node_modules/,
      use:{
        loader:'babel-loader',
        // options:{
        //   presets:['@babel/preset-env', '@babel/preset-react']
        // }
      }
    }

    ]
  }
}