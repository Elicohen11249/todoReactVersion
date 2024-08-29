import Boom from "@hapi/boom";
import bcrypt from "bcrypt";
import db from "./db.js";

export const createUser = async ({ name, password }) => {
  
  //console.log("creating user with", name, password);
  try {
   // let passhash = await bcrypt.hash(password, 10);
   // console.log(passhash)
    const user = await db.one(' INSERT INTO person(name, pass) VALUES (${name}, ${password}) RETURNING name ', {
      name,password,
    });
    console.log("conrollers, user:",user.name)
    return user;
  } catch (e) {
    //if (e.message.includes("unique_email_cstr")) {
     // throw Boom.badData(`User already exists`);
    }
    
};
