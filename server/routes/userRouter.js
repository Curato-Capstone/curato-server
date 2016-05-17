import User from '../models/user';
import Email from '../models/email';
import Router from 'koa-router';
import thinky from '../util/thinky';
import request from 'superagent-bluebird-promise';


export default function userRouter(jwt) {
    const router = new Router({ prefix: '/user' });

    router
        // return user data
        .get('/', async (ctx) => {
            try {
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                let user = await User.get(decoded.id).run();
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
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                let user = await User.get(decoded.id).run();
                let res = await request
                    .post('http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000/business-info')
                    .send({ favorites: user.favorites });
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
            }
        })
        // authenticate user
        .post('/signin', async (ctx) => {
            try {
                // TODO: add password encryption

                const user = await User.filter((item) => {
                    return item('email').eq(ctx.request.body.email)
                        .and(item('password').eq(ctx.request.body.password));
                }).run();

                if (user) {
                    const token = jwt.sign(user, process.env.SESS_SECRET);
                    delete user.password;
                    delete user.dislikes;
                    ctx.body = user;
                    ctx.set('Authorization', token);
                    ctx.status = 200;
                } else {
                    ctx.status = 404;
                    ctx.body = 'User not found';
                }
            } catch (error) {
                console.error(error);
            }
        })
        .post('/signup', async (ctx) => {
            try {
                const body = ctx.request.body;
                const exists = await thinky.r.table('emails').get(body.email).run();
                if (exists) {
                    // enforce email uniqueness
                    ctx.status = 401;
                    ctx.body = 'User with specified email already exists';
                } else {
                    if (!body.favorites) { body.favorites = []; }
                    if (!body.dislikes) { body.dislikes = []; }
                    await Email.save({ email: body.email });
                    let user = await User.save(body); // save user

                    const token = jwt.sign(user, process.env.SESS_SECRET);
                    delete user.password;
                    delete user.dislikes;
                    ctx.body = user;
                    ctx.set('Authorization', token);
                    ctx.status = 201;
                }
            } catch (error) {
                console.error(error);
            }
        })
        // sign out user
        .post('/signout', (ctx) => {
            // ctx.logout();
            // ctx.session = null;
            // TODO: figure out how to invalidate a jwt?
            ctx.status = 204;
        })
        // update user
        .put('/', async (ctx) => {
            try {
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                let user = await User.get(decoded.id).update(ctx.request.body).run();
                delete user.password;
                delete user.dislikes;
                ctx.body = user;
            } catch (error) {
                console.error(error);
                if (error.name === 'DocumentNotFoundError') {
                    ctx.status = 404;
                    ctx.body = 'User not found.';
                } else {
                    ctx.body = 'Failed to update user.';
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
            }
        });

    return router;
}
