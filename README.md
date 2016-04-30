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
    id: (String, required) user id,
    email: (String, required) user email,
    name: (String, required) user's name,
    age: (Integer, required) user's age,
    gender: (String, optional) user's specified gender, if provided,
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
    password: (String, required) user's password,
    age: (Integer, required) user's age,
    gender: (String, optional) user's specified gender, if provided,
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
    id: (String, required) user id,
    email: (String, required) user email,
    name: (String, required) user's name,
    age: (Integer, required) user's age,
    gender: (String, optional) user's specified gender, if provided,
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

Response (400): failed to create account for user

***

**_POST /user/signout_**

Function:
Sign the current user out.

Responses:
- 204: user successfully signed out
- 400: failed to sign the user out

***

**_GET /user/_**

Function:
Get user data.

Response Body (200)
```yaml
{
    id: (String, required) user id,
    email: (String, required) user email,
    name: (String, required) user's name,
    age: (Integer, required) user's age,
    gender: (String, optional) user's specified gender, if provided,
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

**_GET /user/favorites_**

Function:
Get user's list of favorite places.

Response Body (200)
```yaml
[
    {
        "allowMenuUrlEdit": (Boolean), not relevant to user,
        "categories": (Array of JSON objects) some stuff in them that the client doesn't need to see
         "contact": {
            "formattedPhone": (String) formatted like so: "(xxx) xxx-xxxx",
            "phone": (String) another phone number format: "xxxxxxxxxxx"
         },
         "hereNow": (JSON object) if we used Foursquare accounts this would matter,
         "id": (String) venue id,
         "location": {
            "address": (String) street address,
            "cc": (String) country code,
            "city": (String) city name,
            "country": (String) country name,
            "distance": (Int, probably) distance from given coords in meters,
            "formattedAddress": (Array of strings) streed address, city/state/zip, country,
            "lat": (Float) lat,
            "lng": (Float) long,
            "postalCode": (String) zipcode,
            "state": (String) state name abbreviation
         },
         "name": (String) name of business/point of interest,
         "referralId": (String) meh,
         "specials": (Object) also meh,
         "stats": (Object) some info about people who have left tips or checked in here,
         "url": (String) url for the place,
         "venueChains": (Array of strings) venue id's for other stores in the chain,
         "verified": (Boolean) are you real or are you fake?
    }
]
```

Response (404): user not found

***

**_PUT /user/_**

Function:
Change user's info. Only fields/objects sent as part of request body will be updated.

Request Body
```yaml
{
    email: (String, required) user email,
    name: (String, required) user's name,
    age: (Integer, required) user's age,
    gender: (String, optional) user's specified gender, if provided,
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

Response Body (200)
```yaml
{
    id: (String, required) user id,
    email: (String, required) user email,
    name: (String, required) user's name,
    age: (Integer, required) user's age,
    gender: (String, optional) user's specified gender, if provided,
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

Response (400): failed to update user's preferences

***

## Suggestion API

**_GET /suggestions/:id_**

Function:
Get suggestions for this user based on their preferences.

Parameters
- id: the user's id

Response Body (200)
```yaml
[
    {
        "allowMenuUrlEdit": (Boolean), not relevant to user,
        "categories": (Array of JSON objects) some stuff in them that the client doesn't need to see
         "contact": {
            "formattedPhone": (String) formatted like so: "(xxx) xxx-xxxx",
            "phone": (String) another phone number format: "xxxxxxxxxxx"
         },
         "hereNow": (JSON object) if we used Foursquare accounts this would matter,
         "id": (String) venue id,
         "location": {
            "address": (String) street address,
            "cc": (String) country code,
            "city": (String) city name,
            "country": (String) country name,
            "distance": (Int, probably) distance from given coords in meters,
            "formattedAddress": (Array of strings) streed address, city/state/zip, country,
            "lat": (Float) lat,
            "lng": (Float) long,
            "postalCode": (String) zipcode,
            "state": (String) state name abbreviation
         },
         "name": (String) name of business/point of interest,
         "referralId": (String) meh,
         "specials": (Object) also meh,
         "stats": (Object) some info about people who have left tips or checked in here,
         "url": (String) url for the place,
         "venueChains": (Array of strings) venue id's for other stores in the chain,
         "verified": (Boolean) are you real or are you fake?
    }
]
```

Response (400): failed to retrieve suggestions for user

***

## Places API

**_POST /place/favorites/add_**

Function:
Adds a place to the user's favorites list.

Request Body
```yaml
{
    id: (String, required) id of place to be added to user's favorites
}
```

Responses:
- 204: place successfully added to favorites list
- 400: failed to add to user's list

***

**_POST /place/favorites/remove_**

Function:
Removes a place from the user's favorites list.

```yaml
{
    id: (String, required) id of place to be removed from user's favorites list
}
```

Responses:
- 204: place successfully removed from favorites list
- 400: failed to remove place from user's list

***

**_POST /place/dislike_**

Function:
Dislikes a suggestion given to the user.

```yaml
{
    id: (String, required) id of place to be added to user's dislikes
}
```

Responses:
- 204: place successfully added to user's disliked suggestions
- 400: failed to dislike place for user

***

### Helpful Tools
[nodemon](nodemon.io)