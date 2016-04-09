import Koa from 'koa';
const app = new Koa();

// Routing
// --------------------------------------------------
import router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import testRouter from './server/routes/testRouter'

app
    .use(bodyParser())
    .use(testRouter(router).routes())

app.use((ctx) => {
    ctx.body = 'Hello World';
});

// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is listening on port', port);
});
