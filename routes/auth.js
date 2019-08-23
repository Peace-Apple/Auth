import Router from'express';
import models from '../models';

const router = Router();

router.post('/register', async(req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await models.User.create({
      username: username,
      email: email,
      password: password
    })

    return res.status(201).json({
      success: true,
      message: 'Account successfully created',
      user: user
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
