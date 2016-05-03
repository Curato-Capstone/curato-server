import User from '../models/user';
import Router from 'koa-router';
import thinky from '../util/thinky';
import request from 'superagent-bluebird-promise';


export default function userRouter(passport) {
    const router = new Router({ prefix: '/user' });

    router
        // return user data
        .get('/', async (ctx) => {
            try {
                let user = await User.get(ctx.session.passport.user.id).run();
                delete user.password;
                delete user.dislikes;
                ctx.body = user;
            } catch (error) {
                console.error(error);
            }
        })
        // return list of places in user's favorites
        .get('/favorites', async (ctx) => {
            try {
                let user = await User.get(ctx.session.passport.user.id).run();
                let res = await request
                    .post('http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000/business-info')
                    .send({ favorites: user.favorites });
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
            }
        })
        // authenticate user
        .post('/signin', passport.authenticate('local-signin'), async (ctx) => {
            let user = ctx.session.passport.user;
            delete user.password;
            delete user.dislikes;
            ctx.body = user;
        })
        // create user account in db & authenticate
        .post('/signup', passport.authenticate('local-signup'), async (ctx) => {
            let user = ctx.session.passport.user;
            delete user.password;
            delete user.dislikes;
            ctx.body = user;
        })
        // sign out user
        .post('/signout', (ctx) => {
            ctx.logout();
            ctx.status = 204;
        })
        // update user
        .put('/', async (ctx) => {
            try {
                let user = await User
                    .get(ctx.session.passport.user.id)
                    .update(ctx.request.body).run();
                delete user.password;
                delete user.dislikes;
                ctx.body = user;
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
        // check if email already exists in db
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
