import User from '../models/user';
import Router from 'koa-router';
import thinky from '../util/thinky';


export default function placeRouter() {
    const router = Router({ prefix: '/place' });
    const r = thinky.r;

    router
        // add a place to user's favorites
        .post('/favorites/add', async (ctx) => {
            try {
                await User.get(ctx.session.passport.user.id).update({
                    favorites: r.row('favorites').append(ctx.request.body.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
                ctx.status = 400;
            }
        })
        // remove a place from user's favorites
        .post('/favorites/remove', async (ctx) => {
            try {
                await User.get(ctx.session.passport.user.id).update((row) => {
                    return {
                        favorites: row('favorites').filter((item) => {
                            return item.ne(ctx.request.body.id);
                        })
                    };
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
                ctx.status = 400;
            }
        })
        // add place to user's dislike list
        .post('/dislike', async (ctx) => {
            try {
                await User.get(ctx.session.passport.user.id).update({
                    dislikes: r.row('dislikes').append(ctx.request.body.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
                ctx.status = 400;
            }
        });

    return router;
}
