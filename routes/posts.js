import Router from'express';
import auth from '../routes/privateRoutes';

const router = Router();

router.get('/', auth, (req, res) => {
  res.json({ posts: { title: 'Apple Lurve', description: 'Seh my name' } })
})

module.exports = router
