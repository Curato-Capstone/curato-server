import Koa from 'koa';
const app = new Koa();
import convert from 'koa-convert';


// Authentication
// --------------------------------------------------
import publicRouter from './server/routes/public';
import jwt from 'koa-jwt';
import cors from 'koa-cors';
import bearerToken from 'koa-bearer-token';
import bodyParser from 'koa-bodyparser';

if (!process.env.SESS_SECRET) {
    console.error('please set SESS_SECRET, try: \nexport SESS_SECRET=$(uuidgen)');
    process.exit(1);
}

// TODO: refactor public endpoints out of other routers
app
    .use(publicRouter().routes())
    .use(convert(cors()))
    .use(bodyParser())
    .use(convert(bearerToken()))
    .use(convert(jwt({
        secret: process.env.SESS_SECRET
    }).unless({
        path: [/^\/user\/signin/, /^\/user\/signup/]
    })));


// Routing
// --------------------------------------------------
import userRouter from './server/routes/userRouter';
import placeRouter from './server/routes/placeRouter';
import suggestionRouter from './server/routes/suggestionRouter';

app
    .use(userRouter(jwt).routes())
    .use(placeRouter(jwt).routes())
    .use(suggestionRouter(jwt).routes());


// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is listening on port', port);
});
