import User from '../models/user';
import Router from 'koa-router';
import thinky from '../util/thinky';


export default function placeRouter() {
    const router = Router({ prefix: '/place' });
    const r = thinky.r;

    router
        .put('/:id/favorite', async (ctx) => {
            try {
                await User.get(ctx.request.body.userId).update({
                    favorites: r.row('favorites').append(ctx.params.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
                ctx.status = 400;
            }
        })
        .put('/:id/remove', async (ctx) => {
            try {
                await User.get(ctx.request.body.userId).update((row) => {
                    return {
                        favorites: row('favorites').filter((item) => {
                            return item.ne(ctx.params.id);
                        })
                    };
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
                ctx.status = 400;
            }
        })
        .put('/:id/dislike', async (ctx) => {
            try {
                await User.get(ctx.request.body.userId).update({
                    dislikes: r.row('dislikes').append(ctx.params.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
                ctx.status = 400;
            }
        });

    return router;
}
