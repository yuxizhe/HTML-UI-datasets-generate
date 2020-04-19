const Koa = require('koa');
const path = require('path');
const router = require('koa-router')();
const fs = require('fs');
const staticCache = require('koa-static-cache');
const http = require('http');
const proxyMiddleware = require('http-proxy-middleware');
const k2c = require('koa2-connect');

const app = new Koa();
const server = http.createServer(app.callback());

app.use(staticCache('build'), {
  maxAge: 365 * 24 * 60 * 60,
  dynamic: false,
  gzip: true,
});

if (process.env.NODE_ENV !== 'production' && !process.env.NODE_DEBUG) {
  // nodemon 与 wepack-dev 结合。实现改动node只nodemon重启不重新打包，改动src能热更新
  app.use(k2c(proxyMiddleware('/', {
    target: 'http://localhost:3000/',
    changeOrigin: true,
  })));
} else {
  // react 路由
  const reactHtml = fs.readFileSync(path.resolve(__dirname, './build',
    'index.html'));
  router.get('*', (ctx) => {
    ctx.type = 'html';
    ctx.body = reactHtml;
  });
  // add router middleware:
  app.use(router.routes());
}

const port = '7878';
server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.on('listening', () => {
  console.log('Listening on port: %d', port);
});
