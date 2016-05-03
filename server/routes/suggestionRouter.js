import Router from 'koa-router';
import request from 'superagent-bluebird-promise';


export default function suggestionRouter() {
    const router = Router({ prefix: '/suggestions' });

    router
        .get('/', async (ctx) => {
            // magic
            let res = await request
                .get('http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000/suggestions')
                .query({
                    user_id: ctx.session.passport.user.id,
                    q: ctx.query.q || '',
                    num_sugg: ctx.query.num_sugg || 10
                });
            ctx.body = res.body;
        });

    return router;
}
