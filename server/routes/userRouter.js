import User from '../models/user';
import Router from 'koa-router';
import thinky from '../util/thinky';
import request from 'superagent-bluebird-promise';


export default function userRouter(passport) {
    const router = new Router({ prefix: '/user' });

    router
        .get('/', async (ctx) => {
            try {
                ctx.body = await User.get(ctx.session.passport.user.id).run();
            } catch (error) {
                console.error(error);
            }
        })
        .get('/favorites', async (ctx) => {
            try {
                let user = await User.get(ctx.session.passport.user.id).run();
                let res = await request
                    .post('http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000/business-info')
                    .send({ favorites: user.favorites });
                console.log(res.body);
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
            }
        })
        .post('/signin', passport.authenticate('local-signin'), async (ctx) => {
            ctx.body = ctx.session.passport.user;
        })
        .post('/signup', passport.authenticate('local-signup'), async (ctx) => {
            ctx.body = ctx.session.passport.user;
        })
        .post('/signout', (ctx) => {
            // TODO: sign em out
            ctx.status = 204;
        })
        .put('/', async (ctx) => {
            try {
                ctx.body = await User
                    .get(ctx.session.passport.user.id)
                    .update(ctx.request.body).run();
            } catch (error) {
                console.error(error);
                if (error.name === 'DocumentNotFoundError') {
                    ctx.status = 404;
                    ctx.body = 'User not found.';
                } else {
                    ctx.status = 400;
                    ctx.body = 'Failed to update user preferences.';
                }
            }
        })
        .get('/email', async (ctx) => {
            try {
                let email = await thinky.r.table('emails').get(ctx.query.email).run();
                ctx.body = (email) ? { exists: true } : { exists: false };
            } catch (error) {
                console.error(error);
                ctx.status = 400;
            }
        });

    return router;
}
