import Router from 'koa-router';
import thinky from '../util/thinky';
import request from 'superagent-bluebird-promise';


export default function publicRouter() {
    const router = Router();
    const baseUrl = 'http://ec2-52-38-203-54.us-west-2.compute.amazonaws.com:5000';

    router
        // check if email already exists in db
        .get('/user/email', async (ctx) => {
            console.log(ctx.request);
            try {
                let email = await thinky.r.table('emails').get(ctx.query.email).run();
                ctx.body = (email) ? { exists: true } : { exists: false };
            } catch (error) {
                console.error(error);
                ctx.body = error;
            }
        })
        // use passed preferences object to get preferences
        .post('/suggestions', async (ctx) => {
            console.log(ctx.request);
            try {
                let body = ctx.request.body;
                if (!body.q) { body.q = ''; }
                let res = await request
                    .post(baseUrl + '/suggestions')
                    .send(body);
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
                if (error.name === "SuperagentPromiseError") {
                    ctx.status = 400;
                }
                ctx.body = error;
            }
        })
        // get a place by id
        .get('/place/:id', async (ctx) => {
            console.log(ctx.request);
            try {
                let res = await request.get(baseUrl + '/place/' + ctx.params.id);
                ctx.body = res.body;
            } catch (error) {
                console.error(error);
                ctx.body = error;
            }
        });

    return router;
}
