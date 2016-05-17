import User from '../models/user';
import Router from 'koa-router';
import thinky from '../util/thinky';


export default function placeRouter(jwt) {
    const router = Router({ prefix: '/place' });
    const r = thinky.r;

    router
        // add a place to user's favorites
        .post('/favorites/add', async (ctx) => {
            try {
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                await User.get(decoded.id).update({
                    favorites: r.row('favorites').append(ctx.request.body.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
            }
        })
        // remove a place from user's favorites
        .post('/favorites/remove', async (ctx) => {
            try {
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                await User.get(decoded.id).update((row) => {
                    return {
                        favorites: row('favorites').filter((item) => {
                            return item.ne(ctx.request.body.id);
                        })
                    };
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
            }
        })
        // add place to user's dislike list
        .post('/dislike', async (ctx) => {
            try {
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                await User.get(decoded.id).update({
                    dislikes: r.row('dislikes').append(ctx.request.body.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                console.error(error);
            }
        });

    return router;
}
