import Place from '../models/place';
import Router from 'koa-router';

export default function placeRouter() {
    const router = Router({ prefix: '/place' });

    router
        .put('/save', async (ctx) => {})
        .put('/remove', async (ctx) => {});

    return router;
}
