const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const ejs = require('ejs');

require('./passport');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'mysecret',
  resave: true,
  saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('login', {tituloPagina: 'Login'});
})

app.post('/', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/error'
}))

app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(req.user);
    res.render('dashboard', {tituloPagina: 'El Dashboard'});
  } else {
    res.redirect('/error');
  }
})

app.get('/error', (req, res) => {
  res.send('error');
})

app.listen(3000, () => {
  console.log('Server ok');
})
