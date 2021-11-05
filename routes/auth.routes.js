const express = require('express');
const passport = require('passport');
const router = express.Router();

//po wejściu na link /auth/google przekieruj użytkownika do systemu autoryzacji Google i powiedz mu, że interesuje nas e-mail oraz informacje o profilu. 
router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] } )); 

// po powrocie użytkownika do /auth/google/callback, sprawdź czy udało się go zalogować; jeśli nie, to przekieruj go do /user/no-permission, jeśli tak to przekieruj go do /user/logged
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/user/logged');
  }
); 

router.get('/logout', function (req, res){
    req.logOut()  
    res.redirect('/');
  });

module.exports = router;