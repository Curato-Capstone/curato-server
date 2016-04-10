import Koa from 'koa';
const app = new Koa();


// Routing
// --------------------------------------------------
// import router from 'koa-router';
import bodyParser from 'koa-bodyparser';

import userRouter from './server/routes/userRouter';
import placeRouter from './server/routes/placeRouter';
import suggestionRouter from './server/routes/suggestionRouter';

app
    .use(bodyParser())
    .use(userRouter().routes())
    .use(placeRouter().routes())
    .use(suggestionRouter().routes());

app.use((ctx) => {
    ctx.body = 'Hello World';
});


// Models
// --------------------------------------------------
import User from './server/models/user';


// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is listening on port', port);
});
