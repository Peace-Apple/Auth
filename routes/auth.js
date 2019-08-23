import Router from'express';
import bcrypt from 'bcrypt';
import models from '../models';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { registerValidation, loginValidation } from '../middlewares/validation';

dotenv.config(); 

const router = Router();

router.post('/register', async(req, res) => {
  const { username, email, password } = req.body;

  try {
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const emailExists = await models.User.findOne({
      where: { email }
    });

    if(emailExists){ return res.status(409).json({
        success: false,
        message: 'Email already exists'
    })}

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await models.User.create({
      username: username,
      email: email, 
      password: hashedPassword
    })

    return res.status(201).json({
      success: true,
      message: 'Account successfully created',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }
    })
    
  } catch (error) {
    return res.status(400).json(
      {
        success: false,
        message: 'Something went wrong, please try again'
      }
    )
  }
})

router.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    const user = await models.User.findOne({
      where: { email }
    });

    if(!user) return res.status(400).send({ success: false, message: 'Email or password is wrong' })

    const validPassword = await bcrypt.compare(password, user.password);
  
    if(!validPassword) return res.status(400).send({ success: false, message: 'Password is not correct, please try again' })
    
    const payload = { id: user.id, username: user.username, email: user.email }

    const token = await jwt.sign(payload, process.env.SECRET_KEY);
    console.log('ene ene', token)

    res.status(200).json({
      success: true,
      message: 'You have successfully logged in',
      token: token
    })

 } catch (error) {
    return res.status(400).json(
      {
        success: false,
        message: 'Something went wrong, please try again'
      }
    )
  }
})

module.exports = router;
