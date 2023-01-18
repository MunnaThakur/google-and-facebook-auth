const express = require("express");
const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const facebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();

const server = process.env.PORT;
const app = express();


//Google Oauth
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT,
      clientSecret: process.env.GOOGLE_SECRET,
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
  clientID : process.env.FACEBOOK_CLIENT,
  clientSecret : process.env.FACEBOOK_SECRET,
  callbackURL : "http://localhost:3000/auth/facebook"
},
(accessToken,refreshToken,profile,cb)=>{
  console.log('facebookId', profile.id);
}
));

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook', passport.authenticate('facebook',{
  scope: ["profile"]
}));



//rendring path
app.set('view engine', 'ejs');

app.get("/login", (req,res)=>{
    res.render('Login');
})


app.listen(server, () => {
  console.log(`server is listning on port no http://localhost:${server}`);
});


