import User from '../models/user';
import Router from 'koa-router';


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
                // TODO: use foursquare API/cache/magic to populate favorites list from ids
                ctx.body = await User.get(ctx.session.passport.user.id).getField('favorites').run();
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
            ctx.status = 204;
        })
        .put('/', async (ctx) => {
            try {
                ctx.body = await User.get(ctx.session.passport.user.id).update(ctx.request.body).run();
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
        });

    return router;
}
