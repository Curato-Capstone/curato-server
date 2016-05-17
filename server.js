import Koa from 'koa';
const app = new Koa();
import convert from 'koa-convert';


// Authentication
// --------------------------------------------------
import jwt from 'koa-jwt';
import bearerToken from 'koa-bearer-token';
import bodyParser from 'koa-bodyparser';

if (!process.env.SESS_SECRET) {
    console.error('please set SESS_SECRET, try: \nexport SESS_SECRET=$(uuidgen)');
    process.exit(1);
}

// TODO: make POST /suggestions public
app
    .use(bodyParser())
    .use(convert(bearerToken()))
    .use(convert(jwt({
        secret: process.env.SESS_SECRET
    }).unless({
        path: [/^\/user\/email/, /^\/user\/signin/, /^\/user\/signup/, /^\/suggestions/]
    })));


// Routing
// --------------------------------------------------
import cors from 'koa-cors';

import userRouter from './server/routes/userRouter';
import placeRouter from './server/routes/placeRouter';
import suggestionRouter from './server/routes/suggestionRouter';

app
    .use(convert(cors()))
    .use(userRouter(jwt).routes())
    .use(placeRouter(jwt).routes())
    .use(suggestionRouter(jwt).routes());


// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is listening on port', port);
});
