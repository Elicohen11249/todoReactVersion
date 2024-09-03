import { Router } from 'express';
import passport from 'passport';
import  LocalStrategy  from 'passport-local';
import CookieStrategy from 'passport-cookie'
import jwt from 'jsonwebtoken'
import db from '../controllers/db.js';



async function verify(username, password, cb) {
   // console.log("inside the verify function");

    try {
        const user = await db.oneOrNone(
            'select * from  person where name =${userName}and pass = ${password}', {
            userName: username,
            password: password
        }
        );

        if (!user) {
            return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
}

function cookieverify(token, done) {
    const result = jwt.verify(token, 'A-very-strong-secret')
    //console.log("cookie verify ",result.user)
    return done(null, result.user);
}

passport.use(new LocalStrategy(verify));
passport.use(new CookieStrategy(cookieverify));

const router = Router();
router.post('/', (req, res, next) => {
    next(new Error('This is a bad request'));
})

router.all("/", (req, res, next) => {
  console.log("/ was called");
  next();
});

router.get("/", (req, res, next) => {
  console.log("Incoming to /");
  res.send("Server is up and running");
});


export default router;