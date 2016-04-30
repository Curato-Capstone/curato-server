import Koa from 'koa';
const app = new Koa();
import convert from 'koa-convert';


// Authentication
// --------------------------------------------------
import passport from './server/util/passport';
import session from 'koa-session';

if (!process.env.SIG_SECRET) {
    console.error('please set SIG_SECRET, try: \nexport SIG_SECRET=$(uuidgen)');
    process.exit(1);
}
app.keys = [process.env.SIG_SECRET];
app.use(convert(session(app)));
app.use(passport.initialize());
app.use(passport.session());


// Routing
// --------------------------------------------------
// import router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from 'koa-cors';

import userRouter from './server/routes/userRouter';
import placeRouter from './server/routes/placeRouter';
import suggestionRouter from './server/routes/suggestionRouter';

app
    .use(bodyParser())
    .use(convert(cors()))
    .use(userRouter(passport).routes())
    .use(placeRouter().routes())
    .use(suggestionRouter().routes());


// Start Server
// --------------------------------------------------
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is listening on port', port);
});
