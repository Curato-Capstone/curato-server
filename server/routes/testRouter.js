import User from '../models/user'

export default function testRouter(router) {
    const myRouter = router();

    myRouter
        .get('/test', async (ctx) => {
            try {
                await User.save({
                    name: "Jessie",
                    email: "555-1234" // <-- Not an e-mail address
                })
                ctx.body = 'Hello World!';
            } catch(error) {
                console.log(error)
            }
        })
        .post('/users', (ctx) => {
            // ...
        })
        .put('/users/:id', (ctx) => {
            // ...
        })
        .del('/users/:id', (ctx) => {
            // ...
        });

    return myRouter;
}
