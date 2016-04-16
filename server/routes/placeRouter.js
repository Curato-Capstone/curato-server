import Place from '../models/place';
import Router from 'koa-router';

export default function placeRouter() {
    const router = Router({ prefix: '/places' });

    router
        .put('/favorite', async (ctx) => {})
        .put('/remove', async (ctx) => {})
        .put('/dislike', async (ctx) => {});

    return router;
}
