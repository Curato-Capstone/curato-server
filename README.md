# Curato Web App

This is the backend for Curato.

### Installing dependencies
```bash
npm install
```

### Running
```bash
npm start
```

### Flow
```bash
npm run flow
```

Flow type checks your code, so you can find errors quickly.

If you want persist flow checking, make sure you have ```watch``` installed via brew, and run it using the command

```bash
npm run flow:watch
```

Don't commit if there are flow issues.

### Linting
```bash
npm run lint
```

Before committing any changes, be sure to do `npm run lint` and this will lint the client folder and server.js. 
Make sure to resolve any issues before committing.

If you want persist linting, make sure you have ```watch``` installed via brew, and run it using the command

```bash
npm run lint:watch
```

### Testing

```bash
npm run test
```

Write hella tests, ya feel

If you want persist testing, run it using the command

```bash
npm run test:watch
```

## User API

**_POST /user/signin_**

Function:
Authenticate user.

Request Body:
```yaml
{
    email: (String, required) user's email,
    password: (String, required) user's password
}
```

Response Body (200)
```yaml
{
    user_id: (String, required) authenticated user's id
}
```

Response (401): failed to authenticate user

***

**_POST /user/signup_**

Function:
Create account for user.

Request Body
```yaml
{
    email: (String, required) user email,
    name: (String, required) user's name,
    age: (Integer, required) user's age,
    ethnicity: (String, optional) user's ethnicity, if specified,
    preferences: {
        price: (Int, required) user's rating for importance of this category,
        culture: (Int, required),
        food: (Int, required),
        outdoors: (Int, required),
        entertainment: (Int, required),
        relaxation: (Int, required),
        shopping: (Int, required),
        sports: (Int, required)
    }
}
```

Response Body (201)
```yaml
{
    user_id: (String, required): newly created user's id
}
```

Response (400): failed to create account for user

***

**_POST /user/signout_**

Function:
Sign the current user out.

Responses:
- 204: user successfully signed out
- 400: failed to sign the user out

***

**_GET /user/:id_**

Function:
Get user data.

Parameters
- id: current user's id

Response Body (200)
```yaml
{
    id: (String, required) user id,
    email: (String, required) user email,
    name: (String, required) user's name,
    age: (Integer, required) user's age,
    ethnicity: (String, optional) user's ethnicity, if specified,
    preferences: {
        price: (Int, required) user's rating for importance of this category,
        culture: (Int, required),
        food: (Int, required),
        outdoors: (Int, required),
        entertainment: (Int, required),
        relaxation: (Int, required),
        shopping: (Int, required),
        sports: (Int, required)
    }
}
```

Response (404): user not found

***

**_GET /user/:id/favorites_**

Function:
Get user's list of favorite places.

Parameters
- id: current user's id

Response Body (200)
```yaml
[
    {
        id: (String, required) id of place/business,
        name: (String, required) name of place,
        formatted_address: (String, required) formatted address of place,
        opening_hours: {
            weekday_text: [
                (String, required) place's weekly open hours for each day in the format: "Monday: 10:00 AM \u2013 5:00 PM"
            ]
        },
        website: (String, required) places's website,
        tags: [
            (String, required) tags associated witht his place such as "mall", "movies", "hiking", or "restaurant"
        ],
        geometry: {
            location: {
                lat: (String, required) latitude,
                lng: (String, required) longitude
            }
        },
        formatted_phone_number: (String, required) formatted phone number of this place in the format (206) 123-4567,
        likes: (Int, required) total number of people who have added this place to their favorites list
    }
]
```

Response (404): user not found

***

**_PUT /user/:id/preferences_**

Function:
Change user's preferences. Only preference fields sent as part of request body will be updated.

Parameters
- id: current user's id

Request Body
```yaml
{
    preferences: {
        price: (Int, optional) user's rating for importance of this category,
        culture: (Int, optional),
        food: (Int, optional),
        outdoors: (Int, optional),
        entertainment: (Int, optional),
        relaxation: (Int, optional),
        shopping: (Int, optional),
        sports: (Int, optional)
    }
}
```

Response Body (200)
```yaml
{
    preferences: {
            price: (Int, optional) updated ratings for importance of each category,
            culture: (Int, optional),
            food: (Int, optional),
            outdoors: (Int, optional),
            entertainment: (Int, optional),
            relaxation: (Int, optional),
            shopping: (Int, optional),
            sports: (Int, optional)
        }
}
```

Response (400): failed to update user's preferences

***

## Suggestion API

**_GET /suggestions_**

Function:
Get suggestions for this user based on their preferences.

Response Body (200)
```yaml
[
    {
        id: (String, required) id of place/business,
        name: (String, required) name of place,
        formatted_address: (String, required) formatted address of place,
        opening_hours: {
            weekday_text: [
                (String, required) place's weekly open hours for each day in the format: "Monday: 10:00 AM \u2013 5:00 PM"
            ]
        },
        website: (String, required) places's website,
        tags: [
            (String, required) tags associated witht his place such as "mall", "movies", "hiking", or "restaurant"
        ],
        geometry: {
            location: {
                lat: (String, required) latitude,
                lng: (String, required) longitude
            }
        },
        formatted_phone_number: (String, required) formatted phone number of this place in the format (206) 123-4567,
        likes: (Int, required) total number of people who have added this place to their favorites list
    }
]
```

Response (400): failed to retrieve suggestions for user

***

## Places API

**_PUT /places/favorite_**

Function:
Adds a place to the user's favorites list.

Request Body
```yaml
{
    user_id: (String, required) user's id,
    place_id: (String, required) id of place to be added to user's favorites
}
```

Responses:
- 204: place successfully added to favorites list
- 400: failed to add to user's list

***

**_PUT /places/remove_**

Function:
Removes a place from the user's favorites list.

```yaml
{
    user_id: (String, required) user's id,
    place_id: (String, required) id of place to be removed from user's favorites
}
```

Responses:
- 204: place successfully removed from favorites list
- 400: failed to remove place from user's list

***

**_PUT /places/dislike_**

Function:
Dislikes a suggestion given to the user.

```yaml
{
    user_id: (String, required) user's id,
    place_id: (String, required) id of place to be added to user's disliked suggestions
}
```

Responses:
- 204: place successfully added to user's disliked suggestions
- 400: failed to dislike place for user

***

### Helpful Tools
[nodemon](nodemon.io)