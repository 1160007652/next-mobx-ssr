const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const compression = require('compression');
const koaConnect = require('koa-connect');

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = new Koa()
    const router = new Router()

    router.get('/p/:id', async ctx => {
        const {id} = ctx.params
        await app.render(ctx.req, ctx.res, '/post', {id})
        ctx.respond = false
    })

    router.get('*', async ctx => {
      await handle(ctx.req, ctx.res)
      ctx.respond = false
    })

    // 开启Gzip压缩
    // server.use(koaConnect(compression())); 

    server.use(async (ctx, next) => {
      ctx.res.statusCode = 200
      await next()
    })

    server.use(router.routes())
    server.listen(port, () => {
      console.log(`> Ready on http://localhost:${port}`)
    })
  })