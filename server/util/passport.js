import passport from 'koa-passport';
//import { Strategy as LocalStrategy } from 'passport-local';
//import local from 'passport-local';
//let LocalStrategy = local.Strategy;
let LocalStrategy = require('passport-local').Strategy;
import User from '../models/user';

passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        console.log('\n\nin the local-signup handler\n\n');
        // TODO
        // ensure email doesn't already exist in db
        // store user
        done(null, user);
    }
));

//passport.use('local-signin', new LocalStrategy(
//    {
//        usernameField: 'email',
//        passwordField: 'password'
//    },
//    async (email, password, done) => {
//        console.log('looking for user');
//        let user = await User.filter((item) => {
//            return item('email').eq(email)
//                .and(item('password').eq(password)); // TODO: add password encryption
//        }).run();
//
//        if (user) {
//            console.log('found user');
//            done(null, user);
//        } else {
//            console.log('ain\'t found :(');
//            done(null, false);
//        }
//    }
//));

passport.use(new LocalStrategy(function(username, password, cb) {
    // load the user object
    User.findOne({ username: username.trim().toLowerCase() }, function(err, user) {
        if (err) { return cb(err); }

        // this username doesn't exist
        if (!user) { return cb(null, false); }

        // does this password match? NOT SECURE DO NOT USE IN REAL LIFE
        if (password !== user.password) { return cb(null, false); }

        // successful login
        return cb(null, user);
    });
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user.id);
});


export default passport;
