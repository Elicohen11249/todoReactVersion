import { Router } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

const router = Router();



router.post('/login',passport.authenticate('local', { session: false }), async (req, res, next) => {
  console.log(`inside the post ${req.user.name}`)
  const token = jwt.sign({ user: req.user }, 'A-very-strong-secret')
  return res.cookie("token", token, {
      // can only be accessed by server requests
      httpOnly: true,
      // path = where the cookie is valid
      path: "/",
      // domain = what domain the cookie is valid on
      domain: ".localhost",
      // secure = only send cookie over https
      secure: false,
      // sameSite = only send cookie if the request is coming from the same origin
      sameSite: "lax", // "strict" | "lax" | "none" (secure must be true)
      // maxAge = how long the cookie is valid for in milliseconds
      maxAge: 3600000, // 1 hour
  }).json({
      ok: true,
      name: req.user.name,
      password: req.user.pass
  });
});

export default router;
