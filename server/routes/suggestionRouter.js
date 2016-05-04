import Router from 'koa-router';
import request from 'superagent-bluebird-promise';


export default function suggestionRouter() {
    const router = Router({ prefix: '/suggestions' });

    router
        // user user data to get suggestions
        .get('/', async (ctx) => {
            try { // magic
                let res = await request
                    .get('http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000/suggestions')
                    .query({
                        user_id: ctx.session.passport.user.id,
                        q: ctx.query.q || '',
                        num_sugg: ctx.query.num_sugg || 10
                    });
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
            }
        })
        // use passed preferences object to get preferences
        .post('/', async (ctx) => {
            try {
                let res = await request
                    .post('http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000/suggestions')
                    .send(ctx.request.body.preferences);
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
            }
        });

    return router;
}
