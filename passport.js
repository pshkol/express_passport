const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password'
}, (username, password, done) => {
  if (username === 'pavlo' && password === '1234') {
    done(null, {username, password});
  } else {
    done(null, false);
  }
}))

passport.serializeUser((user, done) => {
  done(null, user.username);
})

passport.deserializeUser((username, done) => {
  done(null, {username: 'pavlo', password: '1234'});
})
