const {createProxyMiddleware} = require('http-proxy-middleware');

if (process.env.NODE_ENV === 'porduction') {
  module.exports = function (app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://18.218.148.138:5000',
        changeOrigin: true,
      })
    );
  };
} else {
  module.exports = function (app) {
    app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
    );
  };
}
