import { Router } from "express";
import passport from "passport";
import multer from 'multer'



const upload = multer({ dest: './uploads' })



const router = Router();


router.use(passport.authenticate('cookie', {
  session: false
}))

import { createTask, deleteTask, getTasks, markTaskAsDone,addImage} from "../controllers/tasks.js";

router.post("/", async (req, res, next) => {
  try {
    res.json(await createTask(req.body.title, req.user.id));
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  
  try {
    const tasks= await getTasks(req.user.id)
   //console.log(tasks)
    res.json(tasks)
   
  } catch (e) {
    console.log("error getting tasks ",e)
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try{
    res.json(await markTaskAsDone(req.params.id,req.user.id));
  } catch(e){
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    res.json(await deleteTask(req.params.id,req.user.id));
  } catch(e){
    next(e);
  }
});

router.post("/add-image/:id",upload.single('taskImage'), async (req, res, next) => {
  const url = `http://localhost:7000/images/${req.file.filename}`
try {
  const result = await addImage(req.params.id, req.user.id,url)

  res.send({
    originalName: req.file.originalname,
    url:url ,
    success:true})
} catch (e) {
  console.log("inside the add-image", e)
  next(e)
}})
  //console.log(req.file, req.body)


export default router;
