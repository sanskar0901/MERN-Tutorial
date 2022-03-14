const router = require('express').Router();
let User = require('../models/users.model');
let Task = require('../models/tasks.model');
var bcrypt = require('bcryptjs');


router.route('/signin').post((req,res)=>{
    const { email, password } = req.body;

    User.findOne({ email:email })
        .then((user)=>{
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    res.json(user);
                }else{
                    res.json("worng username or password")
                }
            });            
        })
        .catch(error=>{
            res.status(400).json(error);
        })
})

router.route('/signup').post(async (req,res)=>{
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email:email });

    if(existingUser){
        res.json("user already exists");
    }else{

        const salt = await bcrypt.genSaltSync(10);
        const encryptedPassword =  await bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            password:encryptedPassword,
            username
        })

        newUser.save()
            .then((user)=>{
                const newTask = new Task({
                    userId:user._id,
                    task:[]
                })

                newTask.save()
                    .then(()=>{
                        res.json({userId:user._id,name:user.username,email:user.email})
                    })
                    .catch(err => res.status(400).json(err))
            })
            .catch(err => res.status(400).json(err));
    }
})

module.exports = router;