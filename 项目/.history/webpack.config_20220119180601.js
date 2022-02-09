{
    ...
    module: {
      rules: {
        ...
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lint: true
              }
            }
          ]
        },
        ...
      }
    }
    ...
  }