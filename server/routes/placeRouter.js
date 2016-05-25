import User from '../models/user';
import Router from 'koa-router';
import thinky from '../util/thinky';
import request from 'superagent-bluebird-promise';


export default function placeRouter(jwt) {
    const router = Router({ prefix: '/place' });
    const r = thinky.r;

    function log(err, req) {
        if (err) {
            console.log('\n-----------------------error-----------------------');
            console.log(err);
        } else {
            console.log('\n-----------------------request-----------------------');
            console.log(req);
        }
    }

    router
        // add a place to user's favorites
        .post('/favorites/add', async (ctx) => {
            log(null, ctx.request);
            try {
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                await User.get(decoded.id).update({
                    favorites: r.row('favorites').append(ctx.request.body.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                log(error);
                ctx.body = error;
            }
        })
        // remove a place from user's favorites
        .post('/favorites/remove', async (ctx) => {
            log(null, ctx.request);
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
                log(error);
                ctx.body = error;
            }
        })
        // add place to user's dislike list
        .post('/dislike', async (ctx) => {
            log(null, ctx.request);
            try {
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                await User.get(decoded.id).update({
                    dislikes: r.row('dislikes').append(ctx.request.body.id)
                }).run();
                ctx.status = 204;
            } catch (error) {
                log(error);
                ctx.body = error;
            }
        });

    return router;
}
