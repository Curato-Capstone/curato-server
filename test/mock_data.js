// test user put into database before each test and removed after each test
export const testUser = {
    email: 'mister-pie@hotmail.com',
    name: 'Brandon Barron',
    password: 'password',
    age: 12,
    favorites: [],
    dislikes: [],
    preferences: {
        culture: 1,
        entertainment: 4,
        food: 5,
        outdoors: 4,
        price: 5,
        relaxation: 3,
        shopping: 2,
        sports: 4
    }
};

// used for creating a new user in a test
export const newUser = {
    email: 'new@user.com',
    name: 'new user',
    password: '12345',
    age: 20,
    preferences: testUser.preferences
};