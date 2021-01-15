const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        ['!/oauth2/**'],
        createProxyMiddleware({
            target: 'https://api.jyworld.tk',
            changeOrigin: true,
        })
    );
};
