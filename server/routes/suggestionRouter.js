import Router from 'koa-router';
import request from 'superagent-bluebird-promise';


export default function suggestionRouter(jwt) {
    const router = Router({ prefix: '/suggestions' });
    const baseUrl = 'http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000';

    router
        // user user data to get suggestions
        .get('/', async (ctx) => {
            console.log(ctx.request);
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
                ctx.body = error;
                if (error.name === 'JsonWebTokenError') {
                    ctx.status = 401;
                }
            }
        });

    return router;
}
