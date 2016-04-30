import User from '../models/user';
import Router from 'koa-router';


export default function userRouter(passport) {
    const router = new Router({ prefix: '/user' });

    router
        .get('/:id', async (ctx) => {
            try {
                ctx.body = await User.get(ctx.params.id).run();
            } catch (error) {
                console.error(error);
            }
        })
        .get('/:id/favorites', async (ctx) => {
            try {
                // TODO: use foursquare API/cache/magic to populate favorites list from ids
                ctx.body = await User.get(ctx.params.id).getField('favorites').run();
            } catch (error) {
                console.error(error);
            }
        })
        .post('/signin',
            passport.authenticate('local-signin', function *(err, user, info) {
                if (err) {
                    console.error(err);
                }
                if (!user) {
                    console.error('user not found');
                }
                console.log(info);
            }),
            async (ctx) => {
            console.log('\n\nhere!!!!!!\n');
            ctx.body = 'signed in successfully. user id: ' + ctx.request.user.id;

            //try {
            //    ctx.body = await User.filter((user) => {
            //        return user('email').eq(ctx.request.body.email);
            //    }).run();
            //    // after making email a secondary index:
            //    // ctx.body = await User.getAll(ctx.request.body.email, index='email').run();
            //    // TODO: validate password
            //} catch (error) {
            //    console.error(error);
            //    ctx.status = 401;
            //    ctx.body = 'Failed to authenticate user.';
            //}
        })
        .post('/signup', passport.authenticate('local-signup'), async (ctx) => {
            console.log('\n\nhereeeee\n');
            ctx.body = 'you made it';

            //try {
            //    // TODO: validate request body, implement unique email enforcement (do in local-signup handler?)
            //    // add empty arrays for favorites and dislikes if the fields don't exist
            //    ctx.body = await User.save(ctx.request.body);
            //    ctx.status = 201;
            //} catch (error) {
            //    console.error(error);
            //    ctx.status = 400;
            //    ctx.body = 'Failed to create account for user.';
            //}
        })
        .post('/signout', (ctx) => {
            ctx.status = 204;
        })
        .put('/:id/preferences', async (ctx) => {
            try {
                // update user preferences
                // TODO: validate request body?
                ctx.body = await User.get(ctx.params.id).update(ctx.request.body).run();
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
