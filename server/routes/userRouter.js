import User from '../models/user';
import Router from 'koa-router';

export default function userRouter() {
    const router = new Router({ prefix: '/user' });

    router
        .get('/:id', async (ctx) => {})
        .get(':id/favorites', async (ctx) => {})
        .post('/signin', (ctx) => {})
        .post('/signup', async (ctx) => {
            try {
                let res = await User.save({
                    name: 'test_user',
                    email: 'mister-pie@hotmail.com',
                    password: 'password',
                    age: 12,
                    preferences: {}
                });
                console.dir('response: \n', res);
                ctx.body = 'Hello World!';
            } catch (error) {
                console.error(error);
            }
        })
        .post('/signout', (ctx) => {})
        .put('/preferences', (ctx) => {});

    return router;
}
