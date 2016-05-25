import { expect } from 'chai';
import request from 'superagent-bluebird-promise';
import { testUser, newUser } from './mock_data';
import User from '../server/models/user';


describe('User API', () => {

    const baseUrl = 'localhost:8000/user';
    let testUserId = '';

    // removes the specified user from the database
    function cleanUser(id) {
        User.get(id).then((user) => {
            user.delete((result) => {
                console.log('cleaned user with id: ' + id);
            });
        }).error((err) => {
            console.error(err);
            process.exit(1);
        });
        //request.del(baseUrl + '/' + id).then((res) => {
        //    console.log('cleaned user with id: ' + id);
        //}, (err) => {
        //    console.error(err);
        //    process.exit(1);
        //});

    }

    // add test user to database before each test
    beforeEach(() => {
        User
            .save(testUser)
            .then((result) => {
                testUserId = result.id;
                console.log('user created with id: ' + testUserId);
            })
            .error((err) => {
                console.error(err);
                process.exit(1);
            });
        //request
        //    .post(baseUrl + '/signup')
        //    .send(testUser)
        //    .then((res) => {
        //        // TODO: investigate
        //        // users are being created in db, but nothing in here is ever being called, so
        //        // database is not cleaned after each test because no id is stored
        //        //
        //        // the request.end() functions are not being call here or in cleanUser
        //        testUserId = res.body.id;
        //        console.log('user created with id: ' + testUserId);
        //    }, (err) => {
        //        console.error(err);
        //        process.exit(1);
        //    });
    });

    // remove test user from database after each test
    afterEach(() => { cleanUser(testUserId) });


    it('should return the test user', () => {
        request.get(baseUrl + '/' + testUserId).end((err, res) => {
            expect(res.statusCode).to.equal(200);

            // verify user in response body contains the same data
            expect(res.body.email).to.equal(testUser.email);
            expect(res.body.name).to.equal(testUser.name);
            expect(res.body.age).to.equal(testUser.age);
            expect(res.body.preferences).to.equal(testUser.preferences);
            expect(res.body.favorites).to.equal(testUser.favorites);
            expect(res.body.dislikes).to.equal(testUser.dislikes);
        });
    });

    //it('should return the test user\'s favorites list', () => {
    //    request.get(baseUrl + '/' + testUserId + '/favorites').end((err, res) => {
    //        expect(res.statusCode).to.equal(200);
    //        expect(res.body).to.equal(testUser.favorites);
    //    });
    //});
    //
    //it('should return 200 after authenticating user on sign in', () => {
    //    request
    //        .post(baseUrl + '/signin')
    //        .send({ email: 'mister-pie@hotmail.com', password: 'password' })
    //        .end((err, res) => {
    //            expect(res.statusCode).to.equal(200);
    //        });
    //});
    //
    //it('should return 201 after creating new user', () => {
    //    request
    //        .post(baseUrl + '/signup')
    //        .send(newUser)
    //        .end((err, res) => {
    //            expect(res.statusCode).to.equal(201);
    //
    //            // verify user in response body contains same data
    //            expect(res.body.email).to.equal(newUser.email);
    //            expect(res.body.name).to.equal(newUser.name);
    //            expect(res.body.age).to.equal(newUser.age);
    //            expect(res.body.preferences).to.equal(newUser.preferences);
    //            expect(res.body.favorites).to.equal([]);
    //            expect(res.body.dislikes).to.equal([]);
    //
    //            // clean newly added user from database
    //            cleanUser(res.body.id);
    //        });
    //});
    //
    //it('should update the user\'s preferences', () => {
    //    request
    //        .put(baseUrl + '/' + testUserId + '/preferences')
    //        .send({ culture: 5 })
    //        .end((err, res) => {
    //            expect(res.statusCode).to.equal(200);
    //
    //            // verify only culture value was updated
    //            expect(res.body.preferences.culture).to.equal(5);
    //            expect(res.body.preferences.entertainment).to.equal(testUser.preferences.entertainment);
    //            expect(res.body.preferences.food).to.equal(testUser.preferences.food);
    //            expect(res.body.preferences.outdoors).to.equal(testUser.preferences.outdoors);
    //            expect(res.body.preferences.price).to.equal(testUser.preferences.price);
    //            expect(res.body.preferences.relaxation).to.equal(testUser.preferences.relaxation);
    //            expect(res.body.preferences.shopping).to.equal(testUser.preferences.shopping);
    //            expect(res.body.preferences.sports).to.equal(testUser.preferences.sports);
    //        });
    //});

});