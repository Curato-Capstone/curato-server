import Place from '../models/place';
import Router from 'koa-router';

export default function suggestionRouter() {
    const router = Router({ prefix: '/suggestions' });

    router
        .get('/', async (ctx) => {});

    return router;
}
