import Router from 'koa-router';


// mock objects

const mockSuggestions = [{
    id: '1',
    name: 'A Park',
    formatted_address: '1234 fake address',
    opening_hours: {
        weekday_text: [
            'Monday: 10:00 AM \u2013 5:00 PM',
            'Tuesday: 10:00 AM \u2013 5:00 PM',
            'Wednesday: 10:00 AM \u2013 5:00 PM',
            'Thursday: 10:00 AM \u2013 5:00 PM',
            'Friday: 10:00 AM \u2013 5:00 PM',
            'Saturday: 10:00 AM \u2013 5:00 PM',
            'Sunday: 10:00 AM \u2013 5:00 PM'
        ]
    },
    website: 'www.afakepark.com',
    tags: ['fake', 'waste of time'],
    geometry: {
        location: {
            lat: '47.6214824',
            lng: '-122.3481245'
        }
    },
    formatted_phone_number: '(206) 123-4567',
    likes: 1
},
    {
        id: '2',
        name: 'Chuck E. Cheese\'s',
        formatted_address: '12345 fake address',
        opening_hours: {
            weekday_text: [
                'Monday: 10:00 AM \u2013 5:00 PM',
                'Tuesday: 10:00 AM \u2013 5:00 PM',
                'Wednesday: 10:00 AM \u2013 5:00 PM',
                'Thursday: 10:00 AM \u2013 5:00 PM',
                'Friday: 10:00 AM \u2013 5:00 PM',
                'Saturday: 10:00 AM \u2013 5:00 PM',
                'Sunday: 10:00 AM \u2013 5:00 PM'
            ]
        },
        website: 'www.chuckecheese.com',
        tags: ['fake', 'games', 'food'],
        geometry: {
            location: {
                lat: '47.6214821',
                lng: '-122.3481241'
            }
        },
        formatted_phone_number: '(206) 123-4567',
        likes: 999999
    },
    {
        id: '3',
        name: 'Fake Theater',
        formatted_address: '12346 fake address',
        opening_hours: {
            weekday_text: [
                'Monday: 10:00 AM \u2013 5:00 PM',
                'Tuesday: 10:00 AM \u2013 5:00 PM',
                'Wednesday: 10:00 AM \u2013 5:00 PM',
                'Thursday: 10:00 AM \u2013 5:00 PM',
                'Friday: 10:00 AM \u2013 5:00 PM',
                'Saturday: 10:00 AM \u2013 5:00 PM',
                'Sunday: 10:00 AM \u2013 5:00 PM'
            ]
        },
        website: 'www.afaketheater.com',
        tags: ['movies'],
        geometry: {
            location: {
                lat: '47.6214829',
                lng: '-122.3481249'
            }
        },
        formatted_phone_number: '(206) 123-4567',
        likes: 123
    }];

export default function suggestionRouter() {
    const router = Router({ prefix: '/suggestions' });

    router
        .get('/:id', async (ctx) => {
            // TODO: magic
            ctx.status = 200;
            ctx.body = mockSuggestions;
        });

    return router;
}
