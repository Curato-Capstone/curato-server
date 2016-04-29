import passport from 'koa-passport';
//import { Strategy as LocalStrategy } from 'passport-local';
//import local from 'passport-local';
//let LocalStrategy = local.Strategy;
let LocalStrategy = require('passport-local').Strategy;

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
        done();
    }
));

passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // TODO:
        // get user
        done();
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


export default passport;