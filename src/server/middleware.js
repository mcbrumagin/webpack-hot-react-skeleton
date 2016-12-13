/* @flow */
'use strict'

import webpack from 'webpack'
import webpackConfig from '../../webpack.config'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

const compiler = webpack(webpackConfig)
const devMiddlware = webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath
})
const hotMiddleware = webpackHotMiddleware(compiler)

export { devMiddlware, hotMiddleware }
