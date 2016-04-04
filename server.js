import Koa from 'koa';
const app = new Koa();

// Routing
// --------------------------------------------------
import router from 'koa-router';
import bodyParser from 'koa-bodyparser';

const myRouter = router();

app
    .use(bodyParser())
    .use(myRouter.routes())
    .use(myRouter.allowedMethods());


// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is listening on port', port);
});
