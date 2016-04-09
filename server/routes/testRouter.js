export default function testRouter(router) {
    const myRouter = router();

    myRouter
        .get('/test', (ctx) => {
            ctx.body = 'Hello World!';
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
