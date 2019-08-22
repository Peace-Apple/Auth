const express = require('express');
const port = 3006;
const app = express()

// import routes
const authRoute = require('./routes/auth');

app.use('api/user', authRoute);

app.listen(port, () => {console.log(`Server running on port ${port}`)});
