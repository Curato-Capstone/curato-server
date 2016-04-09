export default function testRouter(router) {
    const myRouter = router();

    myRouter
        .get('/test', function (ctx, next) {
            ctx.body = 'Hello World!';
        })
        .post('/users', function (ctx, next) {
            // ...
        })
        .put('/users/:id', function (ctx, next) {
            // ...
        })
        .del('/users/:id', function (ctx, next) {
            // ...
        });

    return myRouter;
}
