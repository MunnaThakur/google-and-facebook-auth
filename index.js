const express = require("express");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const facebookStrategy = require("passport-facebook").Strategy;

const PORT = 3000;
const app = express();


//Google Oauth
passport.use(
  new googleStrategy(
    {
      clientID: "928350860559-pqbjle6e28b57d85l599l3g2vpm8e018.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('Access Tok', accessToken);
      console.log('Refresh tok', refreshToken);
      console.log('profile', profile)
    })
);
app.get("/auth/google",passport.authenticate("google", {
    scope: ["profile","email"],
  })
);
app.get("/auth/google/callback",passport.authenticate("google"));



//facebook oauth
passport.use(new facebookStrategy({
  clientID : "540292231465225",
  clientSecret : "ef613d8acf5f5f04a339a9abb20cfc5a",
  callbackURL : "http://localhost:3000/auth/facebook"
},
function(accessToken,refreshToken,profile,cb){
  User.findOrCreate({facebookId : profile.id}, function(err,user){
      return cb(err,user);
  });
}
));

app.get('/auth/facebook', passport.authenticate('facebook'));
// app.get('/auth/facebook/secret', passport.authenticate('facebook', {failureRedirect: '/Login'}),
// function(req,res){res.redirect('/secret')})




//rendring path
app.set('view engine', 'ejs');

app.get("/profile/:name", (req,res)=>{
    res.render('Profile', {name : req.params.name});
    data = {email : 'moon123@gmail.com', address : 'Salt Lake', skill : ['node js', 'javascript', 'mongodb']}
})


app.get("/login", (req,res)=>{
    res.render('Login');
})


app.get("/", (req,res)=>{
    res.render('Home');
})




app.listen(PORT, () => {
  console.log(`server is listning on port no ${PORT}`);
});


