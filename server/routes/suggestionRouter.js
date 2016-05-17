import Router from 'koa-router';
import request from 'superagent-bluebird-promise';


export default function suggestionRouter(jwt) {
    const router = Router({ prefix: '/suggestions' });
    const baseUrl = 'http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000';

    router
        // user user data to get suggestions
        .get('/', async (ctx) => {
            try { // magic
                const decoded = jwt.verify(ctx.request.token, process.env.SESS_SECRET)[0];
                let res = await request
                    .get(baseUrl + '/suggestions')
                    .query({
                        user_id: decoded.id,
                        q: ctx.query.q || '',
                        num_sugg: ctx.query.num_sugg || 10
                    });
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
                if (error.name === 'JsonWebTokenError') {
                    ctx.status = 401;
                }
            }
        })
        // use passed preferences object to get preferences
        .post('/', async (ctx) => {
            try {
                let body = ctx.request.body;
                if (!body.q) { body.q = ''; }
                let res = await request
                    .post(baseUrl + '/suggestions')
                    .send(body);
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
            }
        });

    return router;
}
