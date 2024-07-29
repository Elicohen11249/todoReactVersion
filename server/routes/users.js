import { Router } from "express";
import { createUser } from "../controllers/users.js";
import multer from 'multer'

const router = Router();

const upload = multer({ dest: './uploads' })

router.post('/upload-profile', upload.single('profile'),(req, res, next) => {
    console.log(req.file, req.body)
res.send({
    originalName: req.file.originalname,
    url:`http://localhost:7000/images/${req.file.filename}`,
    success:true
})
});


router.post('/create', async (req, res, next) => {
    console.log(req.body)
    try{
        const user = await createUser(req.body);
        console.log(user)
        res.send(user);
    }catch(e){
        next(e);
    }
});



router.delete('/', (req, res, next) => {

});

export default router;