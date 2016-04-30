import passport from 'koa-passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';
import Email from '../models/email';
import thinky from './thinky';

passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            let exists = await thinky.r.table('emails').get(email).run();
            if (exists) {
                console.error('user with email ' + email + ' already exists');
                done(null, false);
            } else {
                console.log('saving user to db');
                let user = req.body;
                if (!user.favorites) { user.favorites = []; }
                if (!user.dislikes) { user.dislikes = []; }
                await Email.save({ email: email }); // enforce email uniqueness
                let userDoc = await User.save(user); // save user
                done(null, userDoc);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }
));

passport.use('local-signin', new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            let user = await User.filter((item) => {
                return item('email').eq(email)
                    .and(item('password').eq(password)); // TODO: add password encryption
            }).run();

            if (user) {
                done(null, user[0]);
            } else {
                console.error('user not found');
                done(null, false);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


export default passport;
