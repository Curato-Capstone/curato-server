import Place from '../models/place';
import Router from 'koa-router';

export default function placeRouter() {
    const router = Router({ prefix: '/places' });

    router
        .put('/save', async (ctx) => {})
        .put('/remove', async (ctx) => {});

    return router;
}
