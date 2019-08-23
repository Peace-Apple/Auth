import express from 'express';
import bodyParser from 'body-parser';
import authRoute from './routes/auth';
import postRoute from './routes/posts';
const port = 3006;
const app = express()

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  })
);

app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(port, () => {console.log(`Server running on port ${port}`)});
